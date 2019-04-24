<template>
  <div class="recommend">
    <div class="recommend--hd">
      <div class="recommend--text">
        <span class="recommend--text--sub">{{label}}</span>
      </div>
    </div>
    <div class="recommend--bd">
      <recommend-item v-for="(item, index) in list" :key="index" :data="item"></recommend-item>
    </div>
  </div>
</template>

<script>
import RecommendItem from './item.vue'
import rentApi from '@/api/rent'
import { mapGetters } from 'vuex'

export default {
  name: 'Recommend',
  components: {
    RecommendItem
  },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters({
      getCityCode: 'getCityCode'
    })
  },
  mounted() {
    rentApi.getRecommendList(5, this.getCityCode).then(({ success, data }) => {
      if (success) {
        this.list = data
      }
    })
  }
}
</script>

<style lang="postcss">
.recommend--hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recommend--text--sub {
  display: inline-block;
  font-size: 24px;
}

.recommend--bd {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
</style>


