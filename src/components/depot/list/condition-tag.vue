<template>
  <div class="condition-tag">
    <span class="label">您已选择：</span>
    <ul v-if="!isEmpty" class="list">
      <li v-for="(item, index) in this.list" :key="item.label">
        <!-- <el-tag
          closable
          :disable-transitions="false"
          @close="onClose(index)">
          {{item.label}}
        </el-tag> -->

        <cool-link-tag
          label="标签"
          :closeable="true"
          @close="onClose(index)"
        ></cool-link-tag>

      </li>
    </ul>
    <a v-if="!isEmpty" class="clear" @click="clear">清除</a>
  </div>
</template>
<script>
export default {
  name: 'ConditionTag',

  data() {
    return {
      list: [
        { label: '标签1' },
        { label: '标签2' },
        { label: '标签3' },
        { label: '标签4' },
        { label: '标签5' },
        { label: '标签6' }
      ]
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
    }
  },
  methods: {
    onClose(index) {
      let list = this.list
      list.splice(index, 1)
      this.list = [...list]
    },

    clear() {
      this.list = []
    }
  }
}
</script>

<style lang="postcss" scoped>
.condition-tag {
  display: flex;
  align-items: center;
  & .label {
    color: var(--siteTextWeakColor);
  }

  & .list {
    display: flex;
    & > li {
      margin-left: 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  & .clear {
    margin-left: 10px;
    cursor: pointer;
    color: var(--siteColor);
  }
}
</style>


