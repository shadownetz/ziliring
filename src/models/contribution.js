import {contributionRef, firestore, paymentRef, userRef} from "../firebase/firebase";
import {ResponseObject} from "../utils/globalObjects";
import Payment, {PaymentModel} from "./payment";

class Contribution{

    constructor({id='', data={}}) {
        this.id = id;
        this.data = Object.assign(new Model(), data);
    }

    async getUser(){
        return Promise.resolve(
            await userRef.doc(this.data.userId).get()
        )
    }

    async update(){
        const tmp_contrib = Object.assign({}, this.data);
        delete tmp_contrib.createdAt;
        delete tmp_contrib.beginAt;
        if(typeof tmp_contrib.expireAt === 'string'){
            tmp_contrib.expireAt = firestore.Timestamp.fromDate(new Date(tmp_contrib.expireAt))
        }
        return contributionRef.doc(this.id).update(tmp_contrib)
    }

    static async createPrioritizedAdminContrib(adminID, {packageId, amount, mode}){
        const response = new ResponseObject();
        try{
            const admin_contrib = new Model();
            const payment_record = new PaymentModel();

            admin_contrib.packageId = packageId;
            admin_contrib.userId = adminID;
            admin_contrib.type = 'upliner';
            admin_contrib.amountToBePaid = amount;
            admin_contrib.mode = mode;
            admin_contrib.hasPaid = true;
            admin_contrib.paymentProgressions = Payment.getPaymentProgression(amount);
            admin_contrib.expectedProfit = (amount + ((50/100)*amount))
            admin_contrib.expireAt = firestore.Timestamp.fromDate(Contribution.get_expiration_timestamp())
            admin_contrib.beginAt = admin_contrib.createdAt = admin_contrib.updatedAt = firestore.FieldValue.serverTimestamp();

            let saved_contrib = await contributionRef.add(Object.assign({}, admin_contrib));

            payment_record.userId = adminID;
            payment_record.contribId = saved_contrib.id;
            payment_record.confirmed = true;
            payment_record.amount = amount;
            payment_record.createdAt = payment_record.updatedAt = firestore.FieldValue.serverTimestamp();

            let saved_payment = await paymentRef.add(Object.assign({}, payment_record));

            await contributionRef.doc(saved_contrib.id).update({
                paymentId: saved_payment.id
            })

        }catch (e) {
            response.status = false;
            response.message = e.message;
        }
        return Promise.resolve(response)
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

    static get_expiration_timestamp(){
        let date = new Date((new Date().valueOf()));
        date.setDate(date.getDate() + 7);
        return date;
    }

    static async getAdminContrib() {
        const response = new ResponseObject();
        try{
            const admin = await userRef
                .where('isAdmin', '==', true)
                .orderBy('createdAt')
                .limit(1)
                .get();
            if (!admin.empty) {
                let admin_contrib = await contributionRef
                    .where('userId', '==', admin.docs[0].id)
                    .where('adminInitiated', '==', true)
                    .limit(1)
                    .get();
                if (!admin_contrib.empty) {
                    response.data = {id: admin_contrib.docs[0].id, data: admin_contrib.docs[0].data()}
                }else{
                    throw new Error("No Admin Contribution Exist")
                }
            }
        }catch (e) {
            response.status = false;
            response.message = e.message
        }
        return Promise.resolve(response)
    }

    getPaymentProgressions(){
        return this.data.paymentProgressions
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

export const ContributionModel = Model
export default Contribution