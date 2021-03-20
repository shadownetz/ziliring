import {profileRef} from "../firebase/firebase";

class Profile{

    constructor({id, data}) {
        this.id = id;
        this.data = Object.assign(new Model(), data)
    }

    get_balance(){
        return this.data.balance
    }

    async update(data=null){
        let u_data;
        if(data){
            u_data = data
        }else{
            u_data = Object.assign({}, this.data);
        }
        return profileRef.doc(this.id).update({...u_data})
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
    this.isActive = true
}

export const ProfileModel = Model
export default Profile