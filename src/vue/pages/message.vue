<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Inbox
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  f7-block-title Saved
  f7-list
    ul
      li(v-for='conv in getConversations' :key="conv.key" @click='openPopupMessage(conv.conversationId)')
        .item-content
          .item-media
            img.avatar-circle(:src="conv.photoUrl || noImg" width="44")
            //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
            //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
          .item-inner
            .item-title-row
              .item-title {{conv.conversationId}}
            img(:src='presenceConnected')
            .item-subtitle {{conv.messages[0].parts[0].text}} {{conv.messages[0].timestamp}}
  f7-popup#popupMessage
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='closePopup') Save
            .title Inbox
            .right(@click='closePopup') Close
        f7-block
        .page-content.messages-content.a
          .chat-div(v-for='message in filtredMessages', :key='message.timestamp', v-if='renderMessages')
            left-chat-bubble.leftBBl(:message='message', v-if='message.sender === conversationId', :contact='selectedContacts[0]')
            right-chat-bubble.rightBBl(:message='message', v-else)
        .toolbar.toolbar-bottom-md.tabbar-labels
          .toolbar-inner
            a.tab-link.tab-link-active.b(href='#tab-5', @click='deleteMessage()')
              i.icon.f7-icons.ios-only delete_fill
              i.icon.material-icons.md-only delete
            a.tab-link.b(href='#tab-6', @click='goCall()')
              f7-link(popup-close='')
               img(slot="icon" src="../../assets/demo/send_message.png")
               //-i.icon.f7-icons.ios-only reply_fill
               //-i.icon.material-icons.md-only reply
</template>
<script>
import LeftChatBubble from './LeftChatBubble';
import RightChatBubble from './RightChatBubble';
import { mapState, mapGetters } from 'vuex';
import NoImg from '../../assets/demo/noimage1.jpg';

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'call');
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
    closePopup() {
      this.$f7.popup.close('#popupMessage', true);
    },
    goCall: function() {
      // this.popup-close=''
      this.$f7router.navigate('/call');
    },
    openPopupMessage: function(conversationId) {
      this.conversationId = conversationId;
      this.$Framework7Vue.popup.open(popupMessage, true);
    },
    deleteMessage: function() {
      console.log('sorry not implemented yet');
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
  },
  computed: {
    ...mapGetters(['contacts', 'conversations']),
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
        console.log(
          'first message in the Array ' + resultArray[0].parts[0].text
        );
        return resultArray;
      }
    },
    getConversations() {
      let conversations = this.$store.state.conversations;
      let contacts = this.$store.state.contacts;
      conversations.forEach(conv => {
        contacts.forEach(contact => {
          if (contact.primaryContact === conv.conversationId) {
            conv.photoUrl = contact.photoUrl;
            console.log('conv photo url' + conv.photoUrl);
          }
        });
      });
      return conversations;
    },
    getActiveCall() {
      return this.$store.state.activeCall.state;
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

.img1 {
  height: 50%;
  width: 50;
}

.a {
  max-height: 700px;
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
