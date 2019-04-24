<template>
  <div class="page--con">
    <div
      class="wx"
      :style="{
        height: '750px',
        'background-image': 'url(' + require('@/assets/img/login-bg.jpg')  + ')'
      }"
    >
      <div class="mid-layout wx--layout">
        <auth-wx mode="page" class="wx--box" @completed="onLoginCompleted"></auth-wx>
      </div>
    </div>
    <cool-link-footer></cool-link-footer>
  </div>
</template>

<script>
import AuthWx from '@components/auth/wxbind.vue'

import authMixin from '@/mixins/auth'

export default {
  name: 'Wxbind',

  mixins: [authMixin],

  components: {
    AuthWx
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
.wx {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}

.wx--layout {
  display: flex;
  justify-content: center;
}
</style>


