<template>
  <a class="btn" :class="btnThemeClass" @click="onClick" :style="btnCustomStyle">
    <span v-if="prependIcon" class="btn--icon prepend-icon">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-' + prependIcon"></use>
      </svg>
    </span>
    <span class="btn--text" :class="className">
      <svg class="icon" aria-hidden="true" v-if="icon" :style="{fill: iconColor}">
        <use v-bind:xlink:href="'#icon-' + icon"></use>
      </svg>
      <slot v-else>
        <span>{{btnText}}</span>
      </slot>
    </span>
    <span v-if="appendIcon" class="btn--icon append-icon">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-' + appendIcon"></use>
      </svg>
    </span>
  </a>
</template>

<script>
import { isArray } from 'lodash'
export default {
  name: 'Button',

  props: {
    themes: {
      types: String | Array,
      default() {
        return []
      }
    },
    size: {
      type: String,
      default: 'middle'
    },
    disabled: {
      type: Boolean,
      default: false
    },

    prependIcon: {
      type: String
    },
    appendIcon: {
      type: String
    },
    icon: {
      type: String
    },
    iconBgColor: {
      type: String
    },
    iconColor: {
      type: String
      // default: '#fff'
    },
    className: String,

    text: {
      type: String,
      default: '按钮'
    },
    alias: {
      type: String
    },
    asyncClick: {
      type: Function
    }
  },

  data() {
    return {
      processing: false
    }
  },

  computed: {
    btnThemeClass() {
      let btnThemes = this.themes
      if (!isArray(btnThemes) && btnThemes) {
        btnThemes = btnThemes.split(' ')
      }

      return btnThemes.reduce(
        (acc, item) => {
          return {
            ...acc,
            [`btn__${item}`]: true
          }
        },
        {
          [`btn__disabled`]: this.disabled,
          [`btn__${this.size}`]: true,
          [`btn__prepend-icon`]: this.prependIcon,
          [`btn__append-icon`]: this.appendIcon,
          [`btn__only-icon`]: this.icon,
          [`btn__processing`]: this.processing
        }
      )
    },

    btnCustomStyle() {
      let bgStyle = {
        background: this.iconBgColor
      }
      if (this.iconBgColor) {
        bgStyle['border'] = 'none'
      }

      return {
        ...bgStyle
      }
    },

    btnText() {
      return this.processing
        ? `正在${this.alias ? this.alias : this.text}中`
        : this.text
    }
  },

  methods: {
    onClick() {
      if (!this.disabled) {
        if (this.asyncClick && !this.processing) {
          new Promise(resolve => {
            this.processing = true
            this.asyncClick(() => {
              resolve(true)
            })
          }).then(bool => {
            this.processing = false
          })
        } else {
          this.$emit('click')
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import 'btn.postcss';
.btn-mobile {
  flex-direction: column;
}
</style>


