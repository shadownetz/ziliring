import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

import auth from "./modules/auth";
import user from "./modules/user";
import packageModule from "./modules/package";
import contribution from "./modules/contribution";
import payment from "./modules/payment";
import profile from "./modules/profile";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'ziliring',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    package: packageModule,
    contribution,
    payment,
    profile
  }
})
