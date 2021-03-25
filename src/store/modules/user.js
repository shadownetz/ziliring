import {ResponseObject} from "../../utils/globalObjects";
import {userRef} from "../../firebase/firebase";
import User from "../../models/user";

export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}},
        users: [],
        loading: false,
        users_listener: null,
        listener: null
    },
    getters: {
        getUser: (state)=>state.user,
        getUsers: (state)=>state.users,
        getLoading: (state)=>state.loading
    },
    mutations: {
        setUser: (state, payload)=>{
            state.user = payload;
        },
        setUsers: (state, payload)=>state.users=payload,
        setLoading: (state, payload)=>state.loading = payload,
        reset(state){
            if(state.listener !== null){
                state.listener();
            }
            if(state.users_listener !== null){
                state.users_listener();
            }
            state.listener = state.users_listener = null
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
        async fetch({state, rootGetters, commit}){
            if(rootGetters['user/getUser'].data.isAdmin){
                commit('setLoading', true)
                state.users_listener = userRef
                    .where('isSuper', '==', false)
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(snapshot => {
                            const tmp_arr = [];
                            snapshot.forEach(doc=>{
                                tmp_arr.push({id: doc.id, data: doc.data()})
                            })
                            commit('setUsers', tmp_arr)
                            commit('setLoading', false)
                        },
                        (err)=>{
                            commit('setLoading', false)
                            console.log('Err fetching users::', err.message)
                        },
                        ()=>{
                            commit('setLoading', false)
                        },
                    )
            }
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