<template>
  <cool-link-search
    :search-keys="searchKeys"
    :side-button="{
      text: '地图搜索',
      action: () => {
        this.$router.push(this.mapPath)
      }
    }"
    @search="onSearch"
  >
    <template slot="assist" slot-scope="search">
      <search-tab v-model="type" @change="onTabChange(search)"></search-tab>
    </template>
    <template slot="supplement" slot-scope="search">
      <search-depot-conditions
        v-if="isDepot"
        @confirm="onConditionsConfirm"
        @hide="search.supplement.hide"
      ></search-depot-conditions>
    </template>
  </cool-link-search>
</template>

<script>
import SearchTab from '@components/home/search-tab.vue'
import SearchDepotConditions from '@components/home/search-depot-conditions.vue'

export default {
  name: 'HomeSearch',

  components: {
    SearchTab,
    SearchDepotConditions
  },

  data() {
    return {
      type: 'depot',
      searchKeys: null
    }
  },

  computed: {
    isDepot() {
      return this.type === 'depot'
    },
    mapPath() {
      return {
        name: `${this.type}-map`
      }
    },
    searchPath() {
      return {
        name: `${this.type}-list`
      }
    }
  },

  methods: {
    onTabChange(searchScope) {
      searchScope.supplement.hide()
    },
    onConditionsConfirm(searchKeys) {
      this.searchKeys = searchKeys
    },
    onSearch(currency = '', others = []) {
      let query = {
        currency
      }
      query = others.reduce((acc, item) => {
        acc[item.query] = item.value
        return acc
      }, query)
      this.$router.push({
        ...this.searchPath,
        query
      })
    }
  }
}
</script>

