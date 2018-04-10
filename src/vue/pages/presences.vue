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
    f7-grid
      f7-col(width='150')
        f7-button(open-popup='#popup') About
        f7-button(open-popup='#popup') Logout
        f7-button(open-popup='#popup') Send Feedback
</template>

<script>
export default {}
</script>
