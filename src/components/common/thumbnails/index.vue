<template>
  <div class="thumbnails" :class="thumbnailsClass" @mouseover="onHoverOn" @mouseout="onHoverOff">
    <div class="thumbnails--decorator">
      <slot name="decorator"></slot>
    </div>
    <div class="thumbnails--pic" @click="gotoLink">
      <img v-if="srcImg" :width="width" :height="height" :src="srcImg" alt="图片">
      <img v-if="!srcImg" :width="width" :height="height" src="@/assets/img/default.jpg" alt="图片">
      <span v-if="mark" class="thumbnails--mark" :style="markStyles">{{mark}}</span>
    </div>
    <div class="thumbnails--desc">
      <slot :hover="hover" name="desc"></slot>
    </div>
  </div>
</template>

<script>
import { isString, isObject } from 'lodash'

export default {
  name: 'Thumbnails',
  props: {
    width: {
      type: Number | String,
      default: '100%'
    },
    height: {
      type: Number | String,
      default() {
        return 'auto'
      }
    },
    srcImg: {
      type: String
    },
    link: {
      type: String | Object,
      default() {
        return ''
      }
    },
    borderless: {
      type: Boolean,
      default: false
    },
    mark: {
      type: String
    },
    markStyle: {
      type: Object,
      default() {
        return {
          left: true,
          bottom: true,
          color: 'rgba(57, 64, 67, 1)'
        }
      }
    },
    direction: {
      type: String,
      default() {
        return 'vertical'
      },

      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    }
  },
  data() {
    return {
      hover: false
    }
  },
  watch: {
    'this.srcImg': function(val, old) {
      console.log(val, old)
    }
  },
  computed: {
    isVertical() {
      // 是否是垂直布局的
      return this.direction === 'vertical'
    },

    thumbnailsClass() {
      return {
        [`thumbnails__${this.direction}`]: true,
        [`thumbnails__borderless`]: this.borderless,
        [`thumbnails__linkable`]: !!this.link
      }
    },
    markStyles() {
      let style = {}
      let space = 10
      let { color, left: isLeft, bottom: isBottom } = this.markStyle
      return {
        [isLeft ? 'left' : 'right']: 0,
        [isBottom ? 'bottom' : 'top']: `${space}px`,
        color: '#fff',
        background: color
      }
    }
  },

  methods: {
    onHoverOn() {
      this.hover = true
    },
    onHoverOff() {
      this.hover = false
    },
    gotoLink() {
      if (this.link) {
        let toRouter
        if (isObject(this.link)) {
          toRouter = { ...this.link }
        } else {
          toRouter = {
            path: this.link
          }
        }
        this.$router.push(toRouter)
      }
    }
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
.thumbnails {
  position: relative;
  display: inline-block;
  /* background: rgba(255, 255, 255, 1); */
  box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.14);
}

.thumbnails__borderless {
  box-shadow: none;
}

.thumbnails__horizontal {
  display: flex;
  flex-direction: row;
  & .thumbnails--desc {
    flex: 1 auto;
  }
}
.thumbnails__linkable {
  cursor: pointer;
}

.thumbnails--pic {
  position: relative;
  overflow: hidden;

  & > img {
    display: block;
    transition: transform ease-in-out 0.5s;
    transform: scale(1);
  }
  &:hover > img {
    transform: scale(1.5);
  }
}

.thumbnails--mark {
  position: absolute;
  /* left: 0;
  bottom: 11px; */
  padding: 0 19px;
  background: rgba(57, 64, 67, 1);
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
}
</style>

