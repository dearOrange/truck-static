<template>
  <div class="position" :class="themeClass">
    <div class="local" @click="selectCitys">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-dingwei'"></use>
      </svg>
      <span class="text">{{cityText}}</span>
    </div>
  </div>
</template>
<script>
import Dialog from '@components/common/dialog'
import PositionCity from './city'

// import { SET_USER_GEO } from '@/store/types'
// import { mapActions, mapGetters } from 'vuex'
import { mapGetters } from 'vuex'
import commonApi from '@/api/common'
import { groupBy } from 'lodash'

import { sleep } from '@utils'

export default {
  name: 'Position',
  props: {
    theme: {
      type: String,
      default: 'bright',
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    }
  },

  data() {
    return {
      permited: false,
      locating: false
    }
  },

  computed: {
    ...mapGetters({
      city: 'getCity'
    }),

    cityText() {
      return this.locating ? '正在获取' : this.city
    },

    themeClass() {
      let theme = this.theme
      return {
        [`position__${theme}`]: true
      }
    }
  },

  methods: {
    // ...mapActions({
    //   setGeo: SET_USER_GEO
    // }),
    async selectCitys() {
      this.locating = true

      let { success, data } = await commonApi.getAllCitys()
      this.locating = false
      let obj = groupBy(data, item => {
        return item.initials
      })

      let list = Object.keys(obj).map(key => {
        let item = obj[key]
        return {
          letter: key,
          list: groupBy(item, o => o.parentName)
        }
      })
      Dialog.open(PositionCity, {
        props: {
          list
        }
      })
    }
  },

  mounted() {
    // try {
    //   navigator.permissions.query({ name: 'geolocation' }).then(permission => {
    //     let status = permission.state
    //     if (status === 'granted') {
    //       this.permited = true
    //       this.setGeo()
    //     }
    //   })
    // } catch (e) {
    //   // TODO
    //   console.log(e)
    // }
  }
}
</script>
<style lang="postcss" scoped>
.position {
  position: relative;
  &:hover {
    & .position--area {
      display: block;
    }
  }
  &.position__primary {
    & .local {
      border-color: #fff;
      & > .icon {
        color: #fff;
      }
      & > .text {
        color: #fff;
      }
    }
  }
}
.local {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 0 6px;
  border: 1px solid var(--siteColor);
  border-radius: 14px;
  cursor: pointer;
  & > .icon {
    color: var(--siteColor);
  }
  & > .text {
    font-size: 12px;
    font-weight: 400;
    color: var(--siteColor);
    margin-left: 5px;
  }
}

.position--area {
  display: none;
  position: absolute;
  z-index: var(--zIndex9);
  width: 786px;
  max-height: 388px;
  padding: 20px 0;
  overflow-y: auto;
  background: #fff;
}
.areas {
  padding: 8px 20px;
  overflow: hidden;
  & dt {
    float: left;
    line-height: 32px;
    font-size: 14px;
  }
  & dd {
    line-height: 32px;
    margin: 0;
    overflow: hidden;
    & a {
      display: inline-block;
      color: #495056;
      font-size: 14px;
      margin-left: 25px;
      white-space: nowrap;
    }
  }

  &:last-child {
    border: 0;
  }
}
.areas__dashed {
  border-bottom: 1px dashed #ccc;
}
.areas__solid {
  border-bottom: 1px solid #ccc;
}
.areas__region {
  & .areas--letter {
    color: #22ac38;
  }
}

.areas--letter {
  display: inline-block;
  width: 2em;
  color: #a5abb2;
  text-align: right;
}
</style>
