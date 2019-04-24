<template>
  <div class="hot-depot-desc">
    <div class="hot-depot-desc--title">
      <span class="name">{{data.ptStockPublish.publishTitle}}</span>
      <span class="time">{{data.publishDate}}</span>
    </div>
    <div class="hot-depot-desc--detail">
      <span>{{data.province}}-{{data.city}}--{{data.district}}</span>
    </div>
  </div>
</template>

<script>
import { fmtDate } from '@/utils/date'
export default {
  name: 'HotDepotDesc',
  props: {
    data: Object
  },
  mounted() {
    this.data.publishDate = fmtDate(this.data.ptStockPublish.publishDate)
  }
}
</script>

<style lang="postcss" scoped>
.hot-depot-desc {
  padding: 16px 18px;
}
.hot-depot-desc--title {
  display: flex;
  justify-content: space-between;
  & .name {
    font-size: 16px;
  }
  & .time {
    font-size: 12px;
    color: var(--siteTextLightColor);
  }
}

.hot-depot-desc--detail {
  margin-top: 10px;
  font-size: 12px;
  color: var(--siteTextLightColor);
}
</style>


