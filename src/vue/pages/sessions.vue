<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Sessions
  f7-searchbar(cancel-link="Cancel" placeholder="Search in sessions" :clear-button="true")
  f7-list.date(v-for='(groups, key) in groupedCalls' :key="key")
   h5 {{key}}
   f7-block-title Application SettingsACtive Call
   f7-list
    f7-list-item.my-class(v-for="group in groups" @click='goCall(group)' :key="group.name" :title="group.calleeName + ' ' + group.state" href="#popupAddContact")
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
// import Routes from '../routes.js'

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'sessions');
  },
  data: function() {
    return {
      showData: 'all',
    };
  },
  methods: {
    goCall(logrecord) {
      // console.log('go call page for ' + logrecord.callerDisplayNumber)
      // const params = {
      //   callee: 'saynaci@genband.com',
      //   mode: false
      // }
      //this.$store.dispatch('call', params)
      // Routes.push('call')
      // this.$f7router.navigate('/call')
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
    getCalls() {
      // if (this.showdata === 'all') {
      console.log(this.$store.state.sessions);
      // this.list = this.$store.state.contacts
      return this.$store.state.sessions;
      // return [{startTime:"1523550312000", name: 'deneme', callerName: 'saynaci'}]
    },
    groupedCalls() {
      let calls = this.getCalls; // this.$store.state.vux.history
      calls.forEach(log => {
        log.date1 = moment(parseInt(log.startTime)).format('h:mm:ss a');
        log.date = moment(parseInt(log.startTime)).format('MMMM Do YYYY');
      });
      return _.groupBy(calls, 'date');
    },
  },
};
</script>
<style>
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

.my-class {
  cursor: default;
}
</style>
