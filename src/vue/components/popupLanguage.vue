<template lang="pug">
f7-popup#popupLanguage
  f7-view(navbar-fixed='')
    f7-pages
      f7-page
        f7-navbar(title='Language Settings')
          f7-nav-right
            f7-link(close-popup='') Back
        f7-block
          | Please select the language.
</template>

<script>
export default {
  name: 'popupLanguage'
}
</script>

<style scoped>
</style>
