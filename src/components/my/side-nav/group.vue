<template>
  <div class="group">
    <side-nav-title class="group--title" :txt="txt" :svgIcon="svgIcon"/>
    <side-nav-list class="group--list" :list="list"></side-nav-list>
  </div>
</template>

<script>
import SideNavTitle from './title.vue'
import SideNavList from './list.vue'
export default {
  name: 'SideNavGroup',
  components: {
    SideNavTitle,
    SideNavList
  },
  props: {
    txt: String,
    svgIcon: String,
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.group {
  /* margin-bottom: 46px; */
}
.group--title {
  padding-left: 20px;
}
.group--list {
  margin-top: 15px;
  padding-left: 20px;
}
</style>


