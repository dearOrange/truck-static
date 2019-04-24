<template>
  <div class="desc">
    <div
      class="desc-info"
    >{{data.expectedPriceType === 'N' ? '面议': data.ptStockPriceList[0].price}}{{data.expectedPriceType === 'N' ? '': data.ptStockPriceList[0].stockPriceUnitName}}</div>
    <div class="desc-area">
      <span>{{data.ptStockPublish.publishTitle}}</span>
    </div>
    <div class="desc-ratio">
      <span
        v-for="(item, index) in data.baStockDetailList"
        :key="index"
      >{{item.emptyArea}} ㎡ | {{item.stockTypeNames}}</span>
    </div>
    <div class="desc-tags">
      <cool-link-tag
        v-if="data.stockTypeName"
        :label="data.stockTypeName"
        class="desc-tags--item"
        themes="round unborder info"
      ></cool-link-tag>
      <!-- <cool-link-tag label="闲置中" themes="round unborder warn"></cool-link-tag>
      <cool-link-tag label="实地认证" themes="round unborder success"></cool-link-tag>-->
      <cool-link-tag
        v-if="data.ptStockPublish.certifiedType === '5A'"
        label="五大商协会"
        class="desc-tags--item"
        themes="round unborder solemn"
      ></cool-link-tag>

      <!-- <cool-link-tag label="恒温仓" class="desc-tags--item" themes="round unborder info"></cool-link-tag>
      <cool-link-tag label="闲置中" class="desc-tags--item" themes="round unborder warn"></cool-link-tag>
      <cool-link-tag label="实地认证" class="desc-tags--item" themes="round unborder success"></cool-link-tag>
      <cool-link-tag label="五大商协会" class="desc-tags--item" themes="round unborder solemn"></cool-link-tag>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDesc',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.desc {
  padding: 0 0 0 13px;
}
.desc-info {
  font-size: 18px;
  font-weight: bold;
  color: #df1e1e;
  line-height: 18px;
}
.desc-area {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 11px;
}
.desc-ratio {
  color: var(--siteTextLightColor);
  line-height: 20px;
  margin-top: 14px;
  & > span {
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
}
.desc-tags {
  display: flex;
  margin-top: 16px;
  & > .desc-tags--item {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>


