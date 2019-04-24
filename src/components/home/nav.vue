<template>
  <div class="home-nav">
    <div class="home-nav--rt">
      <div class="home-nav--oper">
        <a class="login" href="#">登录</a>
        <a href="#">立即注册</a>
      </div>
      <ul class="home-nav--list">
          <li>
            <a href="#" class="nav--link">首页</a>
          </li>
          <li>
            <a href="#" class="nav--link">仓库租赁</a>
          </li>
          <li>
            <a href="#" class="nav--link">货主找车</a>
          </li>
          <li>
            <a href="#" class="nav--link">司机找货</a>
          </li>
          <li>
            <a href="#" class="nav--link">房产地货源</a>
          </li>
          <li>
            <a href="#" class="nav--link">合作伙伴</a>
          </li>
          <li>
            <a href="#" class="nav--link">1号冷链 <span class="icon icon_zheng"></span> 冷链Sass平台</a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNav',
  data() {
    return {}
  }
}
</script>

<style lang="postcss" scoped>
.home-nav {
  display: flex;
  justify-content: space-between;
}

.home-nav--oper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 6px;
  & > a {
    display: inline-block;
    height: 16px;
    margin-left: 5px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    &.login {
      padding-left: 20px;
      background: url(/assets/img/personal.png) no-repeat 0 50%;
      background-size: auto 100%;
    }
  }
}

ul.home-nav--list {
  & li {
    display: inline-block;
    margin-left: 20px;
    &:first-child {
      margin-left: 0;
    }
  }
}
.nav--link {
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}
</style>

