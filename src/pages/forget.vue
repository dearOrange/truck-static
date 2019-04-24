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
      class="forget"
      :style="{
        height: '750px',
        'background-image': 'url(' + require('@/assets/img/login-bg.jpg')  + ')'
      }"
    >
      <div class="mid-layout forget--layout">
        <div class="forget--box">
          <a class="back" @click="goback">
            <svg class="icon" aria-hidden="true">
              <use v-bind:xlink:href="'#icon-left-arrow'"></use>
            </svg>
            返回登录
          </a>
          <auth-forget @completed="onForgetCompleted"></auth-forget>
        </div>
      </div>
    </div>
    <cool-link-footer></cool-link-footer>
  </div>
</template>

<script>
import AuthForget from '@components/auth/forget.vue'

export default {
  name: 'Forget',

  components: {
    AuthForget
  },

  methods: {
    onForgetCompleted(result) {
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
.forget {
  height: calc(100vh - var(--siteHeaderHeight));
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.forget--layout {
  display: flex;
  justify-content: flex-end;
}

.forget--box {
  position: relative;

  & .back {
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }
}
</style>


