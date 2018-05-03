<template lang="pug">
f7-panel(left='', reveal='', layout='dark')
  f7-view#left-panel-view(navbar-through='', :dynamic-navbar='true')
    f7-navbar(title='ravci')
    f7-pages
      f7-page
        f7-list.media-list
          f7-list-item(icon="icon-camera" link='/about/', title='About', link-view='#main-view', link-close-panel='')
          //f7-list-item(media="<img src='../../assets/demo/backspace_blue.png'>", link='/call/', title='Call', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/call/', title='Call', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/contact/', title='Contact', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/form/', title='Form', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/presences/', title='Presences', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/history/', title='History', link-view='#main-view', link-close-panel='')
          f7-list-item(badge="3" link='/message/', title='Inbox', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/dialpad/', title='Dialpad', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/sessions/', title='Sessions', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/collaboration/', title='Collaboration', link-view='#main-view', link-close-panel='')
          f7-list-item(link='/settings/', title='Settings', link-view='#main-view', link-close-panel='')
          f7-list-button(icon="icon-bars", title='Settings')
</template>

<script>
export default {
  name: 'leftPanel',
};
</script>

<style scoped>

</style>
