const firebaseRef = require("../firebaseRef")

class Contribution{

    static async createAdminContrib(adminID){
        const admin_contrib = new ContributionModel();
        admin_contrib.userId = adminID;
        admin_contrib.type = 'upliner';
        admin_contrib.adminInitiated = true;
        admin_contrib.amountToBePaid = 90E10;
        admin_contrib.createdAt = admin_contrib.updatedAt = firebaseRef.firestoreRef.FieldValue.serverTimestamp();
        return firebaseRef.contributionRef.add(Object.assign({}, admin_contrib))
    }
}


class PaymentDecision{

    constructor(downlinerContrib, uplinersContrib=[]) {
        this.downlinerContrib = downlinerContrib;
        this.uplinersContrib = uplinersContrib;
    }

    set_upliners_contrib(contribs){
        this.uplinersContrib = contribs
    }

    async select_upliner(){
        let upliner_contrib = null;
        for(let i=0; i < this.uplinersContrib.length; i++){
            let found = false;
            const upliner_payment_progression = Object.entries(this.uplinersContrib[i].data.paymentProgressions);
            if(upliner_payment_progression.length > 0){
                for(let j=0; j < upliner_payment_progression.length; j++){
                    if(!upliner_payment_progression[j][1][1] && upliner_payment_progression[j][1][0] === this.downlinerContrib.data.amountToBePaid){
                        const key = upliner_payment_progression[j][0]
                        this.uplinersContrib[i].data.paymentProgressions[key][1] = true;
                        upliner_contrib = this.uplinersContrib[i];
                        found = true
                        break;
                    }
                }
            }
            if(found) break
        }

        // Default to the admin
        if(!upliner_contrib){
            try{
                const admin = await firebaseRef.userRef
                    .where('isAdmin', '==', true)
                    .orderBy('createdAt')
                    .limit(1)
                    .get();
                if(!admin.empty){
                    let admin_contrib = await firebaseRef.contributionRef
                        .where('userId', '==', admin.docs[0].id)
                        .limit(1)
                        .get();
                    if(admin_contrib.empty){
                        // const admin_contrib_m = new Contribution({});
                        const adminContribDocRef = await Contribution.createAdminContrib(admin.docs[0].id);
                        admin_contrib = await firebaseRef.contributionRef.doc(adminContribDocRef.id).get();
                        if(admin_contrib.exists){
                            upliner_contrib = {id: admin_contrib.id, data: admin_contrib.data()}
                        }
                    }else{
                        upliner_contrib = {id: admin_contrib.docs[0].id, data: admin_contrib.docs[0].data()}
                    }
                    if(!admin_contrib){
                        throw new Error("Unable to initiate admin contribution")
                    }
                }else{
                    throw new Error("No Admin Exist on the platform")
                }
            }catch (e) {
                console.log('Unable to fetch admins::', e.message)
            }
        }

        return Promise.resolve(upliner_contrib)
    }

    static getPaymentProgression(paidAmount){
        let progression;
        const fiveThousand = {
            1: [5000, false]
        }
        const tenThousand = {
            1: [5000, false],
            2: [5000, false],
            3: [5000, false]
        }
        const twentyThousand = {
            1: [10000, false],
            2: [10000, false],
            3: [5000, false],
            4: [5000, false]
        }
        const fortyThousand = {
            1: [20000, false],
            2: [10000, false],
            3: [10000, false],
            4: [10000, false],
            5: [10000, false],
        }
        const hundredThousand = {
            1: [40000, false],
            2: [40000, false],
            3: [40000, false],
            4: [20000, false],
            5: [10000, false]
        }
        const twoHundredThousand = {
            1: [100000, false],
            2: [100000, false],
            3: [40000, false],
            4: [40000, false],
            5: [20000, false]
        }
        const fiveHundredThousand = {
            1: [200000, false],
            2: [200000, false],
            3: [200000, false],
            4: [100000, false],
            5: [40000, false],
            6: [10000, false]
        }
        const oneMilli = {
            1: [500000, false],
            2: [500000, false],
            3: [200000, false],
            4: [200000, false],
            5: [100000, false]
        }
        switch (paidAmount) {
            case 5000: progression = fiveThousand; break;
            case 10000: progression = tenThousand; break;
            case 20000: progression = twentyThousand; break;
            case 40000: progression = fortyThousand; break;
            case 100000: progression = hundredThousand; break;
            case 200000: progression = twoHundredThousand; break;
            case 500000: progression = fiveHundredThousand; break;
            case 1000000: progression = oneMilli; break;
            default: progression = fiveThousand; break
        }
        return progression
    }
}

function ContributionModel(){
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
    this.paymentId = '';
    this.paymentIds = [];
    this.downliners = [];
}

module.exports = {
    PaymentDecision
}