import {firestore, paymentRef} from "../firebase/firebase";

class Payment{
    constructor(id, data={}) {
        this.id = id;
        this.data = data
    }

    confirm(){
        return paymentRef.doc(this.id).update({
            confirmed: true,
            reported: false,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
    }

    report(){
        return paymentRef.doc(this.id).update({
            reported: true,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
    }
}

function Model() {
    this.contribId = '';
    this.proof = [];
    this.amount = 0;
    this.confirmed = false;
    this.reported = false;
    this.userId = '';
    this.receiverId = '';
    this.payContext = 'plan';   // plan || profit
    this.isValid = true;
    this.createdAt = new Date();
    this.updatedAt = new Date()
}

export const PaymentModel = Model
export default Payment
