<template>
  <div class="mpage">
    <div class="mpage-num">{{page.pageNum}}/{{total !== 0 ? total : 1}}</div>
    <svg class="icon" aria-hidden="true" @click="tapPrev">
      <use v-bind:xlink:href="'#icon-left-arrow'"></use>
    </svg>
    <svg class="icon" aria-hidden="true" @click="tapNext">
      <use v-bind:xlink:href="'#icon-right-arrow'"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MinPage',

  props: {
    page: {
      type: Object,
      required: true
    }
  },

  computed: {
    total() {
      let multiple = this.page.pageTotal % this.page.pageSize === 0

      return Math.round(
        this.page.pageTotal / this.page.pageSize + (multiple ? 0 : 0.5)
      )
    }
  },

  methods: {
    tapPrev() {
      if (this.page.pageNum > 1) {
        this.$emit('change', this.page.pageNum - 1)
      }
    },
    tapNext() {
      if (this.page.pageNum < this.total) {
        this.$emit('change', this.page.pageNum + 1)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.mpage {
  display: flex;
  align-items: center;
  & .icon {
    display: block;
    height: 16px;
    margin-left: 4px;
    cursor: pointer;
  }
}
</style>


