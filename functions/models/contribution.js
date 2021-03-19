const PaymentDecision = require("../utils/paymentDecision").PaymentDecision;
const firebaseRef = require('../firebaseRef');


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
        if(Array.isArray(this.data.paymentProgressions)){
            for(let j=0; j < this.data.paymentProgressions.length; j++){
                if(this.data.paymentProgressions[j][1]){
                    total += this.data.paymentProgressions[j][0]
                }
            }
        }
        return this.data.expectedProfit === total
    }

    get_profit_received(){
        let total = 0;
        if(Array.isArray(this.data.paymentProgressions)){
            for(let j=0; j < this.data.paymentProgressions.length; j++){
                if(this.data.paymentProgressions[j][1]){
                    total += this.data.paymentProgressions[j][0]
                }
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
}

function Model(){
    this.packageId = '';
    this.createdAt = new Date();
    this.hasPaid = false;
    this.userId = '';
    this.payTo = '';
    this.type = 'downliner';     // upliner || downliner
    this.adminInitiated = false;
    this.amountToBePaid = 0;
    this.profitReceived = 0;
    this.expectedProfit = 0;
    this.paymentProgressions = []
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