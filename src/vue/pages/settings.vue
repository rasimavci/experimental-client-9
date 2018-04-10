<template lang="pug">
f7-page
  f7-block-title Application Settings
  f7-list
    f7-list-item(link='/about/', title='Language Settings')
    f7-list-item(link='/contact/', title='Vibration Settings')
    f7-list-item(link='/form/', title='Log Settings')
    f7-list-item(link='/dynamic-route/blog/45/post/125/?foo=bar#about', title='Battery Settings')

  f7-block
    f7-grid
      f7-col(width='50')
        f7-button(big round open-popup='#popupLanguage') Popup
        f7-button(big round open-popup='#popupVibration') vibration Settings
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'settings',
  data() {
    return {
      user: {
        token: null,
        user: null,
        password: null,
        admin: null,
        loged: false
      }
    }
  },
  methods: {
    ...mapActions(['setCredentials', {}])
  }
}
</script>
