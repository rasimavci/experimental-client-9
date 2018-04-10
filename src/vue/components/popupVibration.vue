<template lang="pug">
f7-popup#popupVibration
  f7-view(navbar-fixed='')
    f7-pages
      f7-page
        f7-navbar(title='Language Settings')
          f7-nav-right
            f7-link(close-popup='') Back
        f7-block-title Preferred Settings
        f7-list
          f7-list-item(checkbox value=1 , title='Call Mode')
          f7-list-item(checkbox value=1 , title='IM Mode')
</template>

<script>
export default {
  name: 'popupVibration'
}
</script>

<style scoped>
</style>
