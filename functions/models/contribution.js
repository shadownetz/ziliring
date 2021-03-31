const PaymentDecision = require("../utils/paymentDecision").PaymentDecision;
const firebaseRef = require('../firebaseRef');
const functions = require('firebase-functions');


class Contribution{

    constructor({id, data}) {
        this.id = id;
        this.data = Object.assign(new Model(), data);
        this.paymentDecision = new PaymentDecision({id, data})
    }

    async getUser(){
        return Promise.resolve(
            await firebaseRef.userRef.doc(this.data.userId).get()
        )
    }

    async decide_upliner(uplinersContrib){
        this.paymentDecision.set_upliners_contrib(uplinersContrib)
        return Promise.resolve(
            await this.paymentDecision.select_upliner()
        )
    }

    async createAdminContrib(adminID){
        const admin_contrib = new Model();
        admin_contrib.userId = adminID;
        admin_contrib.type = 'upliner';
        admin_contrib.adminInitiated = true;
        admin_contrib.amountToBePaid = 90E10;
        admin_contrib.createdAt = admin_contrib.updatedAt = firebaseRef.firestoreRef.FieldValue.serverTimestamp();
        return firebaseRef.contributionRef.add(Object.assign({}, admin_contrib))
    }

    static get_expiration_timestamp(){
        let date = new Date((new Date().valueOf()));
        date.setDate(date.getDate() + 7);
        return date;
    }

    get_expected_profit(){
        return (this.data.amountToBePaid + ((50/100)*this.data.amountToBePaid))
    }

    profit_gain_is_reached(){
        let total = 0;
        let tmp_progressions = Object.entries(this.data.paymentProgressions);
        for(let j=0; j < tmp_progressions.length; j++){
            const key = tmp_progressions[j][0];
            if(this.data.paymentProgressions[key][1]){
                total += this.data.paymentProgressions[key][0];
            }
        }
        return this.data.expectedProfit === total
    }

    get_profit_received(){
        let total = 0;
        let tmp_progressions = Object.entries(this.data.paymentProgressions);
        for(let j=0; j < tmp_progressions.length; j++){
            const key = tmp_progressions[j][0];
            if(this.data.paymentProgressions[key][1]){
                total += this.data.paymentProgressions[key][0];
            }
        }
        return total
    }

    get_payment_progressions(){
        return PaymentDecision.getPaymentProgression(this.data.amountToBePaid)
    }

    getPaymentProgressions(){
        return this.data.paymentProgressions
    }

    async totalNoOfContribAmount(amount){
        const contribSnapshots = await firebaseRef.contributionRef
            .where('userId', '==', this.data.userId)
            .where('hasPaid', '==', true)
            .get();
        let count = 0;
        if(!contribSnapshots.empty){
            contribSnapshots.forEach(doc=>{
                if(doc.data().amountToBePaid === amount){
                    count++
                }
            })
        }
        return Promise.resolve(count)
    }

