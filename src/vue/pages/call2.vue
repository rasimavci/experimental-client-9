<template>
  <f7-page>

<f7-tabs swipeable>
  <f7-tab id="tab1" active>Tab 1 content...</f7-tab>
  <f7-tab id="tab2">Tab 2 content...</f7-tab>
  <f7-tab id="tab3">Tab 3 content...</f7-tab>
  <f7-tab id="tab4">Tab 4 content...</f7-tab>
</f7-tabs>

<f7-toolbar tabbar labels>
  <f7-link icon="icon-bars" text="Chat" tab-link="#tab1">
    <img src="../../assets/demo/call_outline_white.png"></img>
  </f7-link>
  <f7-link icon="icon-camera" text="Call" tab-link="#tab2"></f7-link>
  <f7-link icon="icon-cloud" text="Chat" tab-link="#tab1"></f7-link>
  <f7-link icon="icon-phone" text="Call" tab-link="#tab2"></f7-link>
  <f7-link icon="icon-time" text="Video" tab-link="#tab1"></f7-link>
  <f7-link icon="icon-videocam" text="Collab" tab-link="#tab2"></f7-link>
</f7-toolbar>
  </f7-page>
</template>
