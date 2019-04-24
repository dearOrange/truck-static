<template>
  <div class="meta">
    <thumb :data="data" class="meta--thunm"></thumb>
    <meta-info :data="data" class="meta--info"></meta-info>
  </div>
</template>

<script>
import Thumb from './thumb.vue'
import MetaInfo from './meta-info.vue'

export default {
  name: 'Meta',

  components: {
    Thumb,
    MetaInfo
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.meta {
  display: flex;
  justify-content: space-between;
}
.meta--info {
  width: 400px;
}
</style>


