<template>
  <div class="whitespace" :style="styles"></div>
</template>

<script>
export default {
  name: 'Whitespace',
  props: {
    size: {
      type: String | Number,
      default: 0
    },

    direction: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    }
  },

  computed: {
    isHor() {
      return this.direction === 'horizontal'
    },

    styles() {
      return {
        [this.isHor ? 'width' : 'height']: `${this.size}px`,
        display: this.isHor ? 'inline-block' : 'block'
      }
    }
  }
}
</script>

