<template>
  <div>
    <cool-link-header theme="primary" :searchable="false"/>

    <div class="my">
      <div class="mid-layout my--container">
        <side-nav class="my--side-nav"></side-nav>
        <div class="my--content">
          <router-view/>
        </div>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import SideNav from '@components/my/side-nav'
export default {
  name: 'My',
  components: {
    SideNav
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="postcss" scoped>
.my {
  padding: 35px 0 70px;
  background: #f5f5f6;
  min-height: 80vh;
}

.my--container {
  display: flex;
}
.my--side-nav {
  padding: 40px 50px 40px 30px;
  flex-shrink: 0;
  background: #fff;
}

.my--content {
  margin-left: 20px;
  flex: 1 auto;
}
</style>

