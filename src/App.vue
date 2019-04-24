<template>
  <div id="app">
    <router-view/>
    <cool-link-slider/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="postcss">
@import 'normalize.css';
* {
  box-sizing: border-box;
}

body {
  font-family: 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

p {
  margin: 0;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
dl,
dd {
  margin: 0;
}

em {
  font-style: normal;
}
input {
  outline: none;
}

a {
  color: var(--siteTextColor);
}
#app {
  height: 100%;
}
.mid-layout {
  width: var(--siteWidth);
  margin: 0 auto;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
em,
strong {
  font-style: normal;
  font-weight: normal;
}
/* 去除百度地图左下角logo和文字 */
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(240, 240, 240, 1);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(196, 196, 196, 1);
  /* border-radius: 10px; */
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(196, 196, 196, 1);
  background-color: rgba(196, 196, 196, 1);
}
</style>
