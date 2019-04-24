<template>
  <div class="best-depot-desc">
    <div class="best-depot-desc--title">
      <span class="name">{{data.ptStockPublish.publishTitle}}</span>
      <ul class="kinds">
        <li>
          <span>{{data.stockTypeName}}</span>
        </li>
      </ul>
    </div>
    <div class="best-depot-desc--detail">
      <div class="detail-item detail--address">
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-dingwei'"></use>
        </svg>
        {{data.province}}{{data.city}}{{data.district}}
      </div>
      <div class="detail-item detail--area">
        面积
        <em>{{data.totalArea}}</em> ㎡
      </div>
      <div class="detail-item detail--price">
        价格
        <em
          v-for="(item, index) in data.ptStockPriceList"
          :key="index"
        >{{item.isDefault == 1 ? item.price + item.stockPriceUnitName : ''}}</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BestDepotDesc',
  props: {
    data: Object
  }
}
</script>

<style lang="postcss" scoped>
.best-depot-desc {
  padding: 16px 18px;
}
.best-depot-desc--title {
  display: flex;
  align-items: center;
  & .name {
    font-size: 20px;
  }
  & .kinds {
    margin-left: 10px;
    font-size: 16px;
    & > li {
      padding: 4px 10px;
      border: 1px solid rgba(220, 220, 220, 1);
      color: rgba(102, 102, 102, 1);
    }
  }
}

.best-depot-desc--detail {
  margin-top: 30px;
  color: rgba(102, 102, 102, 1);
}
.detail-item {
  margin: 12px 0;
}

.detail--area {
  & > em {
    margin-left: 6px;
    font-style: normal;
  }
}
.detail--price {
  & > em {
    margin-left: 6px;
    color: rgba(246, 43, 43, 1);
    font-style: normal;
  }
}
</style>


