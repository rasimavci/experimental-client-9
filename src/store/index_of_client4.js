import Vue from "vue"; // get vue
import Vuex from "vuex"; // get vuex
import VueResource from "vue-resource"; // get $http
import createKandy from "../kandy.link.js";

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  cardData: [],
  conversations: [],
  messages: [],
  calls: [],
  isloadingComplete: false,
  busy: false,
  isShow: false,
  isShow2: false,
  isShow3: false,
  activeContact: "",
  activeCall: { state: "Call ended" },
  lastAction: "",
  user: {},
  lastCallee: "",
  participant: "",
  callstart: false,
  activeCallRinging: false,
  activeCallInCall: false,
  activeCallOnHold: false,
  currentConv: {},
  activeCallEnded: false,
  activeCallExist: false,
  selectedContact: ''
};

const getters = {};

const mutations = {
  updateLoadingState(state, data) {
    state.isloadingComplete = data;
  },
  updateBusyState(state, data) {
    state.busy = data;
  },
  addData(state, data) {
    // state.cardData = state.cardData.concat (data);
  },
  refreshData(state, data) {
    // state.cardData = data;
  },
  isShowAlert(state, data) {
    state.isShow = data;
  },
  isShowAlert2(state, data) {
    state.isShow2 = data;
  },
  isShowAlert3(state, data) {
    state.isShow3 = data;
  },
  updateLastAction(state, action) {
    state.lastAction = action;
  },
  UPDATE_SELECTEDCONTACT(state, data) {
    state.selectedContact = data;
  },
  REFRESH_DIRECTORY(state, data) {
    console.log("data refreshed");
    if (data) state.cardData = data;
  },
  ADD_CONVERSATION(state, conv) {
    console.log("yeni conv");
    state.conversations.push(conv);
    kandy.contacts.search(conv.destination, "USERNAME");
  },
  ADD_CONVERSATION_WITHID(state, destinationId) {
    console.log("yeni conv");
    const conv = {
      destination: destinationId
    };
    state.conversations.push(conv);
    kandy.contacts.search(conv.destination, "USERNAME");
  },
  ADD_MSG_TO_CONVERSATION(state) {
    //adds last msg to each conv in order to show in message.vue
    state.conversations.forEach(function(conv) {
      const messages = conv.getMessages();
      conv.lastMessage = messages[messages.length - 1].parts[0].text;
    });
  },
  GET_MESSAGES_FROM_CONV(state) {
    console.log("add last msg to conv");
    state.conversations.forEach(function(conv) {
      if (state.participant === conv.destination) {
        state.messages = conv.getMessages();

        // add photoUrl from contact data
        state.cardData.forEach(function(card) {
          if (card.primaryContact === conv.destination) {
            state.currentConv.photoUrl = card.photoUrl;
          }
        });
      }
    });
  },
  GET_MESSAGES_WITHID(state) {
    console.log("add last msg to conv");
    state.messages = state.conversations[0].getMessages();
  },
  SET_CHAT_PARTICIPANT(state, participant) {
    console.log("set chat participant as " + participant);
    state.participant = participant;
  },
  SET_ACTIVE_CALL(state, call) {
    console.log("set chat participant as " + call);
    state.activeCall = call;
  },
  SET_USER(state, user) {
    console.log("set user " + user);
    state.user = user;
  },
  SET_USER_WITHID(state, userId) {
    state.cardData.forEach(function(card) {
      if (card.primaryContact === userId) {
        state.user = card;
        state.user.photoUrl = card.photoUrl;
      }
    });

    console.log("set user with id " + userId);
  },
  SET_CALLEE(state, callee) {
    // console.log ('add last msg to conv');
    state.lastCallee = callee;
  },
  SET_CONV_NAMES(state, user) {
    console.log("add last msg to conv");
    state.conversations.forEach(function(conv) {
      if (conv.destination === user.userId) {
        conv.firstName = user.firstName;
        conv.lastName = user.lastName;

        // add photoUrl from contact data
        state.cardData.forEach(function(card) {
          if (card.primaryContact === conv.destination) {
            conv.photoUrl = card.photoUrl;
          }
        });
      }
    });
  },
  SET_CALL_NAMES(state, user) {
    console.log("add last msg to conv");
    state.calls.forEach(function(call) {
      if (call.to === user.userId) {
        call.firstName = user.firstName;
        call.lastName = user.lastName;

        // add photoUrl from contact data
        state.cardData.forEach(function(card) {
          if (card.primaryContact === call.to) {
            call.photoUrl = card.photoUrl;
          }
        });
      }
    });
  },
  SET_CALL_START(state, user) {
    state.callstart = true;
  },

  UPDATE_CALLS(state, calls) {
    console.log("add call if not exist");
    // state.calls = calls;
    var exist = false;
    calls.forEach(function(call) {
      exist = false;
      state.calls.forEach(function(call1) {
        if (call1.to === call.to) {
          if (call.state === "IN_CALL") call1.state = "Active Call";
          else if (call.state === "ON_HOLD") call1.state = "Call on Hold";
          else if (call.state === "ON_REMOTE_HOLD")
            call1.state = "Call on Remote Hold";
          else if (call.state === "ENDED") call1.state = "Call ended";
          else if (call.state === "RINGING") call1.state = "Ringing";
          else if (call.state === "INITIATED") call1.state = "Connecting";

          call1.mediaState = call.mediaState;
          let txt1 = String(call.startTime);
          call1.startTime = txt1.slice(0, 2) + ":" + txt1.slice(2);
          call1.id = call.id;
          call1.sendingVideo = call.sendingVideo;
          call1.muted = call.muted;

          exist = true;

          //also update activeCall
          if ((state.activeCall.id = call.id)) {
            state.activeCall = call1;
            if (call1.state === "Ringing" || call1.state === "Connecting") {
              state.activeCallRinging = true;
            } else {
              state.activeCallRinging = false;
            }
            if (call1.state === "Active Call") {
              state.activeCallInCall = true;
            } else {
              state.activeCallInCall = false;
            }

            if (call1.state === "Call ended") {
              state.activeCallEnded = true;
            } else {
              state.activeCallEnded = false;
            }

            if (call1.state === "Call ended" || call1.state === "Ringing") {
              state.activeCallExist = false;
            } else {
              state.activeCallExist = true;
            }
          }
        }
      });

      //if that call not exist, add new call to state
      if (!exist) {
        let calll = {};
        (calll.to = call.to),
          (calll.startTime = String(call.startTime)),
          (calll.state = call.state),
          (calll.sendingVideo = call.sendingVideo),
          (calll.muted = call.muted),
          state.calls.push(calll);
      }
    });
  }
};

const actions = {
  getData(context, object) {
    // state.cardData.forEach (function (contact) {
    //   console.log ('all call ids curently : ' + contact.firstName);
    // });

    const { progress, isRefresh } = object;
    progress.$Progress.start();
    // context.commit ('updateLoadingState', false);
    // context.commit ('updateBusyState', true);
    /**
     * use vue-resource
     */
    // Vue.http.get ('/mock/api.json').then (
    //   response => {
    //     const json = response.data;
    //     context.commit ('updateLoadingState', true);
    //     context.commit ('updateBusyState', false);
    //     if (isRefresh === true) {
    //       context.commit ('refreshData', json);
    //     } else {
    //       context.commit ('addData', json);
    //     }
    progress.$Progress.finish();
    //   },
    //   () => {
    //     context.commit ('updateBusyState', false);
    //     progress.$Progress.fail ();
    //   }
    // );
  },

  // normaly I shouldnt call contacts refresh whenever contact page
  // but needed bcos of search result change after a call.
  getContacts(context, object) {
    kandy.contacts.refresh();
  },

  getConversations(context) {
    // state.conversations.forEach (function (conv) {

    //   const messages = conv.getMessages ();
    //   conv.lastMessages = messages[0].parts[0].text;
    //   console.log (key, conv[key]);
    // });
    //just logging
    let currentConvo = state.conversations[0];
    Object.keys(currentConvo).forEach(function(key) {
      console.log(key, currentConvo[key]);
    });

    //   state.activeConv = conv;
    //   state.messages = conv.getMessages ();
    // state.messages.forEach (function (key) {
    //   console.log (key, state.messages[key]);
    // });

    //adds last msg to conversations..
    context.commit("ADD_MSG_TO_CONVERSATION");
  },

  getMessages(context) {
    context.commit("GET_MESSAGES_FROM_CONV");
  },

  connect({ context }, credentials) {
    addEventListeners();
    console.log(
      "credentials" + credentials.username + " " + credentials.password
    );
    kandy.connect(credentials);
  },

  disconnect({ context }) {
    context.commit(types.DISCONNECT);
  },

  call(context, callee) {
    console.log("call to:" + callee);
    options.isVideoEnabled = false;
    options.sendInitialVideo = false;
    kandy.call.make(callee, options);
    context.commit("SET_CALLEE", callee);
  },

  callVideo(context, callee) {
    console.log("call to:" + callee);
    options.isVideoEnabled = true;
    options.sendInitialVideo = true;

    kandy.call.make(callee, options);
    context.commit("SET_CALLEE", callee);
  },

  answer({ context }) {
    context.commit(types.CALL_ANSWER);
  },

  reject({ context }) {
    context.commit(types.CALL_REJECT);
  },

  ignore({ context }) {
    context.commit(types.CALL_IGNORE);
  },

  hold(context) {
    kandy.call.hold(state.activeCall.id);
  },

  unhold(context) {
    kandy.call.unhold(state.activeCall.id);
  },

  mute(context) {
    kandy.call.mute(state.activeCall.id);
  },

  end(context) {
    kandy.call.end(state.activeCall.id);
  },

  unmute(context) {
    kandy.call.unmute(state.activeCall.id);
  },
  startVideo(context) {
    kandy.call.startVideo(state.activeCall.id);
  },
  stopVideo(context) {
    kandy.call.stopVideo(state.activeCall.id);
  },

  join(context, targetId) {
    kandy.call.hold(state.activeCall.id);
    waitMiliseconds(3000).then(() => {
      console.log("call to join " + targetId);
      options.isVideoEnabled = false;
      options.sendInitialVideo = false;
      kandy.call.make(callee, options);
      kandy.call.join(store.state.activeCall.id, targetId);
    });

    //     console.log ('call to join ' + targetId);

    //   kandy.call.join (store.state.activeCall.id, targetId);
  },

  send(context, messageObject) {
    //send;
    //context.commit (types.SEND, participant, message);
    console.log(
      "giden mesaj " +
        messageObject.message +
        " to " +
        messageObject.participant
    );
    sendMessage(messageObject.participant, messageObject.message);
  },
  fetchConversations() {
    kandy.conversation.fetch();
  },
  refreshContacts() {
    kandy.contacts.refresh();
  },
  /////////////// CALL HISTORY /////////////
  retrieveCallLogs(amount = 20, offset = 0) {
    kandy.call.history.fetch(amount, offset); //fetch
  },
  removeCallLog(recordId) {
    kandy.call.history.remove(recordId); //remove
  },
  removeCallHistory() {
    kandy.call.history.ckear("all"); //clear
  },
  getCallLogs() {
    let logs = kandy.call.history.get();
    store.commit("REFRESH_CALLLOGS", logs);
  },
  refresh(context, data) {
    context.commit("REFRESH_DIRECTORY", data);
  },
  setChatParticipant(context, data) {
    context.commit("SET_CHAT_PARTICIPANT", data);
  },

  presenceUpdate(context, data) {
    console.log("presenceUpdate:");
    let presence = { status: "open", activity: "unknown" };

    kandy.presence.update(presence);
    //kandy.presence.update( 'open', 'active')
    //kandy.presence.update ('SET_CHAT_PARTICIPANT', data);
  },

  presenceSubscribe(context, data) {
    console.log("presence Subscribe:");

    kandy.presence.subscribe("bkocak@genband.com");
    //kandy.presence.update( 'open', 'active')
    //kandy.presence.update ('SET_CHAT_PARTICIPANT', data);
  }
};

function waitMiliseconds(miliseconds) {
  return new Promise(function(resolve) {
    var id = setInterval(function() {
      if (5 === 4) {
        resolve(id);
      }
      setTimeout(function() {
        resolve(id);
      }, miliseconds);
    }, 1000);
  });
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;

let callId;
let local = document.getElementById("local-container");
let remote = document.getElementById("remote-container");
const myVideoResolution = {
  height: 640,
  width: 480
};

const options = {
  isAudioEnabled: true, //document.getElementById ('isAudioEnabled').checked,
  isVideoEnabled: false, // document.getElementById ('isVideoEnabled').checked,
  sendInitialVideo: false, //document.getElementById ('sendInitialVideo').checked,
  sendScreenShare: false, //document.getElementById ('sendScreenShare').checked,
  videoResolution: myVideoResolution,
  //localVideoContainer: this.$ref.local-container, // document.getElementById('local-container'),
  //remoteVideoContainer: this.$ref.remote-container //document.getElementById('remote-container')
  localVideoContainer: local, //document.getElementById ('local-container'), //olmadi this.$refs.container1, //
  remoteVideoContainer: remote //document.getElementById ('remote-container'),
};

function sendMessage(participant, messagetoSend) {
  //currentConvo = self.getConversation(participant)
  const currentConvo = kandy.conversation.get(participant);
  let convoExist = false;
  const message = currentConvo.createMessage(messagetoSend);

  //dont add it ıf already exist in the state
  store.state.conversations.forEach(function(conv) {
    if (conv.destination === currentConvo.destination) convoExist = true;
  });
  if (!convoExist) {
    store.commit("ADD_CONVERSATION", currentConvo);
  }
  message.send();
  Object.keys(currentConvo).forEach(function(key) {
    console.log(key, currentConvo[key]);
  });
  //console.log('currentConvo: ' + currentConvo)
}

function addEventListeners() {
  kandy.on("auth:change", function(data) {
    console.log("auth:change Event Data: " + JSON.stringify(data));
    if (kandy.getConnection().isConnected === true) {
      //  store.dispatch ('refresh');
      kandy.contacts.refresh();
      //this.refreshContacts ();
      //retrieveCallLogs ();
      // Kandyjs.getCallLogs ();
      // Kandyjs.fetchConversations ();
      // Kandyjs.searchDirectory ();
    }
  });

  kandy.on("call:error", err => {
    if (store.getters.activeCall) store.dispatch("toggleActiveCall");
    console.log("call error: " + err);
  });

  kandy.on("call:stateChange", function(call) {
    var calls = kandy.call.getAll();
    store.commit("UPDATE_CALLS", calls);
    kandy.call.getAll().filter(function(call) {
      if (call.state === "IN_CALL") {
        store.dispatch("setActiveCallId", { callId: call.id });
      } else if (call.state === "ENDED") {
        store.dispatch("toggleActiveCall");
      }
    });
    kandy.contacts.search(state.lastCallee, "USERNAME");
  });

  kandy.on("call:mediaStateChange", function(params) {});

  kandy.on("call:start", function(params) {
    store.commit("SET_CALL_START", "");

    const calls = kandy.call.getAll();
    calls.forEach(function(call) {
      console.log("all call ids currently : " + params.callId);
      //change activeCall
      if (call.id === params.callId) {
        store.commit("SET_ACTIVE_CALL", call);
        store.dispatch("toggleActiveCall");
        // store.commit (types.SET_ACTIVE_CALL, call);
      }
    });
  });

  kandy.on("call:receive", params => {
    let callId = params.callId;
    let incomingCallData = {
      callId: params.callId,
      active: true
    };
    store.dispatch("setIncomingCall", incomingCallData);
    store.dispatch("toggleNewIncomingCallModal");
  });

  kandy.on("contacts:change", params => {
    store.commit("REFRESH_DIRECTORY", params.contacts);
    // store.dispatch ('refresh', params.contacts);
  });

  kandy.on("directory:change", params => {
    store.dispatch("refresh");
    //  store.commit ('REFRESH_DIRECTORY', params.results);
    //   console.log ('directory' + params[0]);
    //  store.commit ('SET_USER', params.results[0]);
    store.commit("SET_CONV_NAMES", params.results[0]);
    store.commit("SET_CALL_NAMES", params.results[0]);
  });

  kandy.on("conversations:change", function(params) {
    console.log("new conversation !" + params.conversation);
    if (params.conversation) {
      store.commit("ADD_CONVERSATION", params.conversation);
    } else {
      //   kandy.contacts.search (params, 'USERNAME');
      store.commit("ADD_CONVERSATION_WITHID", params.conversationId);
    }
  });

  kandy.on("messages:change", function(params) {});

  kandy.on("user:fetch", function(params) {
    console.log("user" + params);
    const user = kandy.user.get(params.user.userId);
    kandy.contacts.search(params.user.userId, "USERNAME");

    // console.log ('new conversation' + params.conversation);
    store.commit("SET_USER", user);
  });

  kandy.on("presence:change", function(params) {
    console.log("preence" + params);

    // console.log ('new conversation' + params.conversation);
    // store.commit ('SET_USER', user);
  });
}
// This line is used to create a new instans of Kandy
const kandy = createKandy({
  authentication: {
    subscription: {
      expires: 3600,
      service: ["IM", "Presence", "call"],
      protocol: "https",
      server: "spidr-ucc.genband.com",
      version: "1",
      port: "443"
    },
    websocket: {
      protocol: "wss",
      server: "spidr-ucc.genband.com",
      port: "443"
    }
  },
  logs: {
    logLevel: "debug",
    enableFcsLogs: true
  },
  call: {
    chromeExtensionId: "put real extension ID here",
    serverProvidedTurnCredentials: true,
    iceserver: [
      {
        url: "stun:turn-ucc-1.genband.com:3478?transport=udp"
      },
      {
        url: "stun:turn-ucc-2.genband.com:3478?transport=udp"
      },
      {
        url: "turns:turn-ucc-1.genband.com:443?transport=tcp",
        credential: ""
      },
      {
        url: "turns:turn-ucc-2.genband.com:443?transport=tcp",
        credential: ""
      }
    ]
  }
});

createKandy();
