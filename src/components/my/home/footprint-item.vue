<template>
  <div class="footprint-item">
    <div class="footprint-con">
      <router-link
        :to="data.relatedDataType === 'SR' ? '/rent/' + data.relatedDataUkid : '/depot/' + data.relatedDataUkid"
        tag="div"
        class="footprint-f"
      >
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-yingxiao'"></use>
        </svg>
        <h2>{{data.relatedDataTypeName}}</h2>
      </router-link>
      <div class="footprint-s">{{data.title}}</div>
      <div class="footprint-t">{{data.createTime}}</div>
      <div
        class="footprint-fo"
        :class="data.isCollection === 1 ? 'collect' : ''"
        @click="collect(data.relatedDataType,data.userViewUkid ,data.relatedDataUkid)"
      >
        <svg class="icon" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-shoucang'"></use>
        </svg>
        关注
      </div>
    </div>
  </div>
</template>

<script>
import { fmtDate } from '@/utils/date'
export default {
  name: 'footprintitem',
  props: {
    data: Object
  },
  data() {
    return {}
  },
  methods: {
    collect(type, id1, id2) {
      this.data.isCollection = this.data.isCollection === 0 ? 1 : 0
      this.$emit('collectFooter', {
        collect: this.data.isCollection,
        id1: id1,
        id2: id2,
        type: type
      })
    }
  },
  mounted() {
    this.data.createTime = fmtDate(this.data.createTime)
  }
}
</script>

<style lang="less" scoped>
.footprint-item {
  // height: 82px;
  padding: 0 25px;
  .footprint-con {
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footprint-f {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      flex-basis: 180px;
      cursor: pointer;
      svg {
        display: block;
        width: 36px;
        height: 36px;
      }
      h2 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 14px;
      }
    }
    .footprint-s {
      flex-basis: 100%;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }
    .footprint-t {
      flex-shrink: 0;
      flex-basis: 140px;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
    }
    .footprint-fo {
      flex-shrink: 0;
      width: 120px;
      height: 40px;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .collect {
      color: #f77d58;
    }
  }
}
</style>

