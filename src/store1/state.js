export default {
  credentials: {
    token: null,
    user: null,
    password: null,
    admin: null,
    loged: false,
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
  activeCallExist: false    
  }
}
