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
        }
    }
}