<template>
  <div class="device">
    <ul>
      <li v-if="devices.includes('F001')">
        <span class="icon icon-tongshui"></span>
        <span class="text">通水</span>
      </li>
      <li v-if="devices.includes('F002')">
        <span class="icon icon-tongdian"></span>
        <span class="text">通电</span>
      </li>
      <li v-if="devices.includes('F003')">
        <span class="icon icon-yupeng"></span>
        <span class="text">雨棚</span>
      </li>
      <li v-if="data.ptStockPublish.splitable === 1">
        <span class="icon icon-kefenge"></span>
        <span class="text">可分割</span>
      </li>
      <li v-if="devices.includes('F004')">
        <span class="icon icon-dianyuan"></span>
        <span class="text">备用电源</span>
      </li>
      <li v-if="devices.includes('F005')">
        <span class="icon icon-bangongshi"></span>
        <span class="text">办公室</span>
      </li>
      <li v-if="devices.includes('F006')">
        <span class="icon icon-anbao"></span>
        <span class="text">安保人员</span>
      </li>
      <li v-if="devices.includes('F007')">
        <span class="icon icon-fengbi"></span>
        <span class="text">封闭园区</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { trim, split } from 'lodash'

export default {
  name: 'Device',
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    devices() {
      let oStr = this.data.ptStockPublish.supportFacility
      return split(oStr, ',').map(str => {
        return trim(str)
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
@import 'depot.postcss';
.device {
  width: var(--depotDetailLeftWidth);
  & ul {
    display: flex;
    & > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  & .icon {
    width: 34px;
    height: 34px;
    margin-bottom: 12px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    &.icon-tongshui {
      background-image: url(../../../assets/img/tongshui.png);
    }
    &.icon-tongdian {
      background-image: url(../../../assets/img/tongdian.png);
    }
    &.icon-yupeng {
      background-image: url(../../../assets/img/yupeng.png);
    }
    &.icon-kefenge {
      background-image: url(../../../assets/img/kefenge.png);
    }
    &.icon-dianyuan {
      background-image: url(../../../assets/img/dianyuan.png);
    }
    &.icon-bangongshi {
      background-image: url(../../../assets/img/bangongshi.png);
    }
    &.icon-anbao {
      background-image: url(../../../assets/img/anbao.png);
    }
    &.icon-fengbi {
      background-image: url(../../../assets/img/fengbiyuanqu.png);
    }
  }
}
</style>

