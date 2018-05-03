<template lang='pug'>
f7-page
  f7-navbar
    .item-content
      .item-media(@click='goPresences()')
        .flex
          .flex2
            img.avatar-circle(src="http://pa-ucc.genband.com:80/pa/direct/pictureServlet?user=ravci@genband.com" width="50" height="50")
          .flex.column
            .flex
             h3  ravci
  f7-list#navList
    f7-list-item(link='/presences/', title='Presences', link-view='#main-view', panel-close='')
    f7-list-item(link='/call/', title='Call -Temporary', link-view='#main-view', panel-close='')
      i.icon.material-icons.md-only.test-icon-left phone
    f7-list-item(link='/favorites/', title='Favorites', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only star_border
    f7-list-item(link='/contact/', title='Contact', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only contacts
    f7-list-item(link='/history/', title='History', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only access_time
    f7-list-item(badge="3" link='/message/', title='Inbox', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only.test-icon-left inbox
    f7-list-item(link='/dialpad/', title='Dialpad', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only phone
    f7-list-item(link='/sessions/', title='Sessions', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only content_copy
    f7-list-item(link='/conference/', title='Conference', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only supervisor_account
    f7-list-item(link='/settings/', title='Settings', link-view='#main-view', panel-close='')
     i.icon.material-icons.md-only settings
</template>
<script>
import NoImg from '../../assets/demo/noimage1.jpg';
export default {
  name: 'leftPanel',
  created: function() {
    this.getContactInfo();
  },
  data: function() {
    return {
      noImg: NoImg,
      photoUrl: '',
    };
  },
  methods: {
    getContactInfo() {
      let self = this.$store.state.self; // this.conversationId;
      // let contact = this.$_.find(this.contacts, c => {
      //   return c.primaryContact === primaryContact;
      // });
      // contact.photoUrl = contact.photoUrl || this.noImg;
      // this.selectedContacts.push(this.$_.cloneDeep(contact));
      // this.$nextTick(() => {
      //   this.renderMessages = true;
      // });
    },
    getSelfInfo() {
      return this.$store.state.self;
    },
    goPresences: function() {
      // this.$f7router.view = '#main-view';
      this.$f7router.navigate('/presences');
    },
  },
};
</script>

<style>
.panelColor2 {
  background-color: #336666;
}

.panelColor {
  background-color: #0099ff;
}

/* .leftit {
  alig: left
} */

.flex {
  display: flex;
  margin: 0px;
  padding: 0px;
  border: 0px solid black;
}

.column {
  flex-direction: column;
}

.link {
  color: blue;
  font-size: 10px;
}

.flex2 {
  display: flex;
  margin: 10px;
  padding: 0px;
  border: 0px solid black;
  width: 50%;
}
</style>
