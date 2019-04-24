<template>
  <router-link :to="'/rent/' + data.stockDemandUkid" tag="div" class="recommend">
    <div class="recommend--type">{{data.city}} — {{data.stockTypeName}}</div>
    <div class="recommend--desc">
      <ul>
        <li>
          <p>{{data.demandArea}} ㎡</p>
          <p>需求面积</p>
        </li>
        <li>
          <p>{{data.temperatureLower}} ~ {{data.temperatureUpper}}℃</p>
          <p>需求温度</p>
        </li>
        <li>
          <p>{{data.planEnterDate}}</p>
          <p>计划入住时间</p>
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
import { fmtDate } from '@/utils/date'
export default {
  name: 'RecommendItem',
  props: {
    data: Object
  },
  mounted() {
    this.data.planEnterDate = fmtDate(this.data.planEnterDate)
  }
}
</script>

<style lang="postcss" scoped>
.recommend--type {
  width: 218px;
  height: 44px;
  background: rgba(56, 141, 106, 1);
  padding: 13px 0 14px 32px;
  font-size: 16px;
  font-weight: 900;
  color: rgba(255, 254, 254, 1);
  line-height: 16px;
}
.recommend--desc {
  background: #fff;
  padding: 11px 0 11px 32px;
  & > ul {
    & > li {
      /* margin: 2px 0; */
      & > p {
        &:first-of-type {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
        }
        &:last-of-type {
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
          line-height: 12px;
        }
      }
      &:nth-of-type(2) {
        margin: 10px 0;
      }
    }
  }
}
</style>

