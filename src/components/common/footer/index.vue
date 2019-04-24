<template>
  <div
    class="footer"
    :style="{
      'background-image': 'url(' + require('@/assets/img/footer-bg.jpg')  + ')'
    }"
  >
    <div class="footer-wrap mid-layout">
      <ul class="footer--inner-links">
        <li>
          <a href="javascript:void(0);">关于1号冷链</a>
        </li>
        <li>
          <a href="javascript:void(0);">招商加盟</a>
        </li>
        <li @click="goProcotol">
          <a href="javascript:void(0);">隐私声明</a>
        </li>
        <li @click="goProcotol">
          <a href="javascript:void(0);">法律声明</a>
        </li>
        <!-- <li>
          <a href="#">公司地址</a>
        </li>-->
        <li @click="feedback">
          <a href="javascript:void(0);">意见反馈</a>
        </li>
        <li>
          <a href="javascript:void(0);">联系我们</a>
          <div class="nav--submenu">
            <i class="arrow"></i>
            <a href="javascript:void(0);">公司地址</a>
            <a href="javascript:void(0);">招贤纳士</a>
          </div>
        </li>
        <!-- <li>
          <a href="#">招贤纳士</a>
        </li>-->
      </ul>
      <div class="footer--line"></div>
      <div class="footer--copyright">
        <p>版权所有 © 北京酷领科信息技术有限公司 2016-2020 保留一切权利 京ICP备17022226号-2</p>
        <p></p>
      </div>
      <dl class="footer--outer-links">
        <dt>友情链接：</dt>
        <dd>
          <ul>
            <!-- <li>
              <a href="http://www.1hll.cn" target="_blank">1号冷链</a>
            </li>-->
            <li>
              <a href="http://www.cawd.org.cn/" target="_blank">中国仓储与配送协会</a>
            </li>
            <li>
              <a href="http://www.caaa.cn/" target="_blank">中国畜牧业协会</a>
            </li>
            <li>
              <a href="http://www.china-fruit.com.cn/" target="_blank">中国果品流通协会</a>
            </li>
            <li>
              <a href="http://www.cava.org.cn/" target="_blank">中国蔬菜流通协会</a>
            </li>
            <li>
              <a href="http://www.acfic.org.cn/" target="_blank">中华全国工商业联合会</a>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import Dialog from '@components/common/dialog'
import FeedBack from './feedback'
export default {
  name: 'Footer',
  methods: {
    goProcotol() {
      const { href } = this.$router.resolve({ name: 'procotol' })
      window.open(href, '_blank', 'toolbar=yes')
    },
    feedback() {
      Dialog.open(FeedBack)
    }
  }
}
</script>

<style lang="postcss" scoped>
/*  */

.footer {
  width: 100%;
  padding: 45px 0;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.footer--inner-links {
  display: flex;
  & > li {
    margin-right: 20px;
    position: relative;
    & > a {
      color: #fff;
    }
    &:hover {
      & > .nav--submenu {
        display: block;
      }
    }
  }
}
.footer--line {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background: rgba(57, 57, 57, 1);
}

.footer--copyright {
  margin: 30px 0;
  & > p {
    margin-top: 10px;
    color: rgba(182, 182, 182, 1);
    &:first-child {
      margin-top: 0;
    }
  }
}

.footer--outer-links {
  line-height: 1.5;
  color: rgba(182, 182, 182, 1);
  & > dt {
    float: left;
    width: 5em;
  }
  & > dd {
    margin-left: 5em;
  }
  & ul {
    display: flex;
    flex-wrap: wrap;
    & > li {
      margin-right: 10px;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      & > a {
        color: rgba(182, 182, 182, 1);
        text-decoration: none;
      }
    }
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
</style>
