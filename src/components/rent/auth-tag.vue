<template>
  <div class="auth-tag" :style="styles">
    <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="'#icon-gou'"></use>
    </svg>
    <span>{{text}}</span>
  </div>
</template>
<script>
import config from '@/config'

export default {
  name: 'AuthTag',
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
        color: this.color
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.auth-tag {
  display: flex;
  align-items: center;
  & > .icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}
</style>



