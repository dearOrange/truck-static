<template>
  <div class="dropdown" v-outside-click="hide">
    <div class="dropdown--text" @click="toggle">
      <span class="text">{{ labelText }}</span>
      <i class="arrow" :class="{
        open: shown
      }"></i>
    </div>
    <div class="dropdown--menu" v-show="shown">
      <ul class="options" :style="optionsStyle">
        <li @click="select(item)" v-for="(item, index) in options" :key="index">
          <span v-text="format(item)"></span>
        </li>
      </ul>
      <slot name="additional"></slot>
    </div>
  </div>
</template>

<script>
import { join, split, gt, isFinite } from 'lodash'

export default {
  name: 'Dropdown',

  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String | Number,
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    align: {
      type: String,
      default: 'center',
      validator: function(value) {
        return ['left', 'right', 'center'].includes(value)
      }
    },
    textRender: {
      type: Function,
      default: text => text
    }
  },

  data() {
    return {
      shown: false,
      labelText: this.label,
      rangeMin: '',
      rangeMax: ''
    }
  },

  computed: {
    optionsStyle() {
      return {
        'text-align': this.align
      }
    }
  },

  methods: {
    toggle() {
      this.shown = !this.shown
    },
    format(option) {
      if (option.text) {
        return option.text
      }
      return this.textRender(option.text || option.value)
    },

    select(option) {
      this.$emit('change', option.value)
      this.labelText = this.format(option)
      this.hide()
    },
    hide() {
      this.shown = false
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --dp-arrow-size: 8px;
}

.dropdown {
  position: relative;
  z-index: var(--zIndex2);
  width: 100%;
  cursor: pointer;
}

.dropdown--text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: #fff;

  & .arrow {
    border-style: solid;
    border-width: var(--dp-arrow-size) calc(var(--dp-arrow-size) / 2) 0;
    border-color: var(--siteColor) transparent transparent transparent;
    &.open {
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }
}

.dropdown--menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.14);
  background: #fff;
  box-shadow: 0px 2px 14px 1px rgba(0, 0, 0, 0.14);
}

.options {
  padding: 10px 0;
  & > li {
    margin: 3px 0;
    padding: 4px 0;
    &:hover {
      background: rgba(0, 0, 0, 0.14);
    }
  }
}
</style>



