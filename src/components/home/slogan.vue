<template>
  <div class="slogan">
    <span class="slogan--subtitle">{{sub}}</span>
    <span class="slogan--suptitle">{{sup}}</span>
  </div>
</template>

<script>
export default {
  name: 'HomeSlogan',

  props: {
    sub: String,
    sup: String
  }
}
</script>

<style lang="postcss" scoped>
.slogan {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.slogan--subtitle {
  font-family: HYWenHei-HEW;
  font-size: 50px;
  font-weight: 900;
}
.slogan--suptitle {
  margin-top: 20px;
  font-size: 16px;
}
</style>


