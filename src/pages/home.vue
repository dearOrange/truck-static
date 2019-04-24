<template>
  <div>
    <cool-link-header
      theme="dark"
      seamless
      :reverse-point="640"
      :reverse-theme="'bright'"
      :reverse-search="true"
    />
    <div class="home">
      <home-banner>
        <home-search class="home--search"></home-search>
      </home-banner>
      <home-functions></home-functions>
      <cool-link-whitespace size="100"></cool-link-whitespace>
      <home-brochure></home-brochure>
      <div class="home-inner mid-layout">
        <home-more
          :sub="'新库推荐'"
          :sup="'为你优选'"
          :link="{
            href: '/depot/list',
            text: '更多仓库'
          }"
          class="home--new-depot"
        >
          <home-new-depot-list></home-new-depot-list>
        </home-more>
        <home-more
          :sub="'冷库精选'"
          :sup="'为你优选'"
          :link="{
            href: '/depot/list',
            text: '更多仓库'
          }"
          class="home--best-depot"
        >
          <home-best-depot-list></home-best-depot-list>
        </home-more>
        <home-more
          :sub="'热租冷库'"
          :sup="'为你推荐'"
          :link="{
            href: '/depot/list',
            text: '更多仓库'
          }"
          class="home--hot-depot"
        >
          <home-hot-depot-list></home-hot-depot-list>
        </home-more>
      </div>

      <!-- <div class="home-stripe">
        <div class="home-inner mid-layout">
          <home-more
            :sub="'货主找车'"
            :sup="'实时路线'"
            :link="{
              href: '#',
              text: '更多信息'
            }"
            class="home--truck"
          >
            <home-truck-list></home-truck-list>
          </home-more>
        </div>
      </div>-->
      <div class="home-inner mid-layout">
        <home-more
          :sub="'冷库求租'"
          :link="{
            href: '/rent/list',
            text: '更多信息'
          }"
          class="home--rentable-depot"
        >
          <home-rentable-depot-list></home-rentable-depot-list>
        </home-more>

        <!-- <home-more
          :sub="'货源求车'"
          :link="{
            href: '#',
            text: '更多信息'
          }"
          class="home--rentable-trucks"
        >
          <home-rentable-truck-list></home-rentable-truck-list>
        </home-more>-->
        <home-more :sub="'合作伙伴'" :sup="''" class="home--partner">
          <home-partner-list class="home-partner--list"></home-partner-list>
        </home-more>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import HomeBanner from '@components/home/banner.vue'
import HomeSearch from '@components/home/search.vue'

import HomeFunctions from '@components/home/functions.vue'
import HomeBrochure from '@components/home/brochure.vue'

import HomeMore from '@components/home/more.vue'
import HomeNewDepotList from '@components/home/new-depot-list.vue'
import HomeHotDepotList from '@components/home/hot-depot-list.vue'
import HomeBestDepotList from '@components/home/best-depot-list.vue'
import HomeRentableDepotList from '@components/home/rentable-depot-list.vue'
import HomeRentableTruckList from '@components/home/rentable-truck-list.vue'
import HomeTruckList from '@components/home/truck-list.vue'
import HomePartnerList from '@components/home/partner-list.vue'

// import HomeContent from '@components/home/content.vue'

export default {
  name: 'home-page',
  components: {
    HomeBanner,
    HomeSearch,
    HomeFunctions,
    HomeBrochure,
    HomeMore,
    HomeNewDepotList,
    HomeBestDepotList,
    HomeHotDepotList,
    HomeRentableDepotList,
    HomeRentableTruckList,
    HomeTruckList,
    HomePartnerList
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
@import 'home.postcss';
.home {
  padding: 0 0 var(--homeWhiteSpace);
}

.home-stripe {
  background: rgb(238, 238, 241);
}

.banner-wrap {
  position: relative;
}
.banner-wrap--content {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: var(--zIndex6);
  width: var(--siteWidth);
  padding-top: 30px;
  margin-left: calc(var(--siteWidth) / -2);
}
.home--search {
  width: 912px;
  margin: 60px auto 0;
}
.home--new-depot {
  margin-top: var(--homeWhiteSpace);
}
.home--best-depot {
  margin-top: var(--homeWhiteSpace);
}

.home--hot-depot {
  margin-top: var(--homeWhiteSpace);
}

.home--truck {
  padding: var(--homeWhiteSpace) 0;
}

.home--rentable-depot {
  /* padding: 100px 0 0; */
  margin-top: var(--homeWhiteSpace);
}

.home--rentable-trucks {
  margin-top: var(--homeWhiteSpace);
}

.home--partner {
  margin-top: var(--homeWhiteSpace);
}
</style>
