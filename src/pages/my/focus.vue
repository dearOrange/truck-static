<template>
  <div class="focus">
    <my-box title="我的关注">
      <my-statistics></my-statistics>
      <focus-result/>
    </my-box>
  </div>
</template>

<script>
import MyBox from '@components/my/box.vue'
import MyStatistics from '@components/my/focus/statistics.vue'

import FocusResult from '@components/my/focus/result.vue'

export default {
  name: 'Focus',
  components: {
    MyBox,
    MyStatistics,
    FocusResult
  }
}
</script>

<style lang="postcss" scoped>
</style>


