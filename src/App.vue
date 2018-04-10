<template lang="pug">
// App
#app
  // Statusbar
  f7-statusbar
  // Left Panel
  left-panel
  // Right Panel
  right-panel
  // Main Views
  f7-views
    f7-view#main-view(:navbar-through='credentials.loged', main='')
      // Navbar
      navbar(v-if='credentials.loged')
      // Pages
      f7-pages
        // Login Screen
        login(v-if='!credentials.loged')
        home-page(v-else)
  // Popup
  popup
  popupLanguage
  popupVibration
</template>

<script>
import HomePage from './vue/pages/homePage'
import Login from './vue/pages/login'
import Navbar from './vue/components/navbar'
import Popup from './vue/components/popup'
import PopupLanguage from './vue/components/popupLanguage'
import PopupVibration from './vue/components/popupVibration'
import LeftPanel from './vue/components/leftPanel'
import RightPanel from './vue/components/rightPanel'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  components: {
    homePage: HomePage,
    login: Login,
    navbar: Navbar,
    leftPanel: LeftPanel,
    rightPanel: RightPanel,
    popup: Popup,
    popupLanguage: PopupLanguage,
    popupVibration: PopupVibration,
    },
  computed:{
    ...mapGetters([
      'credentials'
    ])
  },
  mounted(){
  }
}
</script>

<style>
</style>
