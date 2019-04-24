<template>
  <div class="online-trade">
    <cool-link-error
      type="nopic"
      message="近一周没有浏览记录，快去首页看看吧~~~"
    >
      <p class="ol-consult">
        <a href="#">点这里</a><span>免费发布咨询</span>
      </p>
    </cool-link-error>
  </div>
</template>

<script>
export default {
  name: 'OnlineTrade',

  mounted() {}
}
</script>

<style lang="postcss" scoped>
.ol-consult {
  & > a {
    color: var(--siteColor);
  }
}
</style>

