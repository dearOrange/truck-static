<template>
  <div class="tag" :class="tagClass">
    <span class="tag--label" @click="gocert">{{label}}</span>
    <span class="tag--close" @click="onClose" v-if="closeable">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-close'"></use>
      </svg>
    </span>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    label: {
      type: String,
      required: true
    },
    themes: {
      type: String,
      default: ''
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    tagClass() {
      let thems = this.themes.split(' ')
      let themesClasses = thems.reduce((acc, theme) => {
        return {
          ...acc,
          [`tag__${theme}`]: true
        }
      }, {})
      return {
        ...themesClasses
      }
    }
  },

  methods: {
    onClose() {
      this.$emit('close')
    },
    gocert() {
      this.$emit('goCert')
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  border: 1px solid var(--siteColor);
}
.tag__round {
  border-radius: 3px;
}

.tag__info,
.tag__gray {
  background: color-mod(var(--infoColor) lightness(95%));
  border-color: color-mod(var(--infoColor) lightness(90%));
  & .tag--label {
    color: var(--infoColor);
  }
  & .tag--close {
    &:hover {
      background: color-mod(var(--infoColor) lightness(80%));
      & > svg {
        fill: #fff;
      }
    }
  }
}
.tag__warn,
.tag__orange {
  background: color-mod(var(--warnColor) lightness(95%));
  border-color: color-mod(var(--warnColor) lightness(90%));
  & .tag--label {
    color: var(--warnColor);
  }
  & .tag--close {
    &:hover {
      background: color-mod(var(--warnColor) lightness(80%));
      & > svg {
        fill: #fff;
      }
    }
  }
}
.tag__success,
.tag__green {
  background: color-mod(var(--successColor) lightness(95%));
  border-color: color-mod(var(--successColor) lightness(90%));
  & .tag--label {
    color: var(--successColor);
  }
  & .tag--close {
    &:hover {
      background: color-mod(var(--successColor) lightness(80%));
      & > svg {
        fill: #fff;
      }
    }
  }
}
.tag__solemn,
.tag__blue {
  background: color-mod(var(--solemnColor) lightness(95%));
  border-color: color-mod(var(--solemnColor) lightness(90%));
  & .tag--label {
    color: var(--solemnColor);
  }

  & .tag--close {
    &:hover {
      background: color-mod(var(--solemnColor) lightness(80%));
      & > svg {
        fill: #fff;
      }
    }
  }
}

.tag__unborder {
  border-color: transparent;
}

.tag--label {
  color: var(--siteTextColor);
}
.tag--close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-left: 6px;
  cursor: pointer;
  & > svg {
    width: 8px;
    height: 8px;
    color: #a7a7a7;
  }
  &:hover {
    background: var(--siteColor);
    & > svg {
      color: #fff;
    }
  }
}
</style>

