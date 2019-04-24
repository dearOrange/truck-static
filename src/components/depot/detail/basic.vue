<template>
  <div class="basic">
    <ul>
      <li>
        <span class="label">总容量</span>
        <span class="text">{{data.totalCapacity}} 吨</span>
      </li>
      <li>
        <span class="label">可用容量</span>
        <span class="text">{{data.emptyCapacity}} 吨</span>
      </li>
      <li>
        <span class="label">总面积</span>
        <span class="text">{{data.totalArea}} ㎡</span>
      </li>
      <li>
        <span class="label">可用面积</span>
        <span class="text">{{data.emptyArea}} ㎡</span>
      </li>
      <li>
        <span class="label">起租</span>
        <span class="text">{{data.ptStockPublish.minRentArea}} ㎡</span>
      </li>
      <li>
        <span class="label">起租期限</span>
        <span class="text">{{data.ptStockPublish.minRentMonths}} 个月</span>
      </li>
      <!-- <li>
        <span class="label">建筑结构</span>
        <span class="text">{{data.structureTypeName}}</span>
      </li>-->
      <li>
        <span class="label">地坪</span>
        <span class="text">{{data.groundTypeName}}</span>
      </li>
      <!-- <li>
        <span class="label">主干道宽度</span>
        <span class="text">30 米</span>
      </li>-->
      <!-- <li>
        <span class="label">最大进出车辆</span>
        <span class="text">17.5 米</span>
      </li>-->
      <li>
        <span class="label">资质</span>
        <span class="text">{{data.ptStockPublish.stockQualificationName}}</span>
      </li>
      <li>
        <span class="label">消防等级</span>
        <span class="text">{{data.ptStockPublish.fireGradeName}}</span>
      </li>
      <li v-for="(item, index) in data.baStockDetailList" :key="index">
        <span class="label">{{item.stockTypeNames}}</span>
        <span class="text">{{item.totalArea}} ㎡</span>
      </li>
      <li>
        <span class="label">服务模式</span>
        <span class="text">{{data.ptStockPublish.serviceModeName}}</span>
      </li>
      <li>
        <span class="label">软件系统</span>
        <span class="text">{{data.ptStockPublish.existingSystemName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Basic',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
@import 'depot.postcss';
.basic {
  width: var(--depotDetailLeftWidth);
  & > ul {
    display: flex;
    flex-wrap: wrap;
    & > li {
      display: flex;
      width: 33%;
      & > .label {
        color: var(--siteTextWeakColor);
        width: 7em;
      }
      & > .text {
        padding-left: 5px;
      }
      &:nth-child(n + 3) {
        margin-top: 5px;
      }
    }
  }
}
</style>
