<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Contacts" sliding></f7-navbar>
<f7-searchbar
  cancel-link="Cancel"
  placeholder="Search in contacts"
  :clear-button="true"
></f7-searchbar>

    <f7-list contacts>
      <f7-list-group v-for="(group, key) in getContacts" :key="key">
        <f7-list-item :title="key" group-title></f7-list-item>
        <f7-list-item v-for="name in group" :key="name" :title="name"></f7-list-item>
      </f7-list-group>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        contacts: {
          'A': [
            'Aaron',
            'Abbie',
            'Adam',
            'Adele',
            'Agatha',
            'Agnes',
            'Albert',
            'Alexander'
          ],
          'B': [
            'Bailey',
            'Barclay',
            'Bartolo',
            'Bellamy',
            'Belle',
            'Benjamin'
          ],
          'C': [
            'Caiden',
            'Calvin',
            'Candy',
            'Carl',
            'Cherilyn',
            'Chester',
            'Chloe'
          ],
          'V': [
            'Vladimir'
          ]
        }
      }
    },
    methods: {
      onSearch: function (query, found) {
        console.log('search', query);
      },
      onClear: function (event) {
        console.log('clear');
      },
      onEnable: function (event) {
        console.log('enable');
      },
      onDisable: function (event) {
        console.log('disable');
      },
    }
  }
</script>

<script>
export default {
  computed: {
    getContacts () {
      // return this.contacts
      return {
          'A': [
            'Aaron',
            'Abbie',
            'Adam',
            'Adele',
            'Agatha',
            'Agnes',
            'Albert',
            'Alexander'
          ],
          'B': [
            'Bailey',
            'Barclay',
            'Bartolo',
            'Bellamy',
            'Belle',
            'Benjamin'
          ],
          'C': [
            'Caiden',
            'Calvin',
            'Candy',
            'Carl',
            'Cherilyn',
            'Chester',
            'Chloe'
          ],
          'V': [
            'Vladimir'
          ]
        }
    }
}
}
</script>
