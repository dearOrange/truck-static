<template>
  <div class="types">
    <svg class="icon" aria-hidden="true" @click="changeType('a')">
      <use v-bind:xlink:href="'#icon-wuxupailie'"></use>
    </svg>
    <svg class="icon" aria-hidden="true" @click="changeType('b')">
      <use v-bind:xlink:href="'#icon-pailie'"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Rank',

  methods: {
    changeType(type) {
      this.$emit('change', type)
    }
  }
}
</script>

<style lang="postcss" scoped>
.types {
  display: flex;
  align-items: center;
  & > .icon {
    display: block;
    height: 16px;
    margin-left: 4px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
