import {contributionRef, firestore, paymentRef, profileRef} from "../firebase/firebase";
import {ResponseObject} from "../utils/globalObjects";
import Profile from "./profile";
import Contribution from "./contribution";

class Payment{
    constructor(id, data={}) {
        this.id = id;
        this.data = data;
        this.firestore = paymentRef.doc(id)
    }

    report(){
        return paymentRef.doc(this.id).update({
            reported: true,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
    }

    async confirm(override=false){
        const response = new ResponseObject();
        try{
            console.log(this.data.contribId)
            const contribDoc = await contributionRef.doc(this.data.contribId).get();
            if(contribDoc.exists){
                const contribInstance = new Contribution({id: contribDoc.id, data: contribDoc.data()});
                await contributionRef.doc(contribInstance.id).update({
                    profitReceived: firestore.FieldValue.increment(this.data.amount)
                })
                await paymentRef.doc(this.id).update({
                    confirmed: true,
                    confirmedByAdmin: override,
                    reported: false,
                    updatedAt: firestore.FieldValue.serverTimestamp()
                })
            }else{
                throw new Error("The Contribution for this payment does not exist")
            }
        }catch (e) {
            response.status = false;
            response.message = e.message
        }
        return Promise.resolve(response)
    }

    async reassignReceiver(){
        const response = new ResponseObject();
        try{
            const uplinerContribSnapshots = await contributionRef
                .where('userId', '==', this.data.receiverId)
                .where('type', '==', 'upliner')
                .where('paymentIds', 'array-contains', this.id)
                .limit(1)
                .get();
            if(!uplinerContribSnapshots.empty){
                console.log('Upliner contribs not empty')
                let uplinerContrib = {
                    id: uplinerContribSnapshots.docs[0].id,
                    data: uplinerContribSnapshots.docs[0].data()
                }
                const adminProfile = await Profile.getAdminProfile()
                if(adminProfile){
                    await paymentRef.doc(this.id).update({
                        receiverId: adminProfile.id
                    })
                }
                await contributionRef.doc(uplinerContrib.id).update({
                    downliners: firestore.FieldValue.arrayRemove(this.data.userId),
                    isComplete: false,
                    paymentIds: firestore.FieldValue.arrayRemove(this.id),
                    paymentProgressions: Payment.setPaymentProgression(
                        uplinerContrib.data.paymentProgressions, this.data.amount, false
                    )
                })
            }
        }catch (e) {
            response.status = false;
            response.message = e.message
        }
        return Promise.resolve(response)
    }

    async completePayment(amount=0){
        const response = new ResponseObject();
        try{
            const contrib = await contributionRef
                .doc(this.data.contribId)
                .get();
            const uplinerProfile = await profileRef
                .doc(this.data.receiverId)
                .get();
            if(contrib.exists && uplinerProfile.exists){
                await contributionRef.doc(contrib.id).update({
                    profitReceived: firestore.FieldValue.increment(amount)
                })
                await profileRef.doc(uplinerProfile.id).update({
                    balance: firestore.FieldValue.increment(this.data.amount)
                })
            }
        }catch (e) {
            response.status = false;
            response.message = e.message;
        }
        return Promise.resolve(response)
    }

    static getPaymentProgression(paidAmount){
        let progression;
        const fiveThousand = {
            1: [5000, false]
        }
        const tenThousand = {
            1: [10000, false],
            2: [5000, false],
        }
        const twentyThousand = {
            1: [20000, false],
            2: [10000, false],
        }
        const fortyThousand = {
            1: [40000, false],
            2: [20000, false],
        }
        const hundredThousand = {
            1: [100000, false],
            2: [40000, false],
            5: [10000, false]
        }
        const twoHundredThousand = {
            1: [200000, false],
            2: [100000, false],
        }
        const fiveHundredThousand = {
            1: [500000, false],
            2: [200000, false],
            5: [40000, false],
            6: [10000, false]
        }
        const oneMilli = {
            1: [1000000, false],
            2: [500000, false],
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

    static setPaymentProgression(paymentProgressions={}, amount=0, value=true){
        const tmp_progressions = Object.entries(paymentProgressions);
        if(tmp_progressions.length > 0){
            for(let j=0; j < tmp_progressions.length; j++){
                if(tmp_progressions[j][1][0] === amount){
                    const key = tmp_progressions[j][0]
                    paymentProgressions[key][1] = value;
                    break;
                }
            }
        }
        return paymentProgressions
    }

}

function Model() {
    this.contribId = '';
    this.proof = [];
    this.amount = 0;
    this.confirmed = false;
    this.reported = false;
    this.confirmedByAdmin = false;
    this.userId = '';
    this.receiverId = '';
    this.payContext = 'plan';   // plan || profit
    this.isValid = true;
    this.createdAt = new Date();
    this.updatedAt = new Date()
}

export const PaymentModel = Model
export default Payment
