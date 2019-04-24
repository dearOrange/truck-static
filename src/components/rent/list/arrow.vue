<template>
  <p class="arrow">
    <i class="up" :class="{
        'active': isUp
      }" @click="onUp"></i>
    <i class="down" :class="{
        'active': isDown
      }" @click="onDown"></i>
  </p>
</template>

<script>
export default {
  name: 'Arrow',

  props: {
    sort: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      upValue: 0,
      downValue: 0
    }
  },

  computed: {
    isDown() {
      let { value } = this.$parent.$parent
      return value === this.downValue
    },
    isUp() {
      let { value } = this.$parent.$parent
      return value === this.upValue
    }
  },

  methods: {
    onUp() {
      this.sort(this.upValue)
    },
    onDown() {
      this.sort(this.downValue)
    }
  },
  mounted() {
    let {
      value: [up, down]
    } = this.$parent
    this.upValue = up
    this.downValue = down
  }
}
</script>

<style lang="postcss" scoped>
.arrow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > i {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px;
    border-color: transparent transparent transparent transparent;
    cursor: pointer;
    border-bottom-color: #ddd;
    margin-bottom: 1px;
    &.up {
      &.active {
        border-bottom-color: var(--siteColor);
      }
    }
    &.down {
      transform: rotate3d(0, 0, 1, 180deg);
    }
    &.active {
      border-bottom-color: var(--siteColor);
    }
  }
}
</style>

