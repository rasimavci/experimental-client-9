<template lang="pug">
f7-page(login-screen='')
  f7-login-screen-title Login
  f7-list(form='')
    f7-list-item
      f7-label Username
      f7-input(name='username', placeholder='Username', type='text', v-model='user.username')
    f7-list-item
      f7-label Password
      f7-input(name='password', type='password', placeholder='Password', v-model='user.password')
  f7-list
    f7-list-button(title='Sign In', @click='login')
    f7-list-label
      p Click Sign In to close Login Screen
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data(){
    return{
      user:{
        username: '',
        password: '',
        token: 'YOUR_TOKEN_RESPONSE',
        admin: true,
        loged: true
      }
    }
  },
  methods: {
    ...mapActions([
      'setCredentials',
    ]),
    login(){
      if(this.user.username !== '' && this.user.password !== '')
        this.$store.dispatch('setCredentials', this.user)
    }
  }
}
</script>
<style scoped>

</style>
