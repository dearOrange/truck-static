<template>
  <div
    class="logo"
    :class="themeClass"
    @click="goBack"
    :style="{
    'background-image': 'url(' + (theme === 'bright' ? require('@/assets/img/logo-n.png') : require('@/assets/img/logo-w.png')) +')'
  }"
  ></div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    theme: {
      type: String,
      default: 'bright',
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    }
  },
  computed: {
    themeClass() {
      let theme = this.theme

      return {
        [`logo__${theme}`]: true
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="postcss" scoped>
.logo {
  width: 113px;
  height: 44px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

