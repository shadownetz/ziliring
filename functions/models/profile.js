const firebaseRef = require('../firebaseRef');
const functions = require('firebase-functions');

class Profile{

    constructor({id, data}) {
        this.id = id;
        this.data = Object.assign(new Model(), data)
    }

    get_balance(){
        return this.data.balance
    }

    static async getAdminProfile(){
        let resposne = null;
        try{
            let admin = await firebaseRef.userRef
                .where('isAdmin', '==', true)
                .orderBy('createdAt')
                .limit(1)
                .get();
            if(!admin.empty) {
                admin = await firebaseRef.profileRef.doc(admin.docs[0].id).get()
                if(admin.exists){
                    resposne = {id: admin.id, data: admin.data()}
                }
            }
        }catch (e) {
            functions.logger.error('Unable to get Admin Profile', e)
        }
        return Promise.resolve(resposne)
    }
}

function Model(){
    this.userId = '';
    this.bankName = '';
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.verifiedContributions = 0;
    this.balance = 0;
    this.profit = 0;
    this.purgedAt = new Date()
    this.purgeCount = 0;
    this.isActive = true
}
module.exports = {
    ProfileModel: Model,
    Profile
}