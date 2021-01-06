import Vue from 'vue'
import Vuex from 'vuex'
import userStor from './modules/userStor'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      arr:['anal','anal2','anal3','anal4']
  },
  mutations: {
      
  },

  actions: {
  },
  modules: {
    userStor:userStor
  }
})