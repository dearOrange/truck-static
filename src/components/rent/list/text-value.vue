<template>
  <div class="text-value">
    <div class="value" :style="styles">{{value}}</div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'TextValue',
  props: {
    text: {
      type: String
    },
    value: {
      type: String | Number
    },
    bold: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    styles() {
      return {
        'font-weight': this.bold ? '700' : '400'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.text-value {
  display: flex;
  flex-direction: column;
  & .value {
    width: 100%;
    height: 24px;
    line-height: @height;
    font-size: 16px;
  }
  & .text {
    width: 100%;
    margin-top: 4px;
    font-size: 12px;
    color: var(--siteTextLightColor);
  }
}
</style>