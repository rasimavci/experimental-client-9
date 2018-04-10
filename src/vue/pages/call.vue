<!-- Tabs.vue -->
<template>
  <f7-page with-subnavbar>
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center tab-button2">
          <!-- Buttons row as tabs controller in navbar-->
          <div class="buttons-row">
            <!-- Link to 1st tab, active -->
            <a href="#tab1" class="tab-link active button tab-button">CHAT</a>
            <!-- Link to 2nd tab -->
            <a href="#tab2" class="tab-link button tab-button">VOICE</a>
            <!-- Link to 3rd tab -->
            <a href="#tab3" class="tab-link button tab-button">VIDEO</a>
            <!-- Link to 4th tab -->
            <a href="#tab4" class="tab-link button tab-button">PEOPLE</a>
          </div>
        </div>
      </div>
    </div>
    <div class="pages">
      <div class="page">
        <div class="page-content">
          <!-- Tabs animated wrapper, required to switch tabs with transition -->
          <div class="tabs-animated-wrap">

            <!-- Tabs, tabs wrapper -->
            <div class="tabs">
              <!-- Tab 1, active by default -->
              <div id="tab1" class="tab active">
                <div class="empty-space">
                  <p>Here is the Message page!</p>
                </div>
                <f7-messagebar placeholder="Message" send-link="Send" @submit="onSubmit"></f7-messagebar>

              </div>

              <!-- Tab 2 -->
              <div id="tab2" class="tab">
                <div class="call-button-container1">
                  <div class="center">
                    <div class="call-button-container">
                      <div class="center">
                        <img slot="icon" src="../assets/demo/call_outline_white.png">Call
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 3 -->
              <div id="tab3" class="tab">
                <div class="call-button-container1">
                  <div class="center">
                    <div class="call-button-container">
                      <div class="center">
                        <img slot="icon" src="../assets/demo/camera_outline_white.png">Video
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 4 -->
              <div id="tab4" class="tab">
                <div class="call-button-container1">
                  <div class="center">
                    <div class="call-button-container">
                      <div class="center">
                        <img slot="icon" src="../assets/demo/camera_outline_white.png">People
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<style scoped>
.empty-space {
  padding-top: 550px;
}

.tab-button {
  width: 90px;
}

.tab-button2 {
  width: 450px;
}

.call-button-container1 {
  padding-top: 160px;
}

.call-button-container {
  margin: auto;
  width: 233px;
  height: 80px;
  vertical-align: middle;
  padding: 10px;
  background: #29A3D8;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}
</style>
