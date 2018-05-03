import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
	strict: false,
	state,
  actions,
  getters,
	mutations:{
    [types.SET_CREDENTIALS] (state, credentials) {
      state.credentials = credentials
    }
  }
})

export default store
