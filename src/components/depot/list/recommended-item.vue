<template>
  <cool-link-thumbnails :link="'/depot/' + Math.floor(Math.random()*100000)"
    class="recommended-item"
    borderless
    width="218"
    height="150"
    >
    <template slot="desc">
      <div class="recommended-desc">
        <div class="title">仓库出租
          <em class="size">8000-12000㎡</em></div>
      </div>
    </template>
  </cool-link-thumbnails>
</template>

<script>
export default {
  name: 'RecommendedItem'
}
</script>
<style lang="postcss" scoped>
.recommended-desc {
  padding: 5px 0;
  & > .title {
    margin-top: 0;
    & > em.size {
      font-style: normal;
      color: var(--siteColor);
    }
  }
}
</style>


