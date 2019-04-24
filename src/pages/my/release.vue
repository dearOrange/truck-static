<template>
  <div class="release">
    <my-box title="我的发布">
      <my-statistics></my-statistics>
      <release-result/>
    </my-box>
  </div>
</template>

<script>
import MyBox from '@components/my/box.vue'
import ReleaseResult from '@components/my/release/result.vue'
import MyStatistics from '@components/my/release/statistics.vue'

export default {
  name: 'Release',
  components: {
    MyBox,
    MyStatistics,
    ReleaseResult
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="postcss" scoped>
.statistics {
  & > ul {
    display: flex;
  }
}
</style>


