const Contribution = require("../models/contribution").Contribution;
const firebaseRef = require("../firebaseRef")

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
            const upliner_payment_progression = this.uplinersContrib[i].data.paymentProgressions;
            if(Array.isArray(upliner_payment_progression)){
                for(let j=0; j < upliner_payment_progression.length; j++){
                    if(!upliner_payment_progression[j][1] && upliner_payment_progression[j][0] === this.downlinerContrib.data.amountToBePaid){
                        this.uplinersContrib[i].data.paymentProgressions[j][1] =  true;
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
                const admin = await firebaseRef.userRef.where('isAdmin', '==', true).limit(1).get();
                if(!admin.empty){
                    let admin_contrib = await firebaseRef.contributionRef.where('userId', '==', admin.docs[0].id)
                        .limit(1).get();
                    if(admin_contrib.empty){
                        const admin_contrib_id = await Contribution.createAdminContrib(admin.docs[0].id);
                        admin_contrib = await firebaseRef.contributionRef.where('userId', '==', admin_contrib_id)
                            .limit(1).get()
                    }
                    upliner_contrib = {id: admin_contrib.docs[0].id, data: admin_contrib.docs[0].data()}
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
        const fiveThousand = [
            [5000, false]
        ]
        const tenThousand = [
            [5000, false],
            [5000, false],
            [5000, false]
        ]
        const twentyThousand = [
            [10000, false],
            [10000, false],
            [5000, false],
            [5000, false]
        ]
        const fortyThousand = [
            [20000, false],
            [10000, false],
            [10000, false],
            [10000, false],
            [10000, false],
        ]
        const hundredThousand = [
            [40000, false],
            [40000, false],
            [40000, false],
            [20000, false],
            [10000, false]
        ]
        const twoHundredThousand = [
            [100000, false],
            [100000, false],
            [40000, false],
            [40000, false],
            [20000, false]
        ]
        const fiveHundredThousand = [
            [200000, false],
            [200000, false],
            [200000, false],
            [100000, false],
            [40000, false],
            [10000, false]
        ]
        const oneMilli = [
            [500000, false],
            [500000, false],
            [200000, false],
            [200000, false],
            [100000, false]
        ]
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

module.exports = {
    PaymentDecision
}