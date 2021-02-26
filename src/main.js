import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';

Vue.config.productionTip = false

Vue.use(VueIziToast, {
  position: 'bottomCenter'
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
