import * as types from './mutation-types'
import createKandy from '../../kandy.link.js'
import store from './index'
import state from './state'
import IMService from '../IMService'
import _ from 'lodash'

export const setCredentials = ({ commit }, credentials) => {
  if (credentials) {
    commit(types.SET_CREDENTIALS, credentials)
  }
}

export const connect = ({ commit }, credentials) => {
  addEventListeners()
  console.log(
    'credentials ' + credentials.username + ' ' + credentials.password
  )
  kandy.connect(credentials)
}
export const send = ({ commit }, message) => {
  // send;
  // context.commit (types.SEND, participant, message);
  console.log('sent message ' + message.text + ' to ' + message.participant)
  sendMessage(message.participant, message.text)
}

export const retrieveCallLogs = ({ commit }, message) => {
  // amount = 20, offset = 0
  kandy.call.history.fetch(amount, offset) // fetch
}

export const removeCallLog = recordId => {
  kandy.call.history.remove(recordId) // remove
}
export const removeCallHistory = ({ commit }) => {
  kandy.call.history.ckear('all') // clear
}
export const getCallLogs = ({ commit }) => {
  let logs = kandy.call.history.get()
  store.commit('REFRESH_CALLLOGS', logs)
}

export const call = ({ commit }, params) => {
  let local = document.getElementById('local-container')
  let remote = document.getElementById('remote-container')
  const myVideoResolution = {
    height: 640,
    width: 480
  }
  const options = {
    isAudioEnabled: true, // document.getElementById ('isAudioEnabled').checked,
    isVideoEnabled: false, // document.getElementById ('isVideoEnabled').checked,
    sendInitialVideo: false, // document.getElementById ('sendInitialVideo').checked,
    sendScreenShare: false, // document.getElementById ('sendScreenShare').checked,
    videoResolution: myVideoResolution,
    // localVideoContainer: this.$ref.local-container, // document.getElementById('local-container'),
    // remoteVideoContainer: this.$ref.remote-container //document.getElementById('remote-container')
    localVideoContainer: local, // document.getElementById ('local-container'), //olmadi this.$refs.container1, //
    remoteVideoContainer: remote // document.getElementById ('remote-container'),
  }

  console.log('start call to:' + params.callee)
  // options.isVideoEnabled = false;
  // options.sendInitialVideo = false;
  kandy.call.make(params.callee, options)
  // store.commit("SET_CALLEE", callee);
}

export const callVideo = ({ commit }, callee) => {
  console.log('call to:' + callee)
  options.isVideoEnabled = true
  options.sendInitialVideo = true

  kandy.call.make(callee, options)
  // store.commit("SET_CALLEE", callee);
}

export const answer = ({ commit }) => {}

export const reject = ({ commit }) => {}

export const ignore = ({ commit }) => {}

export const end = ({ commit, state }) => {
  kandy.call.end(state.activeCall.id)
}

export const hold = ({ commit, state }) => {
  kandy.call.hold(state.activeCall.id)
}

export const unhold = ({ commit }) => {
  kandy.call.unhold(state.activeCall.id)
}

export const mute = ({ commit }) => {
  kandy.call.mute(state.activeCall.id)
}

export const unmute = ({ commit }) => {
  kandy.call.unmute(state.activeCall.id)
}

export const updateContact = ({ commit }, id, editContact) => {
  kandy.contacts.update(btoa(id), editContact)
}
export const addContact = ({ commit }, newContact) => {
  kandy.contacts.add(newContact)
}
export const removeContact = ({ commit }, id) => {
  kandy.contacts.remove(String(id))
}

export const search = ({ commit }, query) => {
  kandy.contacts.search(query, 'FIRSTNAME')
}
function sendMessage (participant, messagetoSend) {
  // currentConvo = self.getConversation(participant)
  const currentConvo = kandy.conversation.get(participant)
  let convoExist = false
  const message = currentConvo.createMessage(messagetoSend)

  // dont add new conv if already exist
  // store.state.conversations.forEach(function (conv) {
  //   if (conv.destination === currentConvo.destination) convoExist = true
  // })
  // if (!convoExist) {
  //   // store.commit('ADD_CONVERSATION', currentConvo)
  // }
  message.send()
  Object.keys(currentConvo).forEach(function (key) {
    console.log('heyyo ' + key, currentConvo[key])
  })
  // console.log('currentConvo: ' + currentConvo)
}

function getMessages () {
  let messages = IMService.getMessages()
  // store.dispatch('setConversations', _.cloneDeep(messages))
  store.commit('SET_CONVERSATIONS', _.cloneDeep(messages))
}

