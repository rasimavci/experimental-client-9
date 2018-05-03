<template lang='pug'>
.container
  img.messageLine.imgSize(:src='contact.photoUrl', alt='Avatar')
  p {{message.parts[0].text}}
  span.time-right.messageLine {{moment(message.timestamp).calendar()}}
</template>

<script>
import Moment from 'moment'
export default {
  name: 'leftChatBubble',
  props: {
    message: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      moment: Moment
    }
  },
  mounted () {
  }
}
</script>

<style>
.messageLine {
  max-height: 20px;
}

.imgSize {
  max-width: 15px;
  max-height: 20px;
}
</style>
