<template>
  <div class="truck-desc">
    <div class="truck-desc--motion">
      <span class="from">河南省郑州市</span>
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-huoche'"></use>
      </svg>
      <span class="to">云南省昆明市</span>
    </div>
    <div class="truck-desc--detail">
      <div class="more">
        <p>发布时间：2018-06-26 15:39</p>
        <p>司机评价：
          <cool-link-score :score="3"></cool-link-score>
        </p>
        <p class="truck-desc--tags">
          <cool-link-tag class="item" label="司机认证" themes="round unborder warn"></cool-link-tag>
          <cool-link-tag class="item" label="车辆认证" themes="round unborder success"></cool-link-tag>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TruckDesc',
  props: {},
  methods: {}
}
</script>

<style lang="postcss" scoped>
.truck-desc {
  padding: 16px 18px;
}
.truck-desc--motion {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;

  & > .icon {
    margin: 0 8px;
    font-size: 24px;
  }
}

.truck-desc--detail {
  margin-top: 10px;
  & .publish-date {
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
  }

  & .more p {
    font-size: 14px;
    line-height: 24px;
  }
}

.truck-desc--tags {
  display: flex;

  & .item {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>


