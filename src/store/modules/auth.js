import firebase from "../../firebase/firebase";
import iziToast from "izitoast";

import {ResponseObject} from "../../utils/globalObjects";
import User from "../../models/user";
import router from "../../router";
import store from "../../store/index"

export default {
    namespaced: true,
    state: {
        recaptchaStatus: false,
        signedIn: false
    },
    getters: {
        getRecaptchaStatus: state=>state.recaptchaStatus,
        getConfirmationResult: state=>state.confirmationResult,
        isSignedIn: (state)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                state.signedIn = !!user;
            })
            return state.signedIn
        }
    },
    mutations: {
        setRecaptchaStatus: (state, payload) => state.recaptchaStatus = payload,
    },
    actions: {
        async registerWithPhone(context, phoneNumber){
            let response = new ResponseObject();
            const appVerifier = window.recaptchaVerifier;
            try{
                window.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
            }catch (e) {
                response.status = false;
                response.message = e.message;
                window.recaptchaVerifier.reset(window.recaptchaWidgetId)
            }
            return Promise.resolve(response)
        },
        async proceedToLogin({commit}, {code, userData}){
            let response = new ResponseObject();
            try{
                const result = await window.confirmationResult.confirm(code);
                const user = new User(result.user.uid, userData);
                await user.add();
                await user.fetch();
                await store.dispatch('profile/init')
                commit('user/setUser', {
                    id: user.id,
                    data: user.data
                }, {root: true})
            }catch (e) {
                console.log(e)
                response.status = false;
                response.message = 'Invalid verification code'
            }
            return Promise.resolve(response)
        },
        async loginWithPhone(context, phoneNumber){
            let response = new ResponseObject();
            const appVerifier = window.recaptchaVerifier;
            try{
                if(await User.verify_phone(phoneNumber)){
                    window.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
                }else{
                    throw new Error("Invalid phone number")
                }
            }catch (e) {
                response.status = false;
                response.message = e.message;
                window.recaptchaVerifier.reset(window.recaptchaWidgetId)
            }
            return Promise.resolve(response)
        },
        async proceedToDashboard({commit, dispatch}, {code, password}){
            let response = new ResponseObject();
            try{
                const result = await window.confirmationResult.confirm(code);
                const user = new User(result.user.uid);
                await user.fetch();
                if(user.verify_password(password)){
                    const {id, data} = user;
                    await store.dispatch('profile/init')
                    commit('user/setUser', {id, data}, {root: true})
                }else{
                    await dispatch('logout');
                    throw new Error("Invalid password")
                }

            }catch (e) {
                console.log(e)
                response.status = false;
                response.message = e.message||'Error Navigating to dashboard'
            }
            return Promise.resolve(response)
        },
        initRecaptcha({commit}, recaptchaContainer){
            commit('setRecaptchaStatus', false)
            firebase.auth().useDeviceLanguage();
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaContainer, {
                'size': 'normal',
                // eslint-disable-next-line no-unused-vars
                'callback': (response) => {
                    commit('setRecaptchaStatus', true)
                    iziToast.info({message: 'reCAPTCHA Completed!'})
                },
                'expired-callback': () => iziToast.warning({message: 'reCAPTCHA Timed out'})
            });
            window.recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId;
            });
        },
        async logout(context, reset=true){
            try{
                if(reset){
                    //
                    const route = router.resolve({name: 'Home'}).resolved.fullPath.split('/')
                    route.pop();
                    window.location.href = route.join('/');
                }
                await firebase.auth().signOut()
            }catch (e) {
                console.log("Err while logging out::", e.message)
            }
        }
    }
}