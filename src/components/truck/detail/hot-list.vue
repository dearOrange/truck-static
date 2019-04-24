<template>
  <div class="hot">
    <div class="hot--hd">
      <div class="hot--text">
        <span class="hot--text--sub">推荐路线</span>
      </div>
    </div>
    <div class="hot--bd">
      <div class="hot--list">
        <div v-for="(item, index) in [...new Array(5)]" :key="index" class="hot--item">
          <cool-link-thumbnails :link="'/truck/' + Math.floor(Math.random()*100000)" height="200">
            <template slot="desc">
              <hot-desc></hot-desc>
            </template>
          </cool-link-thumbnails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotDesc from './hot-desc'
export default {
  name: 'HotList',
  components: {
    HotDesc
  },
  props: {
    label: {
      type: String
    }
  }
}
</script>

<style lang="postcss">
.hot {
  padding: 0 25px;
}
.hot--hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hot--text--sub {
  display: inline-block;
  font-size: 24px;
}

.hot--list {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  & .hot--item {
    margin-left: 15px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>


