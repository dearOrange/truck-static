<template>
  <div class="result">
    <div class="head">
      <result-statistics></result-statistics>
      <result-filter></result-filter>
    </div>
    <div class="content">
      <result-list></result-list>
    </div>
  </div>
</template>

<script>
import ResultStatistics from './statistics.vue'
import ResultFilter from './filter.vue'

import ResultList from './list.vue'

export default {
  name: 'Result',

  components: {
    ResultStatistics,
    ResultFilter,

    ResultList
  }
}
</script>

<style lang="postcss" scoped>
.result {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & .content {
    padding: 0 40px 20px;
    flex: 1 auto;
    overflow-y: auto;
  }
}
</style>

