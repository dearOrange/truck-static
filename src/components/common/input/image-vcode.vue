<template>
  <div class="image-vcode">
    <img src="@/assets/img/logo.png" alt="验证码">
  </div>
</template>
<script>
export default {
  name: 'ImageVCode'
}
</script>

<style lang="postcss" scoped>
.image-vcode {
  display: flex;
  align-items: center;
  position: absolute;
  right: 8px;
  top: 0;
  height: 100%;
  & > img {
    width: 93px;
    height: 36px;
    cursor: pointer;
  }
}
</style>

