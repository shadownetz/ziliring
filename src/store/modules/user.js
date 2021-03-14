
export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}}
    },
    getters: {
        getUser: (state)=>state.user
    },
    mutations: {
        setUser: (state, payload)=>state.user = payload
    },
    actions: {

    }
}