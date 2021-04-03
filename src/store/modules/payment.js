import {paymentRef} from "../../firebase/firebase";
import {ResponseObject} from "../../utils/globalObjects";
import firebase from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        payments: [],
        loading: false,
        listener: null
    },
    getters: {
        getPayments: (state)=>state.payments,
        isLoading: (state)=>state.loading
    },
    mutations: {
        setPayments: (state, payload)=>state.payments=payload,
        setLoading: (state, payload)=>state.loading=payload,
        reset(state){
            if(state.listener !== null) state.listener();
            state.listener = null;
            state.payments = [];
            state.loading = false
        }
    },
    actions: {
        fetch({state, commit}){
            commit('setLoading', true)
            state.listener = paymentRef
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    const tmp_arr = [];
                    snapshot.forEach(doc=>{
                        if(doc.exists){
                            tmp_arr.push({id: doc.id, data: doc.data()})
                        }
                    });
                    commit('setPayments', tmp_arr);
                    commit('setLoading', false)
                }, (err)=>{
                    console.log('Unable to query payments', err)
                    commit('setLoading', false)
                }, ()=>{
                    commit('setLoading', false)
                })
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
        async queryPendingAsDownliner({rootGetters}){
            const response = new ResponseObject();
            response.data.result = [];
            try{
                const queriedSnapshots = await paymentRef
                    .where('userId', '==', rootGetters['user/getUser'].id)
                    .where('confirmed', '==', false)
                    .where('reported', '==', false)
                    .where('isValid', '==', true)
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
                console.log('Err fetching queried payment::', e)
            }
            return Promise.resolve(response)
        },
        async queryPendingPaymentsAsUpliner({rootGetters}){
            const response = new ResponseObject();
            response.data.result = [];
            try{
                const queriedSnapshots = await paymentRef
                    .where('receiverId', '==', rootGetters['user/getUser'].id)
                    .where('confirmed', '==', false)
                    .where('reported', '==', false)
                    .where('isValid', '==', true)
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
                console.log('Err fetching all queried payment as upliner::', e)
            }
            return Promise.resolve(response)
        },
        async queryPaymentsAsDownliner({rootGetters}){
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
                console.log('Err fetching all queried payment as downliner::', e)
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
        async queryReportedPayments(){
            const response = new ResponseObject();
            response.data = [];
            try{
                const paymentsSnapshot = await paymentRef
                    .where('reported', '==', true)
                    .get();
                if(!paymentsSnapshot.empty){
                    paymentsSnapshot.forEach(doc=>{
                        if(doc.exists){
                            response.data.push({id: doc.id, data: doc.data()})
                        }
                    })
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}