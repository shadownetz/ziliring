import {paymentRef} from "../../firebase/firebase";
import {ResponseObject} from "../../utils/globalObjects";
import firebase from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        fetch(){
            //
        },
        async get(context, id){
            const response = new ResponseObject();
            try{
                const payment = await paymentRef.doc(id).get();
                if(payment.exists){
                    response.data.id = payment.id;
                    response.data.data = payment.data()
                }
            }catch (e) {
                response.status = false;
                response.message = e.message
            }
            return Promise.resolve(response)
        },
        async queryPending({rootGetters}, limit=10){
            const response = new ResponseObject();
            response.data.result = [];
            try{
                const queriedSnapshots = await paymentRef
                    .where('userId', '==', rootGetters['user/getUser'].id)
                    .where('confirmed', '==', false)
                    .orderBy('createdAt', 'desc')
                    .limit(limit)
                    .get();
                queriedSnapshots.forEach(doc=>{
                    if(doc.exists){
                        response.data.result.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                })
            }catch (e) {
                response.message = e.message;
                response.status = false;
                console.log('Err fetching queried payment::', e)
            }
            return Promise.resolve(response)
        },
        async queryAll({rootGetters}){
            const response = new ResponseObject();
            response.data.result = [];
            try{
                const queriedSnapshots = await paymentRef
                    .where('userId', '==', rootGetters['user/getUser'].id)
                    .orderBy('createdAt', 'desc')
                    .get();
                queriedSnapshots.forEach(doc=>{
                    if(doc.exists){
                        response.data.result.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                })
            }catch (e) {
                response.message = e.message;
                response.status = false;
                console.log('Err fetching all queried payment::', e)
            }
            return Promise.resolve(response)
        },
        async uploadPaymentProof(context, {id, fileURL}){
            const response = new ResponseObject();
            try{
                await paymentRef.doc(id).update({
                    proof: firebase.firestore.FieldValue.arrayUnion(fileURL)
                })
            }catch (e) {
                response.status = false;
                response.message = e.message
            }
            return Promise.resolve(response)
        },
    }
}