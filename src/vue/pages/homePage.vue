<template lang="pug">
f7-page
  f7-block-title Welcome to my App
  f7-block(inner='')
    p
      | Duis sed erat ac eros ultrices pharetra id ut tellus. Praesent rhoncus enim ornare ipsum aliquet ultricies. Pellentesque sodales erat quis elementum sagittis.
  f7-block-title Navigation
  f7-list
    f7-list-item(link='/about/', title='About')
    f7-list-item(link='/contact/', title='Contact')
    f7-list-item(link='/form/', title='Form')
    f7-list-item(link='/dynamic-route/blog/45/post/125/?foo=bar#about', title='Dynamic Route')
  f7-block-title Side Panels
  f7-block
    f7-grid
      f7-col(width='50')
        f7-button(open-panel='left') Left Panel
      f7-col(width='50')
        f7-button(open-panel='right') Right Panel
  f7-block-title Modals
  f7-block
    f7-grid
      f7-col(width='50')
        f7-button(open-popup='#popup') Popup
      f7-col(width='50')
        f7-button(@click='setCredentials(user)') Login Screen

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'homePage',
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
