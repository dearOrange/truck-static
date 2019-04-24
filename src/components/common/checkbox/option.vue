<template>
  <span class="option" :class="optionClass" @click="select">
    <i></i>
    <slot></slot>
  </span>
</template>
<script>
import { includes, remove, split, join, isEmpty } from 'lodash'

export default {
  name: 'CheckboxOption',

  props: {
    value: String | Number,

    themes: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      // isActive: false
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
    isActive: {
      get() {
        let { value: parentValue } = this.$parent
        let arr = isEmpty(parentValue) ? [] : parentValue
        return includes(arr, this.value)
      }
    }
  },

  methods: {
    select() {
      let { value: parentValue } = this.$parent
      let self = this
      let emitChangeValue
      let arr = isEmpty(parentValue) ? [] : parentValue.slice(0)
      if (this.isActive) {
        remove(arr, item => {
          return item === self.value
        })
      } else {
        arr.push(this.value)
      }
      emitChangeValue = arr
      // this.$parent.$set(this.$parent, 'checkboxValue', emitChangeValue)
      this.$parent.$emit('change', emitChangeValue)
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
    margin-right: 5px;
  }
}

.option__active {
  & > i {
    border-color: var(--siteColor);
    &:before {
      content: '';
      width: 6px;
      height: 4px;
      border-style: solid;
      border-width: 1px;
      border-color: transparent transparent var(--siteColor) var(--siteColor);
      transform: translate3d(0, -2px, 0) rotate3d(0, 0, 1, -45deg);
      transform-origin: 50% 50%;
    }
  }
}
</style>




