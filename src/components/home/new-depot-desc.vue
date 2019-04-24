<template>
  <div class="new-depot-desc">
    <div class="new-depot-desc--name">
      <span>{{data.ptStockPublish.publishTitle}}</span>
    </div>
    <div class="new-depot-desc--detail">
      <span>{{data.province}}{{data.city}}{{data.district}}</span>
      <span>{{data.totalArea}} ㎡</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewDepotDesc',
  props: {
    data: Object
  }
}
</script>

<style lang="postcss" scoped>
.new-depot-desc {
  padding: 16px 18px;
}
.new-depot-desc--name {
  font-size: 16px;
}

.new-depot-desc--detail {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(102, 102, 102, 1);
}
</style>


