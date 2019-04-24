<template>
  <span class="option" :class="optionClass" @click="select">
    <i></i>
    <slot></slot>
  </span>
</template>
<script>
import { split, isEmpty } from 'lodash'

export default {
  name: 'RadioOption',

  props: {
    value: String | Number,

    themes: {
      type: String,
      default: ''
    }
  },

  computed: {
    optionClass() {
      let themes = isEmpty(this.themes) ? [] : split(this.themes, ' ')
      let themesClasses = themes.reduce((acc, theme) => {
        return {
          ...acc,
          [`option__${theme}`]: true
        }
      }, {})
      return {
        ...themesClasses,
        [`option__active`]: this.isActive ? true : false
      }
    },
    isActive() {
      let { value } = this.$parent
      return value === this.value
    }
  },

  methods: {
    select() {
      let self = this
      let emitChangeValue

      if (!this.isActive) {
        emitChangeValue = this.value
        this.$parent.$emit('change', emitChangeValue)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --radio-option-border-color: var(--inputBorderColor);
}

.option {
  display: flex;
  align-items: center;
  padding: 0;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  & > i {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    width: 14px;
    border: 1px solid var(--radio-option-border-color);
    border-radius: 50%;
    margin-right: 5px;
  }
}

.option__active {
  & > i {
    border-color: var(--siteColor);
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--siteColor);
      border-radius: 50%;
    }
  }
}
</style>