    static async resetUplinerContrib(userId){
        /**
         * As a Downliner, get all upliner's info and update accordingly
         * before deleting every downliners contribution that has no payment made
         * @type {*[]}
         */
        let promises = [];
        try{
            // fetch all downliners contribution
            const downlinerContribSnapshots = await firebaseRef.contributionRef
                .where('userId', '==', userId)
                .where('hasPaid', '==', false)
                .where('type', '==', 'downliner')
                .get();
            const downlinerContribs = [];
            let uplinersContribs = [];
            if(!downlinerContribSnapshots.empty){
                console.log('Downliners not empty')
                downlinerContribSnapshots.forEach(doc=>{
                    downlinerContribs.push({id: doc.id, data: doc.data()})
                });
                if(downlinerContribs.length > 0){
                    // we fetch upliners of the downliner
                    let uplinersSnapshot = await firebaseRef.contributionRef
                        .where('downliners', 'array-contains', userId)
                        .get();
                    if(!uplinersSnapshot.empty){
                        uplinersSnapshot.forEach(doc=>{
                            uplinersContribs.push({id: doc.id, data: doc.data()})
                        });
                        if(uplinersContribs.length > 0){
                            console.log('Found upliners')
                            promises = uplinersContribs.map((uplinerContrib, index)=>{
                                return firebaseRef.contributionRef.doc(uplinerContrib.id).update({
                                    downliners: firebaseRef.firestoreRef.FieldValue.arrayRemove(userId),
                                    isComplete: false,
                                })
                            });
                            await Promise.all(promises);
                            const payments = [];
                            let paymentsDocs = [];
                            let tmp_payments = downlinerContribs.map(contrib=>contrib.data.paymentId);
                            // fetch all payments record id associated with the upliner and downliner
                            uplinersContribs.forEach((uplinerContrib, index)=>{
                                if(Array.isArray(uplinerContrib.data.paymentIds)){
                                    if(uplinerContrib.data.paymentIds.length > 0){
                                        console.log('upliner payments not empty')
                                        uplinerContrib.data.paymentIds.forEach(payment=>{
                                            if(tmp_payments.indexOf(payment) >= 0){
                                                console.log('found payment id')
                                                payments.push(payment)
                                            }
                                        })
                                    }
                                }
                            });
                            if(payments.length > 0){
                                promises = await Promise.all(payments.map(payment=>firebaseRef.paymentRef.doc(payment).get()))
                                if(promises.length > 0){
                                    paymentsDocs = promises.map(doc=>{
                                        return {id: doc.id, data: doc.data()}
                                    });
                                    promises = [];
                                    uplinersContribs.forEach(uplinerContrib=>{
                                        uplinerContrib.data.paymentIds.forEach(payment=>{
                                            const selected_payment = paymentsDocs.filter(doc=>doc.id === payment)[0] || null;
                                            if(selected_payment){
                                                promises.push(
                                                    firebaseRef.contributionRef.doc(uplinerContrib.id).update({
                                                        paymentProgressions: PaymentDecision.setPaymentProgression(
                                                            uplinerContrib.data.paymentProgressions, selected_payment.data.amount, false
                                                        )
                                                    })
                                                )
                                            }
                                        })
                                    });
                                    if(promises.length > 0){
                                        await Promise.all(promises)
                                    }
                                }

                                promises = payments.map(payment=>{
                                    return firebaseRef.paymentRef.doc(payment).update({
                                        isValid: false,
                                        updatedAt: firebaseRef.firestoreRef.FieldValue.serverTimestamp()
                                    })
                                })
                                await Promise.all(promises)
                            }
                        }
                    }


                    promises = downlinerContribs.map(downlinerContrib=>{
                        return firebaseRef.contributionRef.doc(downlinerContrib.id).delete()
                    })
                    await Promise.all(promises)
                }
            }
        }catch (e) {
            functions.logger.error("Unable to reset upliners contributions::", e)
        }
        return Promise.resolve()
    }

