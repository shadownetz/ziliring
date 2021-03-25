import {firestore, requestRef} from "../firebase/firebase";

class Request{
    constructor({id='', data={}}) {
        this.id = id;
        this.data = Object.assign(new Model(), data)
    }

    async add(createdBy){
        const new_request = Object.assign({}, this.data);
        new_request.createdBy = createdBy;
        new_request.createdAt = new_request.updatedAt = firestore.FieldValue.serverTimestamp();
        return requestRef.add(new_request)
    }

    async update(){
        const new_request = Object.assign({}, this.data);
        delete new_request.createdAt;
        new_request.updatedAt = firestore.FieldValue.serverTimestamp();
        return requestRef.doc(this.id).update(new_request)
    }
}

function Model(){
    this.context = '';
    this.amount = 0;
    this.createdBy = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = 'pending'     // approved || pending || invalid
}

export default Request
export const RequestModel = Model