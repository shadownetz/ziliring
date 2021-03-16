import {userRef} from "../firebase/firebase";
import {firestore} from "../firebase/firebase";
import Crypt from "../utils/crypt";

class User{

    constructor(id='', data={}) {
        this.id = id;
        this.data = Object.assign(new Model(), data);
    }

    async fetch(){
        try{
            const user = await userRef.doc(this.id).get();
            if(user.exists){
                this.id = user.id;
                this.data = Object.assign(new Model(), user.data())
            }else{
                return new Error("This Account does not exist!")
            }
        }catch (e) {
            return new Error(e.message)
        }
    }

    async add(){
        const new_crypt = new Crypt(this.data.password);
        const encrypted_result = new_crypt.encrypt(this.data.phone)
        this.data.password = encrypted_result.encrypted;
        this.data.passkey = encrypted_result.secret;
        this.data.createdAt = this.data.updatedAt = firestore.FieldValue.serverTimestamp();
        return userRef.doc(this.id).set(Object.assign({}, this.data))
    }

    verify_password(raw_password){
        // console.log('Raw Pass::', (new Crypt(this.data.password).decrypt(this.data.phone)))
        // console.log('User Data::', this.data)
        return new Crypt(this.data.password).decrypt(this.data.phone) === raw_password
    }
    static async verify_phone(phone){
        const _user = await userRef
            .where('phone', '==', phone)
            .limit(1)
            .get();
        if(!_user.empty)
            return _user.docs[0]
        return null
    }
}

function Model(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.passkey = '';
    this.isAdmin = false;
    this.isSuper = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
}

export const UserModel = Model
export default User