<template>
    <div>
        <dl class="user-pic">
            <cool-link-avatar/>
            <dt>
                <div class="user-name">发布人用户名</div>
                <div class="user-tag">
                    <p>
                        <i class="icon icon-right"></i>
                        <span>个人认证</span>
                    </p>
                    <p>
                        <i class="icon icon-right"></i>
                        <span>货源认证</span>
                    </p>
                </div>
            </dt>
        </dl>
        <div class="user-info">
            <ul>
                <li>
                    <p>10</p>
                    <p>所有发布</p>
                </li>
                <li>
                    <p>2018-11-08</p>
                    <p>注册时间</p>
                </li>
            </ul>
        </div>
        <div class="user-focus">
            <div class="focus-r">
              <cool-link-button prepend-icon="shoucang" themes="linear block" size="large">关注</cool-link-button>

                <!-- <div class="focus-tag">
                    <svg class="icon icon-shoucang" aria-hidden="true">
                    <use v-bind:xlink:href="'#icon-shoucang'"></use>
                    </svg>
                </div>
                <div class="focus-info">关注</div> -->
            </div>
            <div class="focus-r">
              <cool-link-button prepend-icon="dianhua1" themes="stuffed block" size="large">13556332668</cool-link-button>
                <!-- <div class="focus-tag">
                    <svg class="icon icon-dianhua1" aria-hidden="true">
                    <use v-bind:xlink:href="'#icon-dianhua1'"></use>
                    </svg>
                </div>
                <div class="focus-info">13556332668</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import AuthTag from '@components/rent/auth-tag.vue'
import TextTag from '@components/rent/text-tag.vue'

export default {
  name: 'Author',
  components: {
    AuthTag,
    TextTag
  }
}
</script>

<style lang="less" scoped>
.user-pic {
  padding-bottom: 29px;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: -o-center;
  dt {
    text-align: center;
    .user-name {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
      margin: 15px 0 18px;
    }
    .user-tag {
      display: flex;
      justify-content: space-around;
      padding: 0 110px;
      p:first-child {
        margin-right: 6px;
      }
      .icon-right {
        float: left;
        width: 20px;
        height: 20px;
        // border: 1px solid rgba(74, 74, 74, 1);
        border-radius: 50%;
        background: url(../../../assets/img/renzheng.png) no-repeat center
          center;
        background-size: cover;
        margin-right: 4px;
      }
      span {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #72ddff;
      }
    }
  }
}
.user-info > ul {
  display: flex;
  border-top: 1px solid rgba(233, 233, 233, 1);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
  li {
    flex: 1;
    text-align: center;
    padding: 20px 0 16px;
    &:first-of-type {
      border-right: 1px solid rgba(233, 233, 233, 1);
    }
    p:first-of-type {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p:last-of-type {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
.user-focus {
  text-align: center;
  padding: 42px 37px 0;
  .focus-r {
    margin: 12px 0;
  }
}
</style>
