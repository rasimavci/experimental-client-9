<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Contacts" sliding></f7-navbar>
<f7-searchbar
  search-list="#search-list"
  cancel-link="Cancel"
  placeholder="Search in contacts"
  :clear-button="true"
  searchbar:search="onSearch"
></f7-searchbar>



      <f7-list contacts>
<f7-list-group v-for="(group, key) in groupedContacts" :key="key">
<f7-list-item :title="key" group-title>
</f7-list-item>
 <f7-list-item v-for="name in group" :key="name" :title="name.firstName" id='search-list'></f7-list-item>
</f7-list-group>
  </f7-list>
  </f7-page>

</template>
<script>
export default {
  data: function() {
    return {
      deneme: '',
    };
  },
  methods: {
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
    getContacts() {
      const contacts = _.sortBy(this.$store.state.contacts, [
        function(o) {
          return o.firstName;
        },
      ]);
      // return this.contacts
      return contacts; // this.$store.state.contacts;
    },
    groupedContacts() {
      let contacts = this.getContacts;
      contacts.forEach(contact => {
        contact.name = contact.firstName.charAt(0);
      });
      return _.groupBy(contacts, 'name');
    },
  },
};
</script>
