<template>
  <div style="width: 218px">
    <cool-link-thumbnails
      :link="'/depot/' + data.ptStockPublish.stockPublishUkid"
      class="recommend-item"
      borderless
      width="218"
      height="150"
      :srcImg="data.ptStockPublish.photoUrls"
    >
      <template slot="desc">
        <div class="recommend-desc">
          <div class="title">
            {{data.ptStockPublish.publishTitle}}
            <em
              class="size"
            >{{data.emptyArea}} - {{data.totalArea}}㎡</em>
          </div>

          <div class="hang">{{data.province}} — {{data.city}}</div>
        </div>
      </template>
    </cool-link-thumbnails>
  </div>
</template>

<script>
export default {
  name: 'RecommendDesc',
  props: {
    data: Object
  }
}
</script>
<style lang="postcss" scoped>
.recommend-desc {
  padding: 5px 0;
  & > .title {
    margin-top: 0;
    & > em.size {
      font-style: normal;
      color: var(--siteColor);
    }
  }

  & > .hang {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 150px;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    pointer-events: none;
  }
}
</style>


