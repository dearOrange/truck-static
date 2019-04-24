<template>
  <div class="search">
    <a @click="toggleSearch">
      <svg class="icon search-icon" aria-hidden="true" v-if="!searchIsOpen">
        <use v-bind:xlink:href="'#icon-fangdajing'"></use>
      </svg>
      <svg class="icon close-icon" aria-hidden="true" v-else>
        <use v-bind:xlink:href="'#icon-close'"></use>
      </svg>
    </a>
    <div class="search--box" v-if="searchIsOpen">
      <div class="content">
        <cool-link-search
          :border="true"
          :side-button="{
            text: '地图搜索',
            action: () => {
              this.$router.push({name: 'depot-map'})
            }
          }"
          :search-keys="searchKeys"
          @search="onSearch"
        ></cool-link-search>
        <dl class="hot">
          <dt>热门搜索：</dt>
          <dd @click="hotKey({label: '冷冻库', value: '-22,-18', query: 'temperature'})">冷冻库</dd>
          <dd @click="hotKey({label: '冷藏库', value: '0,5', query: 'temperature'})">冷藏库</dd>
          <!-- <dd @click="hotKey({label: '保鲜库', value: '5,10', query: 'temperature'})">保鲜库</dd> -->
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',

  props: {},

  data() {
    return {
      searchIsOpen: false,
      searchKeys: []
    }
  },

  watch: {},

  methods: {
    toggleSearch() {
      this.searchIsOpen = !this.searchIsOpen
    },

    hotKey(item) {
      this.addSearchKeys(item)
    },

    addSearchKeys(obj) {
      let arr = this.searchKeys
      let key = obj.query

      let index = arr.findIndex(item => {
        return item.query === key
      })
      if (index !== -1) {
        arr.splice(index, 1, obj)
      } else {
        arr.push(obj)
      }
      this.searchKeys = [...arr]
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
        name: 'depot-list',
        query
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.search a {
  cursor: pointer;
  color: var(--siteTextColor);
}
.search--box {
  position: fixed;
  left: 0;
  top: var(--siteHeaderHeight);
  z-index: var(--zIndex9);
  width: 100%;
  padding: 35px 0;
  border-top: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.14);
  & .content {
    width: 960px;
    margin: 0 auto;
    & .hot {
      display: flex;
      margin-top: 8px;
      font-size: 12px;
      color: #878787;
      & > dd {
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>



