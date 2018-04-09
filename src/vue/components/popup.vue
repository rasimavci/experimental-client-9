<template lang="pug">
f7-popup#popup
  f7-view(navbar-fixed='')
    f7-pages
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
            f7-link(close-popup='') Close
        f7-block
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.
</template>

<script>
export default {
  name: 'popup'
}
</script>

<style scoped>
</style>
