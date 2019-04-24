<template>
  <div class="err404">
    <p class="err404-bg">
      <img src="../assets/img/404.jpg" alt="404错误">
    </p>
    <p class="err404-title">找不到页面</p>
    <p class="err404-desc">非常抱歉，您访问的页面可能已经删除，更名或暂时不可用。</p>
    <router-link :to="{name: 'home'}" tag="p" class="err404-back">返回首页</router-link>
    <!-- <p>
      <router-link :to="{name: 'login'}" tag="a">登录</router-link>
      <cool-link-whitespace direction="horizontal" size="15"></cool-link-whitespace>
      <router-link :to="{name: 'register'}" tag="a">注册</router-link>
    </p>-->
  </div>
</template>

<script>
let original
export default {
  name: 'Loading'
}
</script>

<style lang="postcss" scoped>
.err404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.err404-title {
  font-size: 30px;
  color: rgba(51, 51, 51, 1);
}
.err404-desc {
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
}
.err404-back {
  width: 200px;
  height: 50px;
  border: 1px solid rgba(0, 174, 102, 1);
  font-size: 18px;
  color: rgba(0, 174, 102, 1);
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  margin-top: 24px;
}
</style>




