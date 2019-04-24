import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations/index'
import actions from './actions/index'
import getters from './getters/index'

Vue.use(Vuex)

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export function createStore() {
  return store
}

export default store
