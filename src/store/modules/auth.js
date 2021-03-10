import firebase from "../../firebase/firebase";
import iziToast from "izitoast";

import {ResponseObject} from "../../utils/mixins/globalObjects";
import User from "../../models/user";

export default {
    namespaced: true,
    state: {
        recaptchaStatus: false,
    },
    getters: {
        getRecaptchaStatus: state=>state.recaptchaStatus,
        getConfirmationResult: state=>state.confirmationResult,
        isSignedIn: ()=>{
            let _user = null;
            firebase.auth().onAuthStateChanged((user)=>{
                _user = user
            })
            return _user
        }
    },
    mutations: {
        setRecaptchaStatus: (state, payload) => state.recaptchaStatus = payload,
    },
    actions: {
        async loginWithPhone(context, phoneNumber){
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
        async proceedToLogin(context, {code, userData}){
            let response = new ResponseObject();
            try{
                const result = await window.confirmationResult.confirm(code);
                const user = new User(result.user.uid, userData);
                await user.add();
            }catch (e) {
                console.log(e)
                response.status = false;
                response.message = 'Invalid verification code'
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
        }
    }
}