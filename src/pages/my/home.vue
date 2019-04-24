<template>
  <div class="home">
    <user-info class="home--user-info"/>

    <cool-link-tabs class="home--other-info">
      <cool-link-tab-panel label="我的足迹">
        <footprint></footprint>
      </cool-link-tab-panel>
      <cool-link-tab-panel label="最近发布">
        <released></released>
      </cool-link-tab-panel>
      <!-- <cool-link-tab-panel label="在线交易">
        <online-trade></online-trade>
      </cool-link-tab-panel>-->
    </cool-link-tabs>

    <!-- <UserCenterTabs class="user-center-tabs">
            <template slot="ct1">
                <UserFootPrint></UserFootPrint>
            </template>
            <template slot="ct2">
                <UserRecent></UserRecent>
            </template>
            <template slot="ct3">
                <UserAnonymous></UserAnonymous>
            </template>
    </UserCenterTabs>-->
  </div>
</template>

<script>
import UserInfo from '@components/my/home/user-info.vue'
import Footprint from '@components/my/home/footprint.vue'
import Released from '@components/my/home/released.vue'
import OnlineTrade from '@components/my/home/online-trade.vue'

export default {
  name: 'HomePage',
  components: {
    UserInfo,
    Footprint,
    Released,
    OnlineTrade
  }
}
</script>

<style lang="postcss" scoped>
.home--other-info {
  margin-top: 20px;
  background: #fff;
}
</style>
