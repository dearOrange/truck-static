<template>
  <div class="feature">
    <ul>
      <li>
        <!-- <span class="label">仓库亮点</span> -->
        <span class="text">{{data.ptStockPublish.advantage}}</span>
      </li>
      <!-- <li>
        <span class="label">交 通</span>
        <span class="text">位于萧山区衙前镇 距离机场12km 距离G60高速3.5km 距离市区25km 距离104国道2km</span>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Feature',
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
.feature {
  width: var(--depotDetailLeftWidth);

  & ul li {
    display: flex;
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }

  & .label {
    width: 4em;
    margin-right: 50px;
    color: var(--siteTextWeakColor);
    flex-shrink: 0;
  }
  & .text {
    flex: 1 auto;
  }
}
</style>

