<template>
  <ul class="nav" :class="themeClass">
    <li>
      <router-link
        active-class="nav--link__active"
        :to="{name: 'home'}"
        tag="a"
        class="nav--link"
      >首页</router-link>
    </li>
    <li>
      <router-link
        active-class="nav--link__active"
        :to="{name: 'depot-list'}"
        tag="a"
        class="nav--link"
      >找冷库</router-link>
    </li>
    <li>
      <router-link
        active-class="nav--link__active"
        :to="{name: 'rent-list'}"
        tag="a"
        class="nav--link"
      >冷库求租</router-link>
    </li>
    <!-- <li>
      <router-link
        active-class="nav--link__active"
        :to="{name: 'map-truck'}"
        tag="a"
        class="nav--link"
      >找车</router-link>
    </li>
    <li>
      <a href="#" class="nav--link">货源求车</a>
    </li>
    <li>
      <a href="#" class="nav--link">仓配服务</a>
    </li>
    <li>
      <a href="#" class="nav--link">认证评级</a>
    </li>-->
    <li>
      <a href="#" class="nav--link">信息发布</a>
      <div class="nav--submenu">
        <i class="arrow"></i>
        <router-link :to="{name: 'pubreq'}" tag="a">冷库求租</router-link>
        <router-link :to="{name: 'pubinfo'}" tag="a">冷库出租</router-link>
        <!-- <a>货源求车</a>
        <a>线路发布</a>-->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    theme: {
      type: String,
      default: 'bright',
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    }
  },
  computed: {
    themeClass() {
      let theme = this.theme

      return {
        [`nav__${theme}`]: true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
ul.nav {
  & > li {
    position: relative;
    height: 100%;
    & > a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 15px;
      font-size: 16px;
    }
    &:hover {
      & > .nav--submenu {
        display: block;
      }
    }
  }
}
.nav--link {
  text-decoration: none;
  color: #fff;
  &.nav--link__active {
    color: var(--siteColor);
  }
}

.nav--submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  width: 120px;
  padding: 10px 0;
  border: 1px solid rgba(0, 0, 0, 0.14);
  margin-left: calc(@width / -2);
  white-space: nowrap;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.14);
  & > a {
    display: block;
    margin: 12px 0;
    cursor: pointer;
    text-align: center;
    color: var(--siteTextColor);
    font-size: 14px;
    text-decoration: none;
    &:hover {
      color: var(--siteColor);
    }
  }
  & .arrow {
    position: absolute;
    left: 50%;
    bottom: 100%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px;
    border-color: transparent transparent rgba(0, 0, 0, 0.14) transparent;
    margin-left: -8px;
    &:before {
      position: absolute;
      left: 50%;
      bottom: -8px;
      width: 0;
      height: 0;
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 7px 7px;
      border-color: transparent transparent #fff transparent;
      margin-left: -7px;
    }
  }
}

.nav__bright {
  & .nav--link {
    color: #000;
    &.nav--link__active {
      color: var(--siteColor);
    }
  }
}

.header__primary {
  & .nav--link {
    &.nav--link__active {
      color: #fff;
    }
  }
}
</style>



