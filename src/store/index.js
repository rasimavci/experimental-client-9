import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
// import mutations from './mutations'
import * as types from './mutation-types'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state,
  actions,
  getters,
  mutations: {
    [types.SET_SELF] (state, self) {
      state.self = self
      console.log('self ' + self)
    },
    [types.SET_CONTACTSOURCE] (state, source) {
      state.contactSource = source
      console.log('contactSource ' + source)
    },
    [types.SET_SORTBY] (state, sortBy) {
      state.sortBy = sortBy
    },
    [types.UPDATE_CURRENTPAGE] (state, page) {
      state.currentPage = page
    },
    [types.SET_ACTIVECALLTAB] (state, tab) {
      state.activeCallTab = tab
      console.log('activeCallTab ' + tab)
    },
    [types.SET_CREDENTIALS] (state, credentials) {
      state.credentials = credentials
    },

    [types.REFRESH_DIRECTORY] (state, contacts) {
      //   contacts.forEach(contact => console.log(contact.firstName))
      //
      state.contacts = contacts
    },

    [types.REFRESH_CONTACTS] (state, contacts) {
      //   contacts.forEach(contact => console.log(contact.firstName))
      //
      state.directory = contacts
    },

    [types.ADD_CONVERSATION] (state, conv) {
      console.log('yeni conv')
      state.conversations.push(conv)
    },

    [types.SET_CONVERSATIONS] (state, conversations) {
      state.conversations = conversations
    },

    [types.REFRESH_CALLLOGS] (state, logs) {
      console.log('refresh call logs')
      state.history = logs
      console.log(logs)
    },

    [types.UPDATE_CALLS] (state, calls) {
      state.calls = calls
      calls.forEach(function (call) {
        if (
          call.id === state.activeCall.callId ||
          call.id === state.activeCall.id
        ) {
          state.activeCall = call
        }
      })
    },

    [types.UPDATE_SESSIONS] (state, calls) {
      state.sessions = calls
    },

    [types.SET_ACTIVE_CALL] (state, call) {
      state.activeCall = call
    },

    [types.SET_ACTIVECALLID] (state, to) {
      state.activeCall.to = to
    },

    [types.RINGING_SOUND] (state, options) {
      if (options.play) {
        state.sounds.ringing.loop = true
        state.sounds.ringing.play()
      } else {
        state.sounds.ringing.pause()
        state.sounds.ringing.load()
      }
    }
  }
})
export default store
