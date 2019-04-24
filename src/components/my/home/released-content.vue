<template>
  <router-link
    :to="data.relatedDataType === 'SR' ? '/rent/' + data.ukid : '/depot/' + data.ukid"
    tag="div"
    class="released-content"
  >
    <div class="title">{{data.title}}</div>
    <div class="item">
      <span class="key">面 积：</span>
      <span
        v-if="data.relatedDataType === 'SR'"
      >{{ data.stockTypeName}} {{data.emptyArea ? data.emptyArea : 0}}㎡</span>
      <span
        v-if="data.relatedDataType === 'SL'"
        v-for="(item, index) in data.baStockDetailList"
        :key="index"
      >{{item.stockTypeNames}} {{item.totalArea ? item.totalArea : 0}}㎡ |</span>
    </div>
    <div class="item">
      <span class="key">类 型：</span>
      <span>{{data.relatedDataTypeName}}</span>
    </div>
    <div class="item">
      <span class="key">发 布 时 间：</span>
      <span>{{data.publishDate}}</span>
    </div>
    <div class="item">
      <span class="key">区 域：</span>
      <span>{{data.region}}</span>
    </div>
  </router-link>
</template>

<script>
import { fmtDate } from '@/utils/date'
export default {
  name: 'ReleasedContent',
  props: {
    data: Object
  },
  mounted() {
    this.data.publishDate = fmtDate(this.data.publishDate)
  }
}
</script>



<style lang="postcss" scoped>
.released-content {
  cursor: pointer;
}
.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}
.item {
  font-size: 16px;
  line-height: 16px;
  margin-top: 10px;
  & .key {
    color: var(--siteTextLightColor);
  }
}
</style>
