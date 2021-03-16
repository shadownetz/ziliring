import {packageRef} from "../../firebase/firebase";
import {ResponseObject} from "../../utils/globalObjects";

export default {
    namespaced: true,
    state: {
        packages: []
    },
    getters: {
        getPackages: (state)=>state.packages
    },
    mutations: {
        setPackages: (state, payload)=>state.packages = payload
    },
    actions: {
        async fetch({commit}){
            try{
                const packagesSnapshot = await packageRef.orderBy('createdAt').get();
                const packages = [];
                packagesSnapshot.forEach(doc=>{
                    packages.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                commit('setPackages', packages)
            }catch (e) {
                console.log('Error fetching packages:', e.message)
            }
        },
        async get(context, id){
            const response = new ResponseObject();
            try{
                const package_z = await packageRef.doc(id).get();
                if(package_z.exists){
                    response.data.id = package_z.id;
                    response.data.data = package_z.data();
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}