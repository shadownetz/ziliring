import {contributionRef, counterRef, packageRef, paymentRef} from "../../firebase/firebase";
import {ResponseObject} from "../../utils/globalObjects";

export default {
    namespaced: true,
    state: {
        counters: {
            listener: null,
            users: {},
            contributions: {},
        },
        user: {
            contributions: 0,
            pendingPayments: 0
        },
        packages: {
            listener: null,
            data: []
        }
    },
    getters: {
        getUsersCounter: (state)=>state.counters.users,
        getContributionCounter: (state)=>state.counters.contributions,
        getUserContributions: (state)=>state.user.contributions,
        getUserPendingPayments: (state)=>state.user.pendingPayments,
        getPackages: (state)=>state.packages.data,
    },
    mutations: {
        setUsersCounter: (state, payload)=>state.counters.users = payload,
        setContributionCounter: (state, payload)=>state.counters.contributions = payload,
        setUserContributions: (state, payload)=>state.user.contributions = payload,
        setUserPendingPayments: (state, payload)=>state.user.pendingPayments=payload,
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
        },
        async fetchUserStatistics({commit, rootGetters}){
            const response = new ResponseObject();
            try{
                let snapshots = await contributionRef
                    .where('userId', '==', rootGetters['user/getUser'].id)
                    .get();
                if(!snapshots.empty)commit('setUserContributions', snapshots.size);
                snapshots = await paymentRef
                    .where('userId', '==', rootGetters['user/getUser'].id)
                    .where('confirmed', '==', false)
                    .get()
                if(!snapshots.empty)commit('setUserPendingPayments', snapshots.size)
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}