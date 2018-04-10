<template>
  <f7-page>

<f7-toolbar tabbar labels>
  <f7-link icon="icon-bars" text="Chat" tab-link="#tab1"></f7-link>
  <f7-link icon="icon-camera" text="Call" tab-link="#tab2"></f7-link>
  <f7-link icon="icon-box" text="Chat" tab-link="#tab3"></f7-link>
  <f7-link icon="icon-circle" text="Call" tab-link="#tab4"></f7-link>
  <f7-link icon="icon-check" text="Video" tab-link="#tab5"></f7-link>
  <f7-link icon="icon-tape" text="Collab" tab-link="#tab6"></f7-link>
</f7-toolbar>

    <div class='modal-container1'>
      <div class='input-group flex1'>
        <input type='text' class='form-control' v-model='callee' placeholder='Username or Number...'>
        <span class='input-group-btn'>
          <button class='backspace-button' type='button' @click="callee = ''">
            <i></i>
            <img slot="icon" src="../assets/demo/backspace_blue.png">

          </button>
        </span>
      </div>
      <div class='modal-container2'>
      </div>
      <div class='modal-container' display='none'>
        <div align='center' class='h3'>
          <h3>
            {{activeCallState}}
          </h3>

          <img class='media-object pull-center' :src='user' />
        </div>
        <div class='keypad'>
          <div class='keypad-container'>
            <div>
              <button class='button' @click='press(1)'>
                <div class='keypad-button-number'>1</div>
                <div class='keypad-button-text'></div>
              </button>
              <button class='button' @click='press(2)'>
                <div class='keypad-button-number'>2</div>
                <div class='keypad-button-text'>
                  ABC
                </div>
              </button>
              <button class='button' @click='press(3)'>
                <div class='keypad-button-number'>3</div>
                <div class='keypad-button-text'>
                  DEF
                </div>
              </button>
            </div>
            <div>
              <button @click='press(4)'>
                <div class='keypad-button-number'>4</div>
                <div class='keypad-button-text'>
                  GHI
                </div>
              </button>
              <button @click='press(5)'>
                <div class='keypad-button-number'>5</div>
                <div class='keypad-button-text'>
                  JKL
                </div>
              </button>
              <button class='button' @click='press(6)'>
                <div class='keypad-button-number'>6</div>
                <div class='keypad-button-text'>
                  MNO
                </div>
              </button>
            </div>
            <div>
              <button class='button' @click='press(7)'>
                <div class='keypad-button-number'>7</div>
                <div class='keypad-button-text'>
                  PQRS
                </div>
              </button>
              <button class='button' @click='press(8)'>
                <div class='keypad-button-number'>8</div>
                <div class='keypad-button-text'>
                  TUV
                </div>
              </button>
              <button class='button' @click='press(9)'>
                <div class='keypad-button-number'>9</div>
                <div class='keypad-button-text'>
                  WXYZ
                </div>
              </button>
            </div>
            <div>
              <button class='button' @click="press('*')">
                *
              </button>
              <button class='button' @click='press(0)'>
                0
              </button>
              <button class='button' @click="press('#')">
                #
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </f7-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeCallState: 'IN_CALL',
      callee: '',
      user: '',
      myText: 'de',
      textAreaVisible1: false,
      textAreaVisible: false,
      hasCollaborationService: false,
      isShowKeypad: true,
      // activeCall: false,
      callee: '',
      joinClicked: false,
      activeNote: '',
      filterByStatus: '',
      filterToggle: false,
      target: '',
      show: 'all',
      options: [
        {
          label: 'Personal Address Book',
          value: 1
        },
        {
          label: 'Global Address Book',
          value: 2
        }
      ]
    }
  },
  computed: mapState({
    user: state => state.user,
    activeCall: state => state.vux.activeCall,
    activeCallState: state => state.vux.activeCall.state,
    activeCallRinging: state => state.activeCallRinging,
    activeCallExist: state => state.activeCallExist,
    activeCallInCall: state => state.activeCallInCall,
    activeCallOnHold: state => state.activeCallOnHold,
    activeCallMuted: state => state.activeCallOnHold,
    activeCallsendingVideo: state => state.activeCallOnHold,
    activeCallEnded: state => state.activeCallOnHold,
    callstart: state => state.callstart,
    // callState: state => { if(callState === 'RINGING') { return true } else {return false}},
    isloadingComplete: state => state.isloadingComplete,
    busy: state => state.busy
  }),
}
</script>

<style scoped>
.btn-group button {
  background-color: #4CAF50;
  /* Green background */
  border: 1px solid green;
  /* Green border */
  color: white;
  /* White text */
  padding: 10px 24px;
  /* Some padding */
  cursor: pointer;
  /* Pointer/hand icon */
  float: left;
  /* Float the buttons side by side */
}

.h3 {
  color: #1abc9c;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container1 {
  height: 550px;
  padding: 1px 1px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container2 {
  padding-top: 180px;
}


.modal-container {
  width: 400px;
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0;
}

.keypad {
  text-align: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0px solid black;
}

.input-number {
  width: 100%;
  margin: 0 auto;
  /* margin-top: 5px; */
  border: 0;
  background-color: #eceff0;
  height: 50px;
  font-size: 1.5em;
  text-align: center;
}

.keypad-container {
  overflow: hidden;
  border: 0px solid black;
  padding: 1px;
}

.keypad-container div {
  width: 90%;
  padding: 1px;
}

.keypad-container div button {
  width: 33.33%;
  padding: 0;
  margin: 0;
  display: block;
  float: left;
  height: 70px;
  border: 1px solid gray;
  background: white;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  font-size: 1.5em;
  margin: 5px 0;
}


.keypad-button-number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 22px;
  text-align: center;
}

.keypad-button-text {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.5);
  line-height: 12px;
  text-align: center;
  height: 12px;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  height: 50px;
  width: 10px;
}

.dialpad-button {
  width: 84px;
  height: 72px;
  border-bottom: 1px solid;
  float: left;
}

.keypad-menu {
  text-align: center;
}

.keypad-menu button {
  width: 64px;
  height: 64px;
  margin: 10px;
  border-radius: 32px;
  background-color: gray;
  padding: 0;
}

.keypad-menu button:hover {
  background-color: #1E90FF;
}

.keypad-menu myhover {
  background-color: #1abc9c;
}

.dialpad-button:hover {
  background-color: blue;
}

.dialpad-button .number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: black;
  line-height: 22px;
  text-align: center;
}

.dialpad-button .letters {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: darkgray;
  line-height: 12px;
  text-align: center;
}

.hide-keypad {
  max-height: 0px;
  transition: max-height 0.25s ease-in;
}

.backspace-button {
  background: white;
  border: 0px;
}

.keypad-container button {
  border: none !important;
  border-radius: 0px !important;
  color: #1E90FF !important;
}

.keypad-container button div {
  color: #1E90FF !important;
}

.keypad-container button:hover {
  background-color: #1abc9c;
}

.keypad-container button:hover div {
  /* background-color: #1abc9c; */
  color: white !important;
}

#block_container {
  text-align: center;
}

#bloc1 {
  position: absolute;
  bottom: 0;
}

#bloc2 {
  display: inline;
  float: right;
}

#localVideoContainer,
#remoteVideoContainer {
  height: 200px;
}

.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.flex1 {
  border: 0px solid black;
}
</style>