function addEventListeners () {
  kandy.on('auth:change', function (data) {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    if (kandy.getConnection().isConnected === true) {
      //  store.dispatch ('refresh');
      // self = kandy.user.getSelf()
      // store.commit('SET_SELF', self)
      kandy.contacts.refresh()
      getMessages()
      // this.refreshContacts ();
      kandy.call.history.fetch()

      kandy.user.fetch('saynaci@genband.com')
      // kandy.contacts.fetchDetails()
      //
      // retrieveCallLogs()
      // Kandyjs.getCallLogs ();
      // Kandyjs.fetchConversations ();
      // Kandyjs.searchDirectory ();
    }
  })

  kandy.on('call:stateChange', call => {
    // Get active calls.
    // let calls = kandy.call.getAll()
    // Get active calls.
    // console.log('caller Name: ' + call.callerName)
    // console.log('call id: ' + call.id)
    // calls.forEach(call => {
    //   return call.state !== 'ENDED';
    let calls = kandy.call.getAll()
    store.commit('UPDATE_CALLS', calls)

    let calls2 = calls.filter(function (call) {
      return call.state !== 'ENDED'
      // console.log('caller Name: ' + call.callerName)
      // console.log('call id: ' + call.id)
      // calls.forEach(call => {
      //   return call.state !== 'ENDED';
    })
    store.commit('UPDATE_SESSIONS', calls2)
  })

  kandy.on('call:start', function (params) {
    // store.commit("SET_CALL_START", "");
    store.commit('SET_ACTIVE_CALL', params)
    // const calls = kandy.call.getAll();
    // calls.forEach(function(call) {
    //   console.log("all call ids currently : " + params.callId);
    //   //change activeCall
    //   if (call.id === params.callId) {
    //     store.commit("SET_ACTIVE_CALL", call);
    //     store.dispatch("toggleActiveCall");
    //     // store.commit (types.SET_ACTIVE_CALL, call);
    //   }
    // });
  })

  kandy.on('contacts:change', params => {
    store.commit('REFRESH_DIRECTORY', params.contacts)
    // store.dispatch ('refresh', params.contacts);
  })

  kandy.on('directory:change', params => {
    // store.dispatch("refresh");
    //  store.commit ('REFRESH_DIRECTORY', params.results);
    //   console.log ('directory' + params[0]);
    //  store.commit ('SET_USER', params.results[0]);
    store.commit('REFRESH_CONTACTS', params.results)
    // store.commit("SET_CALL_NAMES", params.results[0]);
  })

  kandy.on('conversations:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  kandy.on('messages:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  kandy.on('user:fetch', res => {
    console.log('user fetch ' + JSON.stringify(res))
    store.commit('SET_SELF', res)
  })

  //   kandy.on('callHistory:change', res => {
  //     let history = kandy.call.history.get()
  //     console.log('history ' + history)
  //   })

  kandy.on('callHistory:change', params => {
    let logs = kandy.call.history.get()
    store.commit('REFRESH_CALLLOGS', logs)
  })
}
// This line is used to create a new instans of Kandy
const kandy = createKandy({
  authentication: {
    subscription: {
      expires: 3600,
      service: ['IM', 'Presence', 'call'],
      protocol: 'https',
      server: 'spidr-ucc.genband.com',
      version: '1',
      port: '443'
    },
    websocket: {
      protocol: 'wss',
      server: 'spidr-ucc.genband.com',
      port: '443'
    }
  },
  logs: {
    logLevel: 'debug',
    enableFcsLogs: true
  },
  call: {
    chromeExtensionId: 'put real extension ID here',
    serverProvidedTurnCredentials: true,
    iceserver: [
      {
        url: 'stun:turn-ucc-1.genband.com:3478?transport=udp'
      },
      {
        url: 'stun:turn-ucc-2.genband.com:3478?transport=udp'
      },
      {
        url: 'turns:turn-ucc-1.genband.com:443?transport=tcp',
        credential: ''
      },
      {
        url: 'turns:turn-ucc-2.genband.com:443?transport=tcp',
        credential: ''
      }
    ]
  }
})

createKandy()

export const setPresence = ({ commit }, args) => {
  var params = {
    status: '',
    activity: '',
    note: '' // args.note
  }

  switch (args) {
    case '0':
      params.status = 'open'
      params.activity = 'unknown'
      break
    case '1':
      params.status = 'closed'
      params.activity = 'unknown'
      break
    case '2':
      params.status = 'open'
      params.activity = 'away'
      break
    case '3':
      params.status = 'open'
      params.activity = 'lunch'
      break
    case '4':
      params.status = 'closed'
      params.activity = 'busy'
      break
    case '5':
      params.status = 'closed'
      params.activity = 'vacation'
      break
    case '6':
      params.status = 'open'
      params.activity = 'other'
      params.note = 'be right Back'
      break

    default:
      break
  }
  console.log(
    'Peer: setPresence state.. : ' + params.status + '' + params.activity
  )
  kandy.presence.update(params.status, params.activity, params.note)
}
