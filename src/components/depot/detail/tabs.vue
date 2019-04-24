<template>
  <div class="tabs">
    <tab-panel class="tabs--panel" label="基本信息">
      <template slot="content">
        <slot name="t1"></slot>
      </template>
    </tab-panel>
    <cool-link-whitespace size="40"></cool-link-whitespace>
    <tab-panel class="tabs--panel" label="配套设施">
      <template slot="content">
        <slot name="t2"></slot>
      </template>
    </tab-panel>
    <cool-link-whitespace size="40"></cool-link-whitespace>
    <tab-panel v-if="data.ptStockPublish.advantage" class="tabs--panel" label="优势特点">
      <template slot="content">
        <slot name="t3"></slot>
      </template>
    </tab-panel>
    <cool-link-whitespace v-if="data.ptStockPublish.advantage" size="40"></cool-link-whitespace>
    <tab-panel v-if="data.ptStockPublish.cooperationCase" class="tabs--panel" label="合作案例">
      <template slot="content">
        <slot name="t4"></slot>
      </template>
    </tab-panel>
    <!-- <cool-link-whitespace size="40"></cool-link-whitespace>
    <tab-panel class="tabs--panel" label="现场图片">
      <template slot="content">
        <slot name="t5"></slot>
      </template>
    </tab-panel>-->
    <cool-link-whitespace v-if="data.ptStockPublish.advantage" size="40"></cool-link-whitespace>
    <tab-panel class="tabs--panel" label="地理位置">
      <template slot="content">
        <slot name="t6"></slot>
      </template>
    </tab-panel>

    <!-- <el-tabs value="t1">
      <el-tab-pane label="基本信息" name="t1">
        <tab-panel label="基本信息">
          <template slot="content">
            <slot name="t1"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
      <el-tab-pane label="配套设施" name="t2">
        <tab-panel label="配套设施">
          <template slot="content">
            <slot name="t2"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
      <el-tab-pane label="优势特点" name="t3">
        <tab-panel label="优势特点">
          <template slot="content">
            <slot name="t3"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
      <el-tab-pane label="合作案例" name="t4">
        <tab-panel label="合作案例">
          <template slot="content">
            <slot name="t4"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
      <el-tab-pane label="现场图片" name="t5">
        <tab-panel label="现场图片">
          <template slot="content">
            <slot name="t5"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
      <el-tab-pane label="地理位置" name="t6">
        <tab-panel label="地理位置">
          <template slot="content">
            <slot name="t6"></slot>
          </template>
        </tab-panel>
      </el-tab-pane>
    </el-tabs>-->
  </div>
</template>

<script>
import TabPanel from './tab-panel.vue'
export default {
  name: 'Tabs',
  components: {
    TabPanel
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>


