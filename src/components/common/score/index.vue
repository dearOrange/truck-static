<template>
  <div class="score">
    <div class="icons">
      <div class="back">
        <svg
          class="icon"
          aria-hidden="true"
          v-for="(item, index) in [...new Array(5)]"
          :key="index"
          :style="svgStyle"
        >
          <use xlink:href="#icon-wuxing"></use>
        </svg>
      </div>
      <div class="front" :style="frontStyle">
        <svg
          class="icon"
          aria-hidden="true"
          v-for="(item, index) in [...new Array(5)]"
          :key="index"
          :style="frontSvgStyle"
        >
          <use xlink:href="#icon-wuxing"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    score: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#FF9702'
    },
    size: {
      type: Number,
      default: 16
    }
  },

  computed: {
    svgStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    frontSvgStyle() {
      return {
        fill: this.color,
        ...this.svgStyle
      }
    },
    frontStyle() {
      return {
        width: `${(this.score / 5) * 100}%`
      }
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="postcss" scoped>
.score {
  display: inline-block;
  position: relative;
}
.icons {
  & svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
}
.back {
  display: flex;
  & > svg {
    fill: #c2c2c2;
  }
}

.front {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  overflow: hidden;
}
</style>




