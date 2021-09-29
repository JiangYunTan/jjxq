import Vue from 'vue'
import Vuex from 'vuex'
// 储存token
import userModule from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user: userModule
  }
})
