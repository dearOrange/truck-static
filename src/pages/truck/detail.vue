<template>
  <div>
    <cool-link-header :searchable="false" :full="true"/>
    <div class="detail">
      <basic></basic>
      <detail-map class="detail--map"></detail-map>
      <cool-link-whitespace size="50"></cool-link-whitespace>
      <hot-list></hot-list>
      <cool-link-whitespace size="40"></cool-link-whitespace>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import { sleep } from '@utils'

import Basic from '@components/truck/detail/basic'
import DetailMap from '@components/truck/detail/map'
import HotList from '@components/truck/detail/hot-list'

export default {
  name: 'Detail',
  components: {
    Basic,
    DetailMap,
    HotList
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="postcss" scoped>
.detail--map {
  height: 600px;
}
</style>


