<template>
  <div class="auth-title">
    <div class="logo" v-if="needLogo">
      <img src="@/assets/img/logo-n.png" alt="logo图">
    </div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'logintitle',
  props: {
    title: String,
    needLogo: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.auth-title {
  & > .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }
  & > h2 {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin: 0 0 25px 0;
  }
}
</style>



