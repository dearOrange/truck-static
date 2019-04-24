<template>
  <div class="verify-con">
    <h1 class="title">更换手机</h1>
    <div class="ver-remark">为了保证您的账号安全，当前操作需要验证注册手机号</div>
    <div class="ver-phone">{{phoneText}}</div>
    <ul>
      <li>
        <cool-link-input placeholder="请输入短信验证码">
          <template slot="suff">
            <sms-vcode :phone="phone" type="replaceMobile"></sms-vcode>
          </template>
        </cool-link-input>
      </li>
    </ul>
    <cool-link-button class="button" @click="onSubmit" themes="primary block">提交验证</cool-link-button>
  </div>
</template>

<script>
import SmsVcode from '@components/common/input/sms-vcode.vue'
import { dephone } from '@utils/desensitive'

export default {
  name: 'Verify',
  components: {
    SmsVcode
  },

  props: {
    phone: {
      type: String,
      default: ''
    }
  },

  computed: {
    phoneText() {
      return dephone(this.phone)
    }
  },

  methods: {
    onSubmit() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.verify-con {
  padding: 58px 64px 74px;
  text-align: center;
  background: #fff;
  .title {
    margin: 0 0 15px;
  }
  .ver-remark {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 14px;
    margin: 29px 0 49px;
  }
  .ver-phone {
    font-size: 18px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    line-height: 18px;
    text-align: left;
  }
  ul {
    margin: 20px 0 25px;
    li {
      width: 100%;
      height: 44px;
      background: rgba(246, 246, 246, 1);
      margin-bottom: 22px;
    }
  }
}
</style>

