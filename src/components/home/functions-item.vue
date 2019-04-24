<template>
  <router-link :to="dataItem.routeName" tag="div" class="functions-item">
    <img class="functions-item--pic" :src="dataItem.pic" alt="图片">
    <span class="functions-item--subtext">{{dataItem.subtext}}</span>
    <span class="functions-item--suptext">{{dataItem.suptext}}</span>
  </router-link>
</template>

<script>
export default {
  name: 'FunctionsItem',
  props: {
    dataItem: Object
  }
}
</script>

<style lang="postcss" scoped>
.functions-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.functions-item--pic {
  width: 81px;
  height: 77px;
}
.functions-item--subtext {
  margin: 14px 0 8px;
  font-size: 22px;
  color: #232323;
}
.functions-item--suptext {
  font-size: 12px;
  color: #b7b7b7;
}
</style>


