<template lang="pug">
f7-panel(right='', cover='', layout='dark')
  f7-view#right-panel-view(navbar-through='', :dynamic-navbar='true')
    f7-navbar(title='Right Panel', sliding='')
    f7-pages
      f7-page
        f7-block
          p Right panel content goes here
        f7-block-title Load page in panel
        f7-list
          f7-list-item(link='/about/', title='About')
          f7-list-item(link='/form/', title='Form')
        f7-block-title Load page in main view
        f7-list
          f7-list-item(link='/about/', title='About', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/form/', title='Form', link-view='#main-view', link-close-panel='')
</template>

<script>
export default {
  name: 'rightPanel'
}
</script>

<style scoped>
</style>
