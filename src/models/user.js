import {userRef} from "../firebase/firebase";
import {firestore} from "../firebase/firebase";
import Crypt from "../utils/crypt";
import {ResponseObject} from "../utils/globalObjects";

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

    async update(data=null){
        let u_data;
        if(data){
            u_data = data
        }else{
            u_data = Object.assign({}, this.data);
        }
        u_data.updatedAt = firestore.FieldValue.serverTimestamp();
        delete u_data.createdAt;
        return userRef.doc(this.id).update({...u_data})
    }

    verify_password(raw_password){
        // console.log('Raw Pass::', (new Crypt(this.data.password).decrypt(this.data.phone)))
        // console.log('User Data::', this.data)
        return new Crypt(this.data.password).decrypt(this.data.phone) === raw_password
    }
    static async verify_phone(phone){
        let response = new ResponseObject()
        try{
            const snapshots = await userRef
                .where('phone', '==', phone)
                .limit(1)
                .get();
            if(!snapshots.empty)
                response.data = {id: snapshots.docs[0].id, data: snapshots.docs[0].data()};
        }catch (e) {
            response.status = false;
            response.message = e.message;
            console.log('Err verifying phone:', e.message)
        }
        return Promise.resolve(response)
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