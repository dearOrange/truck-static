<template>
  <div>
    <cool-link-header
      :positionable="false"
      :searchable="false"
      :authable="false"
      :full="false"
      theme="primary"
    />
    <div
      class="register"
      :style="{
        height: '750px',
        'background-image': 'url(' + require('@/assets/img/login-bg.jpg')  + ')'
      }"
    >
      <div class="mid-layout register--layout">
        <div class="register--box">
          <a class="back" @click="goback">
            <svg class="icon" aria-hidden="true">
              <use v-bind:xlink:href="'#icon-left-arrow'"></use>
            </svg>
            返回登录
          </a>
          <auth-register mode="page" @completed="onRegisterCompleted"></auth-register>
        </div>
      </div>
    </div>
    <cool-link-footer></cool-link-footer>
  </div>
</template>

<script>
import AuthRegister from '@components/auth/register.vue'

export default {
  name: 'Register',

  components: {
    AuthRegister
  },

  methods: {
    onRegisterCompleted(result) {
      if (result) {
        this.$router.replace({ name: 'login' })
      }
    },

    goback() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.register {
  height: calc(100vh - var(--siteHeaderHeight));
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.register--layout {
  display: flex;
  justify-content: flex-end;
}
.register--box {
  position: relative;

  & .back {
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }
}
</style>


