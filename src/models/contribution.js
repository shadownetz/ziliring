import {contributionRef, firestore, userRef} from "../firebase/firebase";

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

export const ContributionModel = Model
export default Contribution