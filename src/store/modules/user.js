import {ResponseObject} from "../../utils/globalObjects";
import {userRef} from "../../firebase/firebase";
import User from "../../models/user";

export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}},
        listener: null
    },
    getters: {
        getUser: (state)=>state.user,
    },
    mutations: {
        setUser: (state, payload)=>{
            state.user = payload;
        },
        reset(state){
            if(state.listener !== null){
                state.listener();
            }
            state.listener = null
        }
    },
    actions: {
        async setListener({commit}, id){
            userRef.doc(id).onSnapshot(doc=>{
                if(doc.exists){
                    commit('setUser', {id: doc.id, data: doc.data()})
                }
            })
        },
        async get(context, id){
            const response = new ResponseObject();
            try{
                const user = await userRef.doc(id).get();
                if(user.exists){
                    response.data.id = user.id;
                    response.data.data = user.data();
                }else{
                    throw new Error('User does not exist')
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
                console.log('Error fetching user::', e)
            }
            return Promise.resolve(response)
        },
        async edit({rootGetters}, data){
            const response = new ResponseObject();
            try{
                const tmp_user = new User(rootGetters['user/getUser'].id);
                await tmp_user.update(data)
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}