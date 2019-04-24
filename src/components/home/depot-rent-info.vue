<template>
  <div class="depot-rent-info">
    <div class="rent-title">
      <span class="city">{{data.province ? data.province : '暂无定位'}}</span>
      <span class="text">寻求{{data.stockTypeName}}</span>
    </div>
    <div class="rent-line"></div>
    <ul class="rent-detail">
      <li>区域：{{data.city ? data.city : '暂无定位'}}</li>
      <li>需求容量：{{data.demandArea}}</li>
      <li>存放货品：{{data.productName}}</li>
      <li>温度要求：{{data.temperatureLower}} ~ {{data.temperatureUpper}} ℃</li>
      <li>入驻时间：{{data.planEnterDate}}</li>
      <li>发布日期：{{data.publishDate}}</li>
    </ul>
  </div>
</template>
<script>
import { fmtDate } from '@/utils/date'
export default {
  name: 'DepotRentInfo',
  props: {
    data: Object
  },
  mounted() {
    this.data.planEnterDate = fmtDate(this.data.planEnterDate)
    this.data.publishDate = fmtDate(this.data.publishDate)
  }
}
</script>

<style lang="postcss" scoped>
.depot-rent-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px 0;
  border: 1px solid rgba(235, 235, 235, 1);
  background: #fff;
  box-shadow: 0px 3px 6px 0px #ccc;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--siteColor);
    box-shadow: 0px 0px 1px 0px var(--siteColor);
  }
}

.rent-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 11px;
  & > .city {
    font-size: 28px;
    color: var(--siteColor);
  }
  & > .text {
    margin-top: 8px;
    font-size: 16px;
  }
}

.rent-line {
  display: block;
  height: 1px;
  width: 60px;
  margin: 32px 0 30px;
  background: rgba(239, 239, 239, 1);
}

.rent-detail {
  & > li {
    margin: 8px 0;
    color: rgba(102, 102, 102, 1);
  }
}
</style>


