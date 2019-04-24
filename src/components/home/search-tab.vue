<template>
  <ul class="search-tab">
    <li @click="onTap('depot')" :class="{active: type === 'depot'}">找冷库</li>
    <li @click="onTap('rent')" :class="{active: type === 'rent'}">找货</li>
  </ul>
</template>

<script>
export default {
  name: 'SearchTab',

  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String
  },
  data() {
    return {
      type: this.value
    }
  },
  methods: {
    onTap(type) {
      if (type === this.type) {
        return
      }
      this.type = type
      this.$emit('change', type)
    }
  }
}
</script>


<style lang="postcss" scoped>
.search-tab {
  & > li {
    display: inline-block;
    padding: 0 14px 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
    &.active {
      position: relative;
      &::before {
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -9px;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid rgba(255, 255, 255, 1);
        content: ' ';
        width: 0;
        height: 0;
      }
    }
  }
}
</style>



