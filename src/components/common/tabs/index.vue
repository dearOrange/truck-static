<template>
  <div class="tabs">
    <div class="tabs--header">
      <div class="label-list">
        <div v-for="item in tabLabels" :key="item.tid" class="label-item label"
          :class="{
            'label__active': item.index === activeIndex
          }"
          @click="onTab(item.index)"
        >
          {{item.label}}
        </div>
      </div>
    </div>
    <div class="tabs--content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    initialIndex: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      tabPanelList: [],
      activeIndex: this.initialIndex
    }
  },

  computed: {
    tabLabels() {
      return this.tabPanelList.map((tabPanel, index) => {
        return {
          index,
          label: tabPanel.label,
          tid: tabPanel._uid
        }
      })
    }
  },

  methods: {
    init() {
      this.loadTabPanel()
      this.tabPanelList[this.activeIndex].load()
    },

    loadTabPanel() {
      this.tabPanelList = this.$slots.default.reduce((acc, item) => {
        let result = acc
        if (item.componentInstance) {
          item.componentInstance.unload()
          result = [...result, item.componentInstance]
        }
        return result
      }, [])
    },

    onTab(targetIndex = this.initialIndex) {
      let prevIndex = this.activeIndex
      let nextIndex = targetIndex

      if (nextIndex === prevIndex) {
        return
      }
      this.activeIndex = targetIndex
      this.tabPanelList[prevIndex].unload()
      this.tabPanelList[nextIndex].load()
    }
  },

  created() {},

  mounted() {
    this.init()
  }
}
</script>

<style lang="postcss" scoped>
.label-list {
  display: flex;
  border-bottom: 2px solid var(--siteColor);
}
.label {
  padding: 16px 32px;
  cursor: pointer;
  &.label__active {
    background: var(--siteColor);
    color: #fff;
    cursor: default;
  }
}
</style>

