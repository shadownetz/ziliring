import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIziToast from 'vue-izitoast';
import firebase from "./firebase/firebase";
import 'izitoast/dist/css/iziToast.min.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueCountryCode from "vue-country-code";

Vue.config.productionTip = false

Vue.use(Loading);
Vue.use(VueCountryCode);
Vue.use(VueIziToast, {
  position: 'bottomCenter'
});


let app;
firebase.auth().onAuthStateChanged(function(){
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
