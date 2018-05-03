<template lang="pug">
f7-page
  f7-block-title Presence
  f7-list.form
    f7-list-item(radio value='1' , checked title='Available')
    f7-list-item(radio value='2' , title='Busy')
    f7-list-item(radio value=3 , title='On Vacation')
    f7-list-item(radio value=4 , title='Away')
    f7-list-item(radio value=5 , title='Out to Lunch')
    f7-list-item(radio value=6 , title='Be Right Back')
    f7-list-item(radio value=7 , title='Appear Offline')
  f7-block(strong='')
      f7-col(width='85', height='50')
        f7-button(fill='', raised='',onclick="{alert('Demo', 'Smart Office')}") About
      f7-col(width='85', height='50')
        f7-button(fill='', raised='', @click='doLogout') Logout
      f7-col(width='85')
        f7-button(fill='', raised='', popup-open='#popup') Send Feedback
</template>

<script>
export default {
  methods: {
    dene: function() {
      // myApp.alert('You clicked first button!');
    },
    setPresence: function(mode) {
      this.$store.dispatch('setPresence', mode);
    },
    doLogout() {
      this.$store.dispatch('disconnect');
      let vm = this;
      this.$f7.preloader.show();
      // this.setCredentials({
      //   user: this.username,
      //   admin: true,
      //   loged: true,
      //   token: 'SOME_TOKEN'
      // })
      setTimeout(() => {
        vm.$f7.preloader.hide();
        vm.$f7router.navigate('/login');
      }, 600);
    },
  },
};
</script>
