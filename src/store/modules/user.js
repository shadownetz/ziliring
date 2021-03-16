import {ResponseObject} from "../../utils/globalObjects";
import {userRef} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}}
    },
    getters: {
        getUser: (state)=>state.user,
    },
    mutations: {
        setUser: (state, payload)=>state.user = payload
    },
    actions: {
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
        }
    }
}