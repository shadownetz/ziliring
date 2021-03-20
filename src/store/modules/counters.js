import {counterRef, packageRef} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        counters: {
            listener: null,
            users: {},
            contributions: {},
        },
        packages: {
            listener: null,
            data: []
        }
    },
    getters: {
        getUsersCounter: (state)=>state.counters.users,
        getContributionCounter: (state)=>state.counters.contributions,
        getPackages: (state)=>state.packages.data,
    },
    mutations: {
        setUsersCounter: (state, payload)=>state.counters.users = payload,
        setContributionCounter: (state, payload)=>state.counters.contributions = payload,
        setPackages: (state, payload)=>state.packages.data = payload,
        reset(state){
            if(state.counters.listener !== null) state.counters.listener();
            if(state.packages.listener !== null) state.packages.listener();
            state.counters.listener = state.packages.listener = null;
        }
    },
    actions: {
        fetch({state, commit}){
            state.counters.listener = counterRef
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc=>{
                        if(doc.id === 'users'){
                            commit('setUsersCounter', doc.data())
                        }
                        if(doc.id === 'contributions'){
                            commit('setContributionCounter', doc.data())
                        }
                    })
                });
            state.packages.listener = packageRef
                .orderBy('createdAt')
                .onSnapshot(snapshot => {
                    const tmp_arr = [];
                    snapshot.forEach(doc=>{
                        tmp_arr.push({id: doc.id, data: doc.data()})
                    })
                    commit('setPackages', tmp_arr)
                })
        }
    }
}