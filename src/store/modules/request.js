import {ResponseObject} from "../../utils/globalObjects";
import Request from "../../models/request";
import {requestRef} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        requests: [],
        loading: false,
        listener: null
    },
    getters: {
        getRequests: (state)=>state.requests,
        isLoading: (state)=>state.loading,
    },
    mutations: {
        setRequests: (state, payload)=>state.requests=payload,
        setLoading: (state, payload)=>state.loading=payload,
        reset(state){
            if(state.listener !== null) state.listener();
            state.requests = [];
            state.listener = null;
            state.loading = false;
        }
    },
    actions: {
        fetch({state, commit}){
            commit('setLoading', true)
            state.listener = requestRef
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    let tmp_arr = [];
                    snapshot.forEach(doc=>{
                        tmp_arr.push({id: doc.id, data: doc.data()})
                    })
                    commit('setRequests', tmp_arr)
                    commit('setLoading', false)
                }, error => {
                    commit('setLoading', false)
                    console.log('Error fetching requests:', error.message)
                }, ()=>{ commit('setLoading', false) })
        },
        async queryPersonal({rootGetters}){
            const response = new ResponseObject();
            response.data = [];
            try{
                const snapshots = await requestRef
                    .where('createdBy', '==', rootGetters['user/getUser'].id)
                    .orderBy('createdAt', 'desc')
                    .get();
                if(!snapshots.empty){
                    snapshots.forEach(doc=>{
                        if(doc.exists){
                            response.data.push({id: doc.id, data: doc.data()})
                        }
                    })
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
                console.log('Error fetching requests:', e.message)
            }
            return Promise.resolve(response)
        },
        async add({rootGetters}, data){
            const response = new ResponseObject();
            try{
                const new_request = new Request({data});
                await new_request.add(rootGetters['user/getUser'].id)
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        },
        async edit(context, payload){
            const response = new ResponseObject();
            try{
                const new_request = new Request({...payload});
                await new_request.update()
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}