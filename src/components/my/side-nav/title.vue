<template>
    <div class="title">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-' + svgIcon"></use>
      </svg>
      <div class="text">{{txt}}</div>
    </div>
</template>

<script>
export default {
  name: 'SideNavTitle',
  props: {
    txt: String,
    svgIcon: String
  }
}
</script>


<style lang="postcss" scoped>
.title {
  position: relative;
  display: flex;
  align-items: center;
  & > svg {
    position: absolute;
    left: 0;
    display: block;
    width: 14px;
    height: 16px;
  }
  & > .text {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
