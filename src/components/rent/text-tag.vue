<template>
  <span class="text-tag" :style="styles">
    {{text}}
  </span>
</template>

<script>
import config from '@/config'

export default {
  name: 'TextTag',
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: config.theme.color
    }
  },

  computed: {
    styles() {
      return {
        border: `1px solid ${this.color}`,
        color: this.color
      }
    }
  }
}
</script>

<style lang="postcss">
.text-tag {
  display: inline-block;
  height: 22px;
  line-height: @height;
  padding: 0 6px;
  font-size: 12px;
}
</style>

