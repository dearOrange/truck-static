<template>
  <div class="hang" :class="{
    'hang__off': !hangOn
  }">
    <div class="hang--search">
      <slot name="search"></slot>
    </div>
    <div class="hang--result">
      <slot name="result"></slot>
    </div>
    <a class="hang--lump" @click="hangToggle">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="hangOn ? '#icon-left-arrow' : '#icon-right-arrow'"></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Hang',

  props: {
    popKey: {
      type: String | Number
    }
  },

  data() {
    return {
      hangOn: true,
      loading: false,
      list: [],
      params: {}
    }
  },

  watch: {
    // 监听 popKey, 来关闭hang
    // popKey(newKey, oldKey) {
    //   if (newKey !== oldKey) {
    //     this.hangOn = false
    //   }
    // }
  },

  methods: {
    hangToggle() {
      this.hangOn = !this.hangOn
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --search-height: 160px;
}

.hang {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--zIndex6);
  width: 660px;
  height: 100%;
  background: #f0f0f0;
  transition: transform 0.5s;
  transform: translate3d(0, 0, 0);
}

.hang__off {
  transform: translate3d(-100%, 0, 0);
}

.hang--search {
  flex: 1 0 auto;
  width: 100%;
  height: var(--search-height);
  padding: 20px 40px;
}
.hang--result {
  width: 100%;
  flex: 1 auto;
  height: calc(100% - var(--search-height));
  background: #fff;
}

.hang--lump {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 100%;
  width: 26px;
  height: 50px;
  margin-top: -25px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: #fff;
  cursor: pointer;
  & > svg {
    width: 16px;
    height: 16px;
  }
}
</style>

