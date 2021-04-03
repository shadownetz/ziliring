import {firestore, metaRef, paymentRef, profileRef, userRef} from "../firebase/firebase";
import User from "./user";
import {ResponseObject} from "../utils/globalObjects";
import {contributionRef} from "../firebase/firebase";
// eslint-disable-next-line no-unused-vars
import {hourDiffFromFirestoreTimestamp} from "../utils/globalFunctions";

class Profile extends User{

    constructor({id, data}) {
        super(id)
        this.id = id;
        this.data = Object.assign(new Model(), data);
        this.firestore = profileRef.doc(id);
        this.loaded = false
    }

    async fetch(){
        try{
            const profile = await profileRef.doc(this.id).get();
            if(profile.exists){
                this.id = profile.id;
                this.data = Object.assign(new Model(), profile.data())
                this.loaded = true
            }else{
                return new Error("This User Profile does not exist!")
            }
        }catch (e) {
            return new Error(e.message)
        }
    }

    get_balance(){
        return this.data.balance
    }

    async update(custom_data=null){
        let u_data;
        if(custom_data){
            u_data = custom_data
        }else{
            u_data = Object.assign({}, this.data);
        }
        return this.firestore.update({...u_data})
    }

    async purge(){
        const response = new ResponseObject()
        try{
            if(!this.loaded) await this.fetch();
            await this.firestore.update({
                isActive: false,
                purgeCount: firestore.FieldValue.increment(1),
                purgedAt: firestore.FieldValue.serverTimestamp()
            })
        }catch (e) {
            response.status = false;
            response.message = e.message
        }
        return Promise.resolve(response)
    }

    static async initiateAutomatedPurge(){
        const metaDoc = await metaRef.doc('automatedPurge').get();
        if(metaDoc.exists){
            let lastUpdated = metaDoc.data().updatedAt;
            if(hourDiffFromFirestoreTimestamp(lastUpdated) >= 24){
                try{
                    let contributions = [];
                    const contributorsDoc = await contributionRef
                        .where('hasPaid', '==', false)
                        .where('adminInitiated', '==', false)
                        .where('mode', '==', 'default')
                        .where('isComplete', '==', false)
                        .where('type', '==', 'downliner')
                        .get();
                    if(!contributorsDoc.empty){
                        contributorsDoc.forEach(doc=>{
                            contributions.push({id: doc.id, data: doc.data()})
                        });
                        contributions = contributions.filter((contributor)=>{
                            return hourDiffFromFirestoreTimestamp(contributor.data.createdAt) > 3
                        });
                        // begin check
                        // make sure that before purge, contributor has not uploaded any
                        // payment proof
                        const paymentIdsPromises = contributions.map(contribution=>{
                            return paymentRef.doc(contribution.data.paymentId).get()
                        });
                        const contributionPaymentsDoc = await Promise.all(paymentIdsPromises);
                        const contributionPayments = contributionPaymentsDoc.map(doc=>{
                            return {id: doc.id, data: doc.data()}
                        });
                        contributions = contributions.filter((contributor, index)=>{
                            return contributionPayments[index].data.proof.length <= 0
                        })
                        // end check
                        const adminDocs = await userRef
                            .where('isAdmin', '==', true).get();
                        let adminIds = [];
                        if(!adminDocs.empty){
                            adminDocs.forEach(doc=>{
                                adminIds.push(doc.id)
                            })
                        }
                        for(let i=0; i < contributions.length; i++){
                            // the user is not an admin
                            if(adminIds.indexOf(contributions[i].data.userId) < 0){
                                // console.log('Contribution:', contributions[i])
                                // eslint-disable-next-line no-await-in-loop
                                try{
                                    // eslint-disable-next-line no-await-in-loop
                                    await new Promise((resolve, reject) => {
                                        setTimeout(async ()=>{
                                            try{
                                                await profileRef
                                                    .doc(contributions[i].data.userId)
                                                    .update({
                                                        isActive: false,
                                                        purgeCount: firestore.FieldValue.increment(1),
                                                        purgedAt: firestore.FieldValue.serverTimestamp()
                                                    })
                                                resolve(true)
                                            }catch (e) {
                                                reject(new Error(e.message))
                                            }
                                        }, 2000)
                                    })
                                }
                                catch (e) {
                                    console.error(
                                        "Unable to automatically purge user:"+contributions[i].data.userId+" Due to ->"+e.message
                                    )
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.log('Unable to initiate auto purge:', e.message)
                }
                finally {
                    console.log('Done')
                    await metaRef.doc('automatedPurge').update({
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                        count: firestore.FieldValue.increment(1)
                    })
                }
            }
        }
    }

    static async getAdminProfile(){
        let resposne = null;
        try{
            let admin = await userRef
                .where('isAdmin', '==', true)
                .orderBy('createdAt')
                .limit(1)
                .get();
            if(!admin.empty) {
                admin = await profileRef.doc(admin.docs[0].id).get()
                if(admin.exists){
                    resposne = {id: admin.id, data: admin.data()}
                }
            }
        }catch (e) {
            console.log('Unable to get Admin Profile', e)
        }
        return Promise.resolve(resposne)
    }
}

function Model(){
    this.userId = '';
    this.bankName = '';
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.contributions = [];
    this.balance = 0;
    this.profit = 0;
    this.purgeCount = 0;
    this.purgedAt = new Date()
    this.isActive = true
}

export const ProfileModel = Model
export default Profile