    static async resetDownlinerContrib(userId){
        /**
         * As an Upliner, get all downliners info and update accordingly
         * deassociate the downliners from the upliner and reassign the
         * downliners to matching upliners
         * @type {*[]}
         */
        let promises = [];
        const downlinersPaymentIds = [];
        try{
            const uplinerContribSnapshots = await firebaseRef.contributionRef
                .where('userId', '==', userId)
                .where('type', '==', 'upliner')
                .get();
            const uplinerContribs = [];
            if(!uplinerContribSnapshots.empty){
                console.log('Upliners is not empty')
                uplinerContribSnapshots.forEach(doc=>{
                    uplinerContribs.push({id: doc.id, data: doc.data()})
                });
                let downliners = [];
                uplinerContribs.forEach(uplinerContrib=>{
                    if(Array.isArray(uplinerContrib.data.downliners)){
                        if(uplinerContrib.data.downliners.length > 0){
                            downliners.push(...uplinerContrib.data.downliners)
                        }
                    }
                });
                if(downliners.length > 0){
                    console.log('Downliners is not empty')
                    promises = downliners.map(downliner=>{
                        return firebaseRef.contributionRef
                            .where('payTo', '==', userId)
                            .where('userId', '==', downliner)
                            .where('type', '==', 'downliner')
                            .where('hasPaid', '==', false)
                            .limit(1)
                            .get()
                    })
                    let downlinersContrib = await Promise.all(promises);
                    if(downlinersContrib.length > 0){
                        downliners = downlinersContrib.map(contrib=>{
                            if(!contrib.empty){
                                return {id: contrib.docs[0].id, data: contrib.docs[0].data()}
                            }
                            return null
                        }).filter(contrib=>contrib!==null);
                        if(downliners.length > 0){
                            console.log('Downliners info is not empty')
                        }
                        // fetch active upliners
                        let uplinersContrib = [];
                        // eslint-disable-next-line no-await-in-loop
                        const activeContributions = await firebaseRef.contributionRef
                            .where('hasPaid', '==', true)
                            .where('type', '==', 'upliner')
                            .where('isComplete', '==', false)
                            .where('userId', '!=', userId)
                            .get();
                        activeContributions.forEach(doc=>{
                            if(doc.exists){
                                uplinersContrib.push({id: doc.id, data: doc.data()})
                            }
                        })

                        for(let i=0; i < downliners.length; i++){
                            downlinersPaymentIds.push(downliners[i].data.paymentId)
                            // reassigning downliners to new upliners
                            // eslint-disable-next-line no-await-in-loop
                            let selected_upliner = await (new Contribution({})).decide_upliner(uplinersContrib);
                            if(selected_upliner){
                                const uplinerContribInstance = new Contribution({...selected_upliner});
                                // eslint-disable-next-line no-await-in-loop
                                const upliner = await uplinerContribInstance.getUser();

                                // eslint-disable-next-line no-await-in-loop
                                await firebaseRef.contributionRef.doc(uplinerContribInstance.id).update({
                                    downliners: firebaseRef.firestoreRef.FieldValue.arrayUnion(downliners[i].id),
                                    paymentIds: firebaseRef.firestoreRef.FieldValue.arrayUnion(downliners[i].data.paymentId),
                                    isComplete: uplinerContribInstance.profit_gain_is_reached(),
                                    paymentProgressions: uplinerContribInstance.getPaymentProgressions()
                                })
                                // eslint-disable-next-line no-await-in-loop
                                await firebaseRef.contributionRef.doc(downliners[i].id).update({
                                    payTo: upliner.id,
                                })
                                // eslint-disable-next-line no-await-in-loop
                                await firebaseRef.paymentRef
                                    .doc(downliners[i].data.paymentId)
                                    .update({
                                        updatedAt: firebaseRef.firestoreRef.FieldValue.serverTimestamp(),
                                        receiverId: upliner.id,
                                        proof: []
                                    })
                            }
                        }
                    }
                }

                // remove already reassigned downliner payment ids from upliner
                // so that he wont see it in his contribution earnings
                if(downlinersPaymentIds.length > 0){
                    console.log('Downliners payment Ids not empty')
                    promises = uplinerContribs.map(contrib=>{
                        return firebaseRef.contributionRef.doc(contrib.id).update({
                            paymentIds: firebaseRef.firestoreRef.FieldValue.arrayRemove(...downlinersPaymentIds)
                        })
                    })
                    await Promise.all(promises)
                }
            }
        }catch (e) {
            functions.logger.error("Unable to reset downliners contributions::", e)
        }
    }
}

function Model(){
    this.packageId = '';
    this.createdAt = new Date();
    this.hasPaid = false;
    this.userId = '';
    this.payTo = '';
    this.type = 'downliner';     // upliner || downliner
    this.mode = 'default';       // default || withdrawal
    this.adminInitiated = false;
    this.amountToBePaid = 0;
    this.profitReceived = 0;
    this.expectedProfit = 0;
    this.paymentProgressions = {}
    this.isComplete = false;
    this.expireAt = new Date();
    this.beginAt = new Date();
    this.paymentId = '';
    this.paymentIds = [];
    this.downliners = [];
}

module.exports = {
    ContributionModel: Model,
    Contribution
}