import {ResponseObject} from "../../utils/globalObjects";
import {ContributionModel} from "../../models/contribution";
import {contributionRef, firestore} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        personalContrib: [],
        activeContrib: []
    },
    getters: {
        getPersonalContrib: (state)=>state.personalContrib,
        getActiveContrib: (state)=>state.activeContrib
    },
    mutations: {
        setPersonalContrib: (state, payload)=>state.personalContrib=payload,
        setActiveContrib: (state, payload)=>state.activeContrib=payload,
        reset(state){
            state.activeContrib = state.personalContrib = []
        }
    },
    actions: {
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
        }
    }
}