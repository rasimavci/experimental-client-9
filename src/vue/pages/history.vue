<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title History
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  f7-searchbar(cancel-link="Cancel" placeholder="Search in history" :clear-button="true")
  f7-list.date(v-for='(groups, key) in groupedLogs' :key="key")
   h5 {{key}}
   f7-list
      ul
        li(v-for="group in groups" @click='goCall(group)')
          .item-content
            .item-media
              img.avatar-circle(:src="group.photoUrl || noImg" width="44")
            .item-inner
              .item-title-row
                .item-title {{group.callerName}}
              .item-subtitle {{group.date1}}
              i.icon.material-icons.md-only(v-if="group.direction === 'outgoing'") call_made
              i.icon.material-icons.md-only(v-if="group.direction === 'incoming'") call_received
              i.icon.material-icons.md-only(v-if="group.direction === 'missed'") call_missed
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import { find } from 'lodash/fp';
import Routes from '../../routes.js';
import NoImg from '../../assets/demo/noimage1.jpg';

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'history');
  },
  data: function() {
    return {
      showData: 'all',
      noImg: NoImg,
    };
  },
  methods: {
    goCall(logrecord) {
      console.log('go call page for ' + logrecord.callerDisplayNumber);
      const params = {
        callee: 'saynaci@genband.com',
        mode: false,
      };
      //this.$store.dispatch('call', params)
      Routes.push('call');
    },
    openContactDetailsPopup: function() {
      this.$f7.popup.open(popupContactDetails, true);
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.open(popupEditContact, true);
    },
    onSearch: function(query, found) {
      console.log('search', query);
    },
    onClear: function(event) {
      console.log('clear');
    },
    onEnable: function(event) {
      console.log('enable');
    },
    onDisable: function(event) {
      console.log('disable');
    },
  },
  computed: {
    ...mapGetters(['contacts']),
    getContact(callerDisplayNumber) {
      // if (this.showdata === 'all') {
      let contacts = this.$store.state.contacts;
      // this.list = this.$store.state.contacts
      let contact = _.find(
        c => c.primaryContact === callerDisplayNumber,
        contacts
      );
      return contact.photoUrl;
      // } else if (this.showdata === 'filtered') {
      //   return this.$store.state.history.filter(note => note.firstName.startsWith(this.filterWord))
      // } else if (this.showdata === 'Global Addressbook') {
      //   console.log('global selected')
      //   return this.$store.state.history.filter(note => note.firstName.startsWith(this.filterWord))
      // } else {
      //   return this.$store.state.history
      // }
    },
    getCallLogs() {
      // if (this.$store.state.historyFilterSelection === 'All Call') {
      // console.log(this.$store.state.history);
      let hist = this.$store.state.history;
      let contacts = this.$store.state.contacts;
      var contact = '';
      hist.forEach(log => {
        contacts.forEach(contact => {
          if (contact.primaryContact === log.callerDisplayNumber) {
            log.photoUrl = contact.photoUrl;
            console.log('log photo url' + log.photoUrl);
          }
        });
        // contact = find(function(c) {
        //   c.primaryContact === log.callerDisplayNumber;
        // }, contacts);
        // console.log('contact' + contact)
        // log.photoUrl = contact.photoUrl;
      });
      // this.list = this.$store.state.contacts

      return hist;
      // return this.$store.state.history;
      // } else if (this.$store.state.historyFilterSelection === 'Incoming Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'incoming')
      // } else if (this.$store.state.historyFilterSelection === 'Outgoing Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'outgoing')
      // } else if (this.$store.state.historyFilterSelection === 'Missed Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'missed')
      // }
    },
    groupedLogs() {
      let history = this.getCallLogs; // this.$store.state.vux.history
      history.forEach(log => {
        log.date1 = moment(parseInt(log.startTime)).format('h:mm:ss a');
        log.date = moment(parseInt(log.startTime)).format('MMMM Do YYYY');
      });
      return _.groupBy(history, 'date');
    },
  },
};
</script>
<style scoped>
.date {
  /* width: 17%; */
  padding: 0% 1% 0 0;
  /* float: left; */
}

.date h3 {
  font-size: 1.5em;
}

.date p {
  font-size: 0.8em;
}
</style>
