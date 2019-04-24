<template>
  <div class="statistics">
    <ul>
      <li>
        <span class="statistics--key">冷库出租</span>
        <span class="statistics--num">5</span>
      </li>
      <li>
        <span class="statistics--key">冷库求租</span>
        <span class="statistics--num">0</span>
      </li>
      <li>
        <span class="statistics--key">车辆路线</span>
        <span class="statistics--num">1</span>
      </li>
      <li>
        <span class="statistics--key">货源求车</span>
        <span class="statistics--num">0</span>
      </li>
      <li>
        <span class="statistics--key">未发布</span>
        <span class="statistics--num">0</span>
      </li>
      <li>
        <span class="statistics--key">失效发布</span>
        <span class="statistics--num">0</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Statistics'
}
</script>

<style lang="postcss" scoped>
.statistics {
  & > ul {
    display: flex;
    & > li {
      flex: 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      background: #f5f5f5;
      cursor: pointer;
    }
  }
}

.statistics--key {
  font-size: 20px;
}
.statistics--num {
  font-size: 18px;
  margin-left: 6px;
  color: #ff0101;
}
</style>

