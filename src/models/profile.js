import {firestore, profileRef} from "../firebase/firebase";
import User from "./user";
import {ResponseObject} from "../utils/globalObjects";

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