<!-- Tabs.vue -->
<template lang='pug'>
    f7-page(with-subnavbar="")
      .navbar
        .navbar-inner
          .center.tab-button2
            // Buttons row as tabs controller in navbar
            .buttons-row
              // Link to 1st tab, active
              a.tab-link.active.button.tab-button(href="#tab1") CHAT
              // Link to 2nd tab
              a.tab-link.button.tab-button(href="#tab2") VOICE
              // Link to 3rd tab
              a.tab-link.button.tab-button(href="#tab3") VIDEO
              // Link to 4th tab
              a.tab-link.button.tab-button(href="#tab4") PEOPLE
      .pages
        .page
          .page-content
            // Tabs animated wrapper, required to switch tabs with transition
            .tabs-animated-wrap
              // Tabs, tabs wrapper
              .tabs
                // Tab 1, active by default
                #tab1.tab.active
                  .empty-space
                    p Here is the Message page!
                  f7-messagebar(placeholder="Message" send-link="Send" @submit="onSubmit")
                // Tab 2
                #tab2.tab
                  .call-button-container1(@click="makeCall(false)")
                    .center
                      .call-button-container
                        .center
                          img(slot="icon" src="../../assets/demo/call_outline_white.png")
                          | Call
                // Tab 3
                #tab3.tab
                  .call-button-container1(@click="makeCall(false)")
                    .center
                      .call-button-container
                        .center
                          img(slot="icon" src="../../assets/demo/camera_outline_white.png")
                          | Video
                // Tab 4
                #tab4.tab
                  f7-list
                    .item-content
                      .item-media
                      img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
                    .item-inner
                      .item-title-row
                          .item-title {{callee}}
                          .item-subtitle {{contactType}}

</template>
<script>
import LeftChatBubble from './LeftChatBubble';
import RightChatBubble from './RightChatBubble';
import { mapState, mapGetters } from 'vuex';
import NoImg from '../../assets/demo/noimage1.jpg';
export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'call');
    let contacts = this.$store.state.contacts;
    this.contactType = 'corporate';
    contacts.forEach(contact1 => {
      if (contact1.primaryContact === 'saynaci@genband.com') {
        this.contact = contact1;
        this.contactType = 'personal';
      }
    });
  },
  data: function() {
    return {
      noImg: NoImg,
      renderMessages: false,
      showData: 'all',
      message: '',
      showData: 'all',
      message: '',
      callee: 'bkocak@genband.com',
      showbottombar: false,
      conversationId: 'bkocak@genband.com',
      selectedContacts: [],
      onCall: true,
      contact: {},
      contactType: '',
      activeTab: false,
    };
  },
  components: {
    leftChatBubble: LeftChatBubble,
    rightChatBubble: RightChatBubble,
  },
  mounted() {
    this.getContactInfo();
  },
  methods: {
    openLeftPanel: function() {
      this.$f7.popup.open(popupLanguage, true);
    },
    end() {
      // this.onCall = false
      this.$store.dispatch('end');
    },
    getContactInfo() {
      let primaryContact = this.conversationId;
      let contact = this.$_.find(this.contacts, c => {
        return c.primaryContact === primaryContact;
      });
      // contact.photoUrl = contact.photoUrl || this.noImg;
      this.selectedContacts.push(this.$_.cloneDeep(contact));
      this.$nextTick(() => {
        this.renderMessages = true;
      });
    },
    onSubmit() {
      let messageToSend = {
        type: 'IM',
        text: this.message,
        participant: 'saynaci@genband.com',
      };
      console.log('send message ' + this.message);
      this.message = '';
      this.$store.dispatch('send', messageToSend);
    },
    hold() {
      this.$store.dispatch('hold', '');
    },
    mute() {
      this.$store.dispatch('mute', '');
    },
    add() {
      console.log('sorry, not implemented yet');
    },
    volumeUp() {
      console.log('sorry, not implemented yet');
    },
    makeCall(mode) {
      this.onCall = true;
      // console.log('activeCall State ' + this.activeCall.state)
      // console.log('make call to ' + this.callee)
      // SET_ACTIVE_CALLID
      if (this.getActiveCall !== 'true') {
        this.callee = 'saynaci@genband.com';
        const params = {
          callee: this.callee,
          mode: mode,
        };
        let options = [
          {
            key: 'localVideoContainer',
            value: document.getElementById('localVideoContainer'),
          },
          {
            key: 'remoteVideoContainer',
            value: document.getElementById('remoteVideoContainer'),
          },
        ];
        params.options = options;
        this.$store.dispatch('call', params);
      } else {
        this.$store.dispatch('end');
      }
      console.log('make call operation finished.');
    },
    makeCall2(mode) {
      // console.log('activeCall State ' + this.activeCall.state)
      // console.log('make call to ' + this.callee)
      if (this.getActiveCall !== 'true') {
        this.callee = 'oztemur@genband.com';
        const params = {
          callee: this.callee,
          mode: mode,
        };
        let options = [
          {
            key: 'localVideoContainer',
            value: document.getElementById('localVideoContainer'),
          },
          {
            key: 'remoteVideoContainer',
            value: document.getElementById('remoteVideoContainer'),
          },
        ];
        params.options = options;
        this.$store.dispatch('call', params);
      } else {
        this.$store.dispatch('end');
      }
      console.log('make call operation finished.');
    },
  },
  computed: {
    ...mapGetters(['contacts', 'conversations']),
    getCalleeInfo() {
      let contacts = this.$store.state.contacts;
      contacts.forEach(contact1 => {
        if (contact1.primaryContact === 'saynaci@genband.com') {
          this.contact = contact1;
          console.log('contact.photoUrl' + contact.photoUrl);
        }
      });
    },
    filtredMessages() {
      let resultArray = [];
      if (this.conversations) {
        for (let i = 0; i < this.conversations.length; i++) {
          if (this.conversations[i].conversationId === this.conversationId) {
            resultArray = this.conversations[i].messages;
          }
        }
        this.$nextTick(() => {
          $('.messages-container').scrollTop($('.messages-container').height());
        });

        return resultArray;
      }
    },
    getActiveCall() {
      return this.$store.state.activeCall.state;
    },
    getCalleeName() {
      let hmm = this.$store.state.activeCall.state;
      let hmm2 = this.$store.state.activeCall.id;
      console.log('active call status ' + hmm);
      console.log('active call id ' + hmm2);
      if (this.$store.state.activeCall.state === 'IN_CALL') {
        this.onCall = true;
      } else {
        this.onCall = false;
      }
      return this.$store.state.activeCall.calleeName;
    },
  },
};
</script>
<style scoped>
.call-button-container0 {
  padding-top: 1px;
}

.call-button-container2 {
  padding-top: 160px;
}

.call-button-container1 {
  padding-top: 590px;
}

.call-button-container {
  margin: auto;
  width: 233px;
  height: 80px;
  vertical-align: middle;
  padding: 10px;
  background: #29a3d8;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}

.end-button-color {
  color: red;
}

.img1 {
  height: 50%;
  width: 50;
}

.a {
  max-height: 700px;
}

.messageLine {
  max-height: 20px;
}

.a2altta {
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.b {
  max-height: 40px;
  min-height: 40px;
}

.my-class {
  cursor: default;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style scoped>
.empty-space {
  padding-top: 550px;
}

.tab-button {
  width: 90px;
}

.tab-button2 {
  width: 450px;
}

.call-button-container1 {
  padding-top: 160px;
}

.call-button-container {
  margin: auto;
  width: 233px;
  height: 80px;
  vertical-align: middle;
  padding: 10px;
  background: #29a3d8;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}
</style>
