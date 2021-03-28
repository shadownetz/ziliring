import {ResponseObject} from "../../utils/globalObjects";
import {profileRef} from "../../firebase/firebase";
import Profile from "../../models/profile";

export default {
    namespaced: true,
    state: {
        profile: {id: '', data: {}},
        listener: null,
        bankCodes: {
            "100": "SunTrust Bank",
            "214": "First City Monument Bank",
            "215": "Unity Bank",
            "221": "Stanbic IBTC Bank",
            "232": "Sterling Bank",
            "301": "JAIZ Bank",
            "559": "Coronation Merchant Bank",
            "601": "FSDH",
            "070": "Fidelity Bank",
            "030": "Heritage",
            "076": "Skye Bank",
            "032": "Union Bank",
            "033": "United Bank for Africa",
            "035": "Wema Bank",
            "082": "Keystone Bank",
            "084": "Enterprise Bank",
            "044": "Access Bank",
            "050": "Ecobank Plc",
            "011": "First Bank of Nigeria",
            "057": "Zenith Bank",
            "058": "GTBank Plc",
            "063": "Diamond Bank",
            "023": "CitiBank",
            "068": "Standard Chartered Bank",
        }
    },
    getters: {
        getProfile: (state)=>state.profile,
        getBankCodes: (state)=>state.bankCodes
    },
    mutations: {
        setProfile: (state, payload)=>state.profile=payload,
        reset(state){
            if(state.listener!==null){
                state.listener();
                state.listener = null;
            }
        }
    },
    actions: {
        async init({state, commit, rootGetters}, {force = false}){
            const response = new ResponseObject();
            try{
                if(force){
                    const profile = await profileRef.doc(rootGetters['user/getUser'].id).get();
                    if(profile.exists){
                        commit('setProfile', {
                            id: profile.id,
                            data: profile.data()
                        })
                    }
                }
                state.listener = await profileRef.doc(rootGetters['user/getUser'].id)
                    .onSnapshot(doc=>{
                        if(doc.exists){
                            commit('setProfile', {
                                id: doc.id,
                                data: doc.data()
                            })
                        }
                    });
            }catch (e) {
                response.status = false;
                response.message = e.message
            }
            return Promise.resolve(response)
        },
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
        },
        async edit({rootGetters}, data){
            const response = new ResponseObject();
            try{
                const tmp_profile = new Profile({id: rootGetters['profile/getProfile'].id});
                await tmp_profile.update(data)
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        },
        async updateBankDetails({rootGetters}, data){
            const response = new ResponseObject();
            try{
                await profileRef
                    .doc(rootGetters['profile/getProfile'].id)
                    .update({
                        bankName : data._bankName,
                        bankAccountName : data._bankAccountName,
                        bankAccountNumber : data._bankAccountNumber
                    });
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        },
        async getPurgedProfiles(){
            const response = new ResponseObject();
            response.data = [];
            try{
                const profileSnapshots = await profileRef
                    .where('isActive', '==', false)
                    .get();
                if(!profileSnapshots.empty){
                    profileSnapshots.forEach(doc=>{
                        if(doc.exists){
                            response.data.push({id: doc.id, data: doc.data()})
                        }
                    });
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
            }
            return Promise.resolve(response)
        }
    }
}