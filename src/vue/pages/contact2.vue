<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Contacts
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  //-f7-searchbar(cancel-link="Cancel" search-container="#searchList" placeholder="Search in contacts" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-list.searchbar-not-found
   f7-list-item(title="No contacts found")
  f7-list.searchbar-found(id='searchList')
   f7-list-item(v-for='contact in getContacts' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")
  f7-list.date(v-for='(groups, key) in groupedContacts' :key="key", v-show='!isSearch')
   h5 {{key}}
   f7-list(media-list="")
      ul
        li(v-for="contact in groups" @click='openContactDetailsPopup(contact)', oncontextmenu="openContextMenuPopup()",)
          .item-content
            .item-media
              img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
              //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
              //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
            .item-inner
              .item-title-row
                .item-title {{contact.firstName}} {{contact.lastName}}
                .item-subtitle Personal
              //- img(:src='presenceConnected')

  f7-popup#popupContactDetails
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backContactDetails') Back
            .title Contact Details
            .right(@click='openEditContactPopup') Edit
        .flex
          .flex2
            img(src="../../assets/demo/avatar_generic.png" width="115" height="115")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
            .flex
             img.imgSize(src="../../assets/demo/call_outline_blue.png" @click="goCallPage('audio')")
             img.imgSize(src="../../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage('video')")
             div(hspace="20")
             img.imgSize(src="../../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage('chat')")
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home
            f7-input(type='text', value="contact.homePhone") {{contact.homePhone}}
          f7-list-item
            f7-label Mobile
            f7-input(type='mobile', placeholder='mobile') {{contact.mobilePhone}}
          f7-list-item
            f7-label Work
            f7-input(type='home', placeholder='home') {{contact.workPhone}}
          f7-list-item
            f7-label Nickname
            f7-input(type='tel', placeholder='Phone') {{contact.nickname}}
          f7-list-item
            f7-label User Id
            f7-input(type='text', value="contact.homePhone") {{contact.primaryContact}}
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail') {{contact.emailAddress}}
        f7-block-title SETTINGS
        f7-list
          f7-list-item(@click='openManageFavorites()', title='Manage Favorites')
          f7-list-item(@click='removeContact(contact)', title='Remove From Contacts List')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupAddContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backAddContact') Close
            .title Add Contact
            .right(@click='openEditContactPopup()') Add
        f7-block
          | Please fill contact details.
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
            f7-label Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail')
          f7-list-item
            f7-label URL
            f7-input(type='url', placeholder='URL')
          f7-list-item
            f7-label Password
            f7-input(type='password', placeholder='Password')
          f7-list-item
            f7-label Phone
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Gender
            f7-input(type='select')
              option(selected='') Male
              option Female
          f7-list-item
            f7-label Birth date
            f7-input(type='date', placeholder='Birth date', value='2014-04-30')
          f7-list-item(title='Friend')
            f7-toggle(slot='after')
  f7-popup#popupEditContact1
    f7-view
      f7-page
        f7-navbar(title='Edit Contact')
          f7-nav-right
            f7-link(popup-close='', @click='editContact()') Save1
          f7-nav-left
            f7-link(popup-close='') Back
        f7-block
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
          f7-label Name
          f7-input(:value='firstName', @input="lastName = $event.target.value", type='text', :placeholder="contact.firstName")
          f7-list-item
          f7-label E-mail
          f7-input(type='email', placeholder='E-maill')
          f7-list-item
          f7-label URL
          f7-input(type='url', placeholder='URL')
          f7-list-item
          f7-label Password
          f7-input(type='password', placeholder='Password')
          f7-list-item
          f7-label Phone
          f7-input(type='tel', placeholder='Phone')
          f7-list-item
          f7-label Gender
          f7-input(type='select')
            option(selected='') Male
            option Female
  f7-popup#popupEditContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backEditContact') Back
            .right(@click='addContact(contact)') Save
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="150" height="150")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
        f7-block
        f7-block-title IDENFIFICATION
        f7-list(form='')
          f7-list-item
            f7-label First Name*
            f7-input(:value='firstName' @input="firstName = $event.target.value",type='text', :placeholder='contact.firstName')
          f7-list-item
            f7-label Last Name*
            f7-input(:value='lastName' @input="lastName = $event.target.value", type='text', :placeholder='contact.lastName')
          f7-list-item
            f7-label Nickname
            f7-input(type='text', :placeholder='contact.nickname')
          f7-list-item
            f7-label User Id
            f7-input(type='url', :placeholder='contact.primaryContact')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='contact.emailAddress')
        f7-block
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home
            f7-input(type='tel', :placeholder='contact.homePhone')
          f7-list-item
            f7-label Mobile
            f7-input(type='tel', :placeholder='contact.mobilePhone')
          f7-list-item
            f7-label Work
            f7-input(type='tel', :placeholder='contact.workPhone')
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')
            f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupCreateContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') Back
            .title Create Profile
            .right(@click='saveProfile') Save
        f7-block
        f7-block-title IDENTIFICATION
        f7-list(form='')
          f7-list-item
            f7-label First Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label Last Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label Nickname
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label User ID*
            f7-input(type='tel', placeholder='id')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail')
        f7-block
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Mobile*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Work*
            f7-input(type='tel', placeholder='Phone')
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')
          f7-list-item(title='Show Presence Status')
            f7-toggle(slot='after')
  f7-popup#popupManageFavorites
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backFavorites') Back
            .title Manage Favorites
            .right(@click='saveFavorites') Save
        f7-block
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="contact.primaryContact") Chat
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.primaryContact") Voice
          f7-list-item(:key='3', checkbox='', name='my-checkbox', :value='3', :title="contact.primaryContact") Video
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.workPhone") Work
  f7-popup#popupContextMenu
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') Back
            .title Context Menu
            .right(@click='saveProfile') Save
        f7-block
        f7-block-title IDENTIFICATION
        f7-list(form='')
  </template>
<script>
import NoImg from '../../assets/demo/noimage.jpg';
import PresenceConnected from '../../assets/icon/presence_connected.png';
import PresenceClosed from '../../assets/icon/presence_not.png';
import PresenceClosedMessage from '../../assets/icon/presence_away.png';

import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'contact');
    this.$store.dispatch('search', 'Ahmet');
  },
  data: function() {
    return {
      contacts: [],
      noImg: NoImg,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      contact: '',
      showData: 'all',
      isSearch: false,
      id: null,
      firstName: null,
      lastName: null,
      nickname: null,
      mobilePhone: null,
      userId: null,
      username: null,
      emailAddress: null,
      homePhone: null,
      workPhone: null,
      fax: null,
      pager: 'netas',
      friendStatus: false,
      primaryContact: null,
      // contactSource: '',
    };
  },
  methods: {
    backAddContact() {
      this.$f7.popup.close('#popupAddContact', true);
    },
    backContactDetails() {
      this.$f7.popup.close('#popupContactDetails', true);
    },
    backEditContact() {
      this.$f7.popup.close('#popupEditContact', true);
    },
    backProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    saveProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    backFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    saveFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    openContactDetailsPopup: function(contact) {
      this.contact = contact;
      let contactSource1 = this.$store.state.contactSource;
      console.log('selected contact ' + JSON.stringify(contact));
      if (contactSource1 === 'personal') {
        this.$f7.popup.open(popupContactDetails, true);
      } else {
        this.$f7.popup.open(popupAddContact, true);
      }
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.open('#popupEditContact', true);
      //this.$f7.popup.open('#popupAddContact', true);
    },
    openManageFavorites: function() {
      this.$f7.popup.open(popupManageFavorites, true);
    },
    openContextMenuPopup: function() {
      this.$f7.popup.open(popupContextMenu, true);
    },
    onSearch: function(query, found) {
      setTimeout(() => {}, 2000);

      if (query.value !== '') {
        this.$store.dispatch('search', query.value);
      }
      // setTimeout(() => {
      //   //document.getElementById('f7-searchbar').search(query);
      //   this.dene; // this.$store.dispatch('search', query.value);
      // }, 2000);
    },
    onClear: function(event) {
      console.log('clear');
    },
    onEnable: function(event) {
      this.isSearch = true;
      console.log('enable');
    },
    onDisable: function(event) {
      this.isSearch = false;
      console.log('disable');
    },
    goCallPage: function(mode) {
      this.$f7.popup.close('#popupContactDetails', true);
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      setTimeout(() => {
        this.$f7router.navigate('/call');
      }, 100);
    },
    dene: function simulateKeyPress() {
      var evt = document.createEvent('KeyboardEvent');
      evt.initKeyEvent(
        'keypress',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        'e'.charCodeAt(0)
      );
      var body = document.body;
      var canceled = !body.dispatchEvent(evt);
      if (canceled) {
        // A handler called preventDefault
        alert('canceled');
      } else {
        // None of the handlers called preventDefault
        alert('not canceled');
      }
    },
    removeContact: function(contact) {
      var r = confirm('Delete Contact', 'Are You Sure ?');
      if (r == true) {
        this.$store.dispatch('removeContact', contact.entryId);
      } else {
        console.log('remove contact canceled');
      }

      //Framework7.app.
      // confirm('Delete Contact', 'Are You Sure ?', function() {
      //   console.log('confirmed')
      //   this.$store.dispatch('removeContact', contact.entryId);
      // });
    },
    editContact: function() {
      console.log('name ' + this.firstName + this.lastName);
    },
    addContact: function(contact) {
      // this.$f7.popup.close('#popupEditContact', true);
      const newContact = {
        id: this.contacts.length,
        // entryId: this.contacts.length,
        emailAddress: contact.email ? contact.email : null,
        fax: contact.fax ? contact.fax : null,
        firstName: contact.firstName ? contact.firstName : null,
        friendStatus: false,
        homePhone: contact.homePhone ? contact.homePhone : null,
        lastName: contact.lastName ? contact.lastName : null,
        mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
        nickname: contact.nickname
          ? contact.nickname
          : 'nickname' + this.contacts.length,
        pager: contact.pager ? contact.pager : null,
        primaryContact: contact.userId ? contact.userId : null,
        userId: contact.userId ? contact.userId : null,
        username: contact.username ? contact.username : null,
        workPhone: contact.workPhone ? contact.workPhone : null,
      };

      let contacts = this.$store.state.contacts;
      let contactExist = false;
      contacts.forEach(contact1 => {
        if (contact.primaryContact === contact1.primaryContact) {
          contactExist = true;
        }
      });

      if (contactExist) {
        const newContact = {
          // id: this.contacts.length,
          entryId: contact.entryId,
          emailAddress: contact.email ? contact.email : null,
          fax: contact.fax ? contact.fax : null,
          firstName: contact.firstName ? contact.firstName : null,
          friendStatus: false,
          homePhone: contact.homePhone ? contact.homePhone : null,
          lastName: contact.lastName ? contact.lastName : null,
          mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
          nickname: contact.nickname ? contact.nickname : 'nickname',
          pager: contact.pager ? contact.pager : null,
          primaryContact: contact.primaryContact
            ? contact.primaryContact
            : null,
          userId: contact.userId ? contact.userId : null,
          username: contact.username ? contact.username : null,
          workPhone: contact.workPhone ? contact.workPhone : null,
        };
        console.log('edit contact ' + newContact.primaryContact);
        // this.$store.dispatch('addContact', newContact);
      } else {
        this.$store.dispatch('addContact', newContact);
        console.log('add contact ' + newContact.primaryContact);
      }

      this.$f7.popup.close('#popupAddContact', true);
    },
  },
  computed: {
    ...mapGetters(['contacts']), // not used anymore, instead store.state used
    getContacts() {
      var resultArray = [];
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        let sortBy = this.$store.state.sortBy;
        if (sortBy === 'firstName') {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.firstName;
            },
          ]);
        } else {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.lastName;
            },
          ]);
        }
        return this.contacts;
      } else {
        setTimeout(() => {
          //document.getElementById('f7-searchbar').search(query);
          // this.$store.dispatch('search', query.value);
        }, 2000);
        return this.$store.state.directory;
      }
    },
    groupedContacts() {
      let contacts = this.getContacts;
      contacts.forEach(contact => {
        contact.name = contact.firstName.charAt(0);
      });
      return _.groupBy(contacts, 'name');
    },
    getContactSource() {
      this.contactSource = this.$store.state.contactSource === 'personal';
      if (this.contactSource === 'personal') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.column {
  flex-direction: column;
  padding: 0px;
}

.link {
  color: blue;
  font-size: 30px;
}

.flex2 {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
  width: 100%;
}

.imgSize {
  max-height: 50px;
  max-width: 50px;
}

.avatar-circle {
  border-radius: 25px;
}

.rows {
  max-height: 50px;
}
</style>
