<template>
  <div class="side-nav">
    <side-nav-group
      class="side-nav--group"
      :txt="'用户中心'"
      :svgIcon="'yonghuzhongxin'"
      :list="[
        {label: '用户首页', to: 'home'},
        {label: '我的发布', to: 'release'},
        {label: '我的关注', to: 'focus'},
      ]"
    ></side-nav-group>
    <side-nav-group
      class="side-nav--group"
      :txt="'账户管理'"
      :svgIcon="'zhangdan'"
      :list="[
        {label: '我的资料', to: 'profile'},
        {label: '修改密码', to: 'password'},
      ]"
    ></side-nav-group>
  </div>
</template>

<script>
import SideNavGroup from '@components/my/side-nav/group.vue'

export default {
  name: 'SideNav',
  components: {
    SideNavGroup
  }
}
</script>

<style lang="postcss" scoped>
.side-nav--group {
  margin-top: 45px;
  &:first-child {
    margin-top: 0;
  }
}
</style>


