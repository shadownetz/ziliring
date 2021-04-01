import {ResponseObject} from "../../utils/globalObjects";
import Contribution, {ContributionModel} from "../../models/contribution";
import {contributionRef, firestore} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        contributions: [],
        listener: null,
        loading: false,
        personalContrib: [],
        activeContrib: []
    },
    getters: {
        getPersonalContrib: (state)=>state.personalContrib,
        getActiveContrib: (state)=>state.activeContrib,
        getContributions: (state)=>state.contributions,
        getLoading: (state)=>state.loading
    },
    mutations: {
        setPersonalContrib: (state, payload)=>state.personalContrib=payload,
        setActiveContrib: (state, payload)=>state.activeContrib=payload,
        setContributions: (state, payload)=>state.contributions=payload,
        setLoading: (state, payload)=>state.loading=payload,
        reset(state){
            if(state.listener!==null)state.listener()
            state.activeContrib = state.personalContrib = state.contributions = []
            state.listener = null;
            state.loading = false;
        }
    },
    actions: {
        async fetch({state, commit}){
            commit('setLoading', true)
            state.listener = contributionRef
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    let tmp_arr = [];
                    snapshot.forEach(doc=>{
                        if(doc.exists){
                            tmp_arr.push({id: doc.id, data: doc.data()})
                        }
                    });
                    commit('setContributions', tmp_arr);
                    commit('setLoading', false)
                }, err=>{
                    commit('setLoading', false)
                    console.log('Unable to fetch contributions:', err.message)
                }, ()=>{commit('setLoading', false)})
        },
        async queryPersonal({commit, rootGetters}){
            contributionRef
                .where('userId', '==', rootGetters['user/getUser'].id)
                .orderBy('createdAt', 'desc')
                .get()
                .then((snapshot)=>{
                    const tmp_array = [];
                    snapshot.forEach(doc=>{
                        if(doc.exists){
                            tmp_array.push({
                                id: doc.id,
                                data: doc.data()
                            })
                        }
                    });
                    commit('setPersonalContrib', tmp_array)
                })
                .catch(err=>{
                    console.log('Error fetching contributions::', err.message)
                })
        },
        async get(context, id){
            const response = new ResponseObject();
            try{
                const contrib = await contributionRef.doc(id).get();
                if(contrib.exists){
                    response.data.id = contrib.id;
                    response.data.data = contrib.data()
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
                console.log('Unable to get contribution:', e)
            }
            return Promise.resolve(response)
        },
        async add({rootGetters}, payload){
            const response = new ResponseObject();
            try{
                const new_contrib = new ContributionModel();
                new_contrib.amountToBePaid = payload.amount;
                new_contrib.packageId = payload.package;
                new_contrib.userId = rootGetters['user/getUser'].id;
                new_contrib.createdAt = new_contrib.updatedAt = firestore.FieldValue.serverTimestamp();
                await contributionRef.add(Object.assign({}, new_contrib))
            }catch (e) {
                response.status = false;
                response.message = e.message;
                console.log(e)
            }
            return Promise.resolve(response)
        },
        async edit(context, payload){
            const response = new ResponseObject();
            try{
                const contrib = new Contribution({...payload});
                await contrib.update()
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}