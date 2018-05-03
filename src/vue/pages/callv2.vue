<template lang='pug'>
.page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-right.end-button-color(v-if="onCall")
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:call_end', panel-open='right',@click="end")
    f7-nav-right(v-if="!onCall")
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:phone_in_talk', panel-open='right', @click="makeCall(false)")
  // Additional "tabbar-labels" class
  .toolbar.tabbar-labels
    .toolbar-inner
      a.tab-link.b.tab-link-active(href='#tab-1')
        // Different icons for iOS and MD themes
        // Label text
        span.tabbar-label CHAT
      a.tab-link.b(href='#tab-2')
        span.tabbar-label VOICE
      a.tab-link.b(href='#tab-3')
        span.tabbar-label VIDEO
      a.tab-link.b(href='#tab-4')
        span.tabbar-label PEOPLE
  .tabs
    #tab-1.page-content.tab.tab-active
      .page-content.messages-content.a
        .chat-div(v-for='message in filtredMessages', :key='message.timestamp', v-if='renderMessages')
          left-chat-bubble.leftBBl.messageLine(:message='message', v-if='message.sender === conversationId', :contact='selectedContacts[0]')
          right-chat-bubble.rightBBl.messageLine(:message='message', v-else)
      .toolbar.toolbar-bottom-md.messagebar
        .toolbar-inner
          a.link.toggle-sheet(href='#')
            i.icon.f7-icons.ios-only more_vert_fill
            i.icon.material-icons.md-only more_vert
          .messagebar-area
            textarea(v-model='message', placeholder='Message')
          a.link(href='#', @click='sendMessage()')
            i.icon.f7-icons.ios-only more_vert_fill
            i.icon.material-icons.md-only near_me
        .messagebar-sheet
    #tab-2.page-content.tab
      .page-content.messages-content.a
        .call-button-container.action(@click='makeCall(false)')
          img.img1(src='../assets/demo/call_outline_white.png')
          | Call
      .toolbar.toolbar-bottom-md.tabbar-labels
        .toolbar-inner
          a.tab-link.tab-link-active.b(href='#tab-5', @click='volumeUp()')
            i.icon.f7-icons.ios-only volume_up_fill
            i.icon.material-icons.md-only volume_up
          a.tab-link.b(href='#tab-6', @click='add()')
            i.icon.f7-icons.ios-only person_add_fill
            i.icon.material-icons.md-only person_add
          a.tab-link.b(href='#tab-7', @click='hold()')
            i.icon.f7-icons.ios-only phone_paused_fill
            i.icon.material-icons.md-only phone_paused
          a.tab-link.b(href='#tab-8', @click='mute()')
            i.icon.f7-icons.ios-only mic_off_fill
            i.icon.material-icons.md-only mic_off
    #tab-3.page-content.tab
      .page-content.messages-content.a
        .call-button-container.action(@click='makeCall(true)')
          img(src='../assets/demo/camera_outline_white.png')
          | Call
      .toolbar.toolbar-bottom-md.tabbar-labels
        .toolbar-inner
          a.tab-link.tab-link-active.b(href='#tab-5', @click='volumeUp()')
            i.icon.f7-icons.ios-only volume_up_fill
            i.icon.material-icons.md-only volume_up
          a.tab-link.b(href='#tab-6', @click='add()')
            i.icon.f7-icons.ios-only person_add_fill
            i.icon.material-icons.md-only person_add
          a.tab-link.b(href='#tab-7', @click='hold()')
            i.icon.f7-icons.ios-only phone_paused_fill
            i.icon.material-icons.md-only phone_paused
          a.tab-link.b(href='#tab-8', @click='mute()')
            i.icon.f7-icons.ios-only mic_off_fill
            i.icon.material-icons.md-only mic_off
    #tab-4.page-content.tab
      //-f7-list(media-list='')
      //- f7-list-item(media="../assets/demo/avatar_generic.png", text="Some text", @click='openContactDetailsPopup(contact)' :title="callee" href="#popupAddContact") Corporate
      f7-list
        .item-content
          .item-media
            img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
              //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
              //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
          .item-inner
            .item-title-row
              .item-title {{callee}}
               .item-subtitle {{contactType}}
        //- f7-list-item(@click='makeCall(false)' :title="callee" href="#popupAddContact") Corporate
        //-  img.avatar-circle.test-icon-left(:src="noImg")
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
      contact.photoUrl = contact.photoUrl || this.noImg;
      this.selectedContacts.push(this.$_.cloneDeep(contact));
      this.$nextTick(() => {
        this.renderMessages = true;
      });
    },
    sendMessage() {
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
<style>
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
