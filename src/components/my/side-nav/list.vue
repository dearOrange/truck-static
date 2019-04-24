<template>
  <ul class="list">
    <li class="list--item" v-for="(item, index) in list" :key="index">
      <router-link exact-active-class="active" :to="{name: `my-${item.to}`}" tag="a">{{item.label}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'centerlist',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {}
}
</script>

<style lang="postcss" scoped>
.list {
}
.list--item {
  margin-top: 12px;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  }

  & > a {
    color: var(--siteTextLightColor);
    text-decoration: none;
    &.active {
      color: var(--siteColor);
    }
  }
}
</style>



