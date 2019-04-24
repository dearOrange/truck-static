<template>
  <div class="page--con">
    <cool-link-header
      :positionable="false"
      :searchable="false"
      :authable="false"
      :full="false"
      theme="primary"
    />
    <div
      class="login"
      :style="{
        height: '750px',
        'background-image': 'url(' + require('@/assets/img/login_bg.jpg')  + ')'
      }"
    >
      <div class="login--img">
        <img src="@/assets/img/login_left.png" alt>
      </div>
      <div class="mid-layout login--layout">
        <auth-login mode="page" class="login--box" @completed="onLoginCompleted"></auth-login>
      </div>
    </div>
    <cool-link-footer></cool-link-footer>
  </div>
</template>

<script>
import AuthLogin from '@components/auth/login.vue'

import authMixin from '@/mixins/auth'

export default {
  name: 'Login',

  mixins: [authMixin],

  components: {
    AuthLogin
  },

  methods: {
    onLoginCompleted(result) {
      if (result) {
        this.authComplete()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.page--con {
  display: flex;
  flex-direction: column;
}
.login {
  /* width: 100vw; */
  flex: 1;
  /* height: calc(100vh - 387px); */
  /* height: 750px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background: url('../assets/img/login-bg.jpg') no-repeat center center; */
  background-size: cover;
}
.login--img {
  margin-left: 60px;
  /* position: absolute;
  left: 0; */
}
.login--layout {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 1500px) {
  .login--img {
    position: absolute;
    left: 0;
  }
}
</style>


