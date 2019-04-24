<template>
  <div class="header" :class="headerClass">
    <div class="wrap">
      <div class="header--inner">
        <cool-link-logo class="header--logo" :theme="headerTheme"></cool-link-logo>
        <cool-link-position v-if="positionable" class="header--pos" :theme="headerTheme"/>
        <cool-link-nav class="header--nav" :theme="headerTheme"/>
        <header-search v-if="showSearch" class="header--search"></header-search>
        <header-auth class="header--auth" :theme="headerTheme" v-if="authable"></header-auth>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderSearch from '@components/common/header/search.vue'
import HeaderAuth from '@components/common/header/auth.vue'

export default {
  name: 'Header',
  components: {
    HeaderAuth,
    HeaderSearch
  },
  props: {
    theme: {
      type: String,
      default: 'bright',
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    },
    seamless: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    reversePoint: {
      type: Number
    },
    reverseTheme: {
      type: String,
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    },
    reverseSearch: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    authable: {
      type: Boolean,
      default: true
    },
    positionable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reversing: false
    }
  },
  computed: {
    headerTheme() {
      return this.reversing ? this.reverseTheme : this.theme
    },

    headerClass() {
      let theme = this.headerTheme

      return {
        [`header__${theme}`]: true,
        [`header__gap`]: !this.seamless,
        [`header__full`]: this.full
      }
    },
    isLight() {
      let theme = this.headerTheme
      return theme === 'bright'
    },

    showSearch() {
      let searchable = this.searchable
      let canShowSearch = searchable
      if (this.reverseSearch) {
        canShowSearch = canShowSearch && this.reversing
      }
      return canShowSearch
    }
  },
  methods: {
    checkReverse() {
      window.addEventListener(
        'scroll',
        (() => {
          let ticking
          return e => {
            let scrollY = window.scrollY
            if (!ticking) {
              window.requestAnimationFrame(() => {
                let reversePoint = this.reversePoint
                this.reversing = scrollY >= reversePoint
                ticking = false
              })
              ticking = true
            }
          }
        })()
      )
    }
  },

  mounted() {
    if (this.reversePoint && this.reversePoint > 0) {
      this.checkReverse()
    }
  }
}
</script>


<style lang="postcss" scoped>
.header {
  height: 0;
  font-size: 16px;
  & > .wrap {
    position: fixed;
    left: 0;
    top: 0;
    z-index: var(--zIndex9);
    width: 100%;
    height: var(--siteHeaderHeight);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.14);
  }

  & .header--inner {
    width: var(--siteWidth);
    margin: 0 auto;
  }

  &.header__dark {
    & > .wrap {
      background: rgba(0, 0, 0, 0.34);
      color: #fff;
    }
  }
  &.header__bright {
    & > .wrap {
      background: #fff;
      color: #000;
    }
  }
  &.header__primary {
    & > .wrap {
      background: var(--siteColor);
      color: #fff;
    }
  }

  &.header__gap {
    height: var(--siteHeaderHeight);
  }

  &.header__full {
    & .header--inner {
      width: 100%;
      padding: 0 20px;
      margin: 0;
    }
  }
}

.header--inner {
  display: flex;
  align-items: center;
  height: var(--siteHeaderHeight);
}

.header--logo {
  margin-right: 10px;
  flex-shrink: 0;
}

.header--nav {
  display: flex;
  height: 100%;
  align-items: center;
  flex: 1 0 auto;
  margin-left: 38px;
  justify-content: flex-end;
  margin-right: 10px;
}
.header--pos {
  margin-left: 10px;
}
.header--auth {
  display: flex;
  height: 100%;
  align-items: center;
}
.header--search {
  margin-right: 10px;
  flex-shrink: 0;
}
</style>


