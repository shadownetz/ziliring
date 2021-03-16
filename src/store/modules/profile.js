import {ResponseObject} from "../../utils/globalObjects";
import {profileRef} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async get(context, id){
            const response = new ResponseObject();
            try{
                const profile = await profileRef.doc(id).get();
                if(profile.exists){
                    response.data.id = profile.id;
                    response.data.data = profile.data();
                }else{
                    throw new Error("Profile does not exist")
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
                console.log('Error fetching profile::', e)
            }
            return Promise.resolve(response)
        }
    }
}