<template>
  <div class="verify-con">
    <h1 class="title">更换手机</h1>
    <div class="ver-remark">为了保证您的账号安全，当前操作需要验证注册手机号</div>
    <div class="ver-phone">{{phoneText}}</div>
    <ul>
      <li>
        <cool-link-input
          placeholder="请输入短信验证码"
          v-model="bindData.code"
          name="code"
          data-vv-as="验证码"
          v-validate="'required'"
          :error="coolLinkFieldErrors"
          key="login-code"
        >
          <template slot="suff">
            <sms-vcode :phone="info.mobileNumber" type="validateByMobAndCode"></sms-vcode>
          </template>
        </cool-link-input>
      </li>
    </ul>
    <cool-link-button
      class="button"
      :async-click="submit"
      text="提交验证"
      alias="验证"
      themes="primary block"
    ></cool-link-button>
  </div>
</template>

<script>
import SmsVcode from '@components/common/input/sms-vcode.vue'
import { dephone } from '@utils/desensitive'
import { mapGetters } from 'vuex'
import Dialog from '@components/common/dialog'
import AuthRebind from '@components/auth/rebind.vue'
import userApi from '@/api/user'

export default {
  name: 'Verify',
  components: {
    SmsVcode
  },
  data() {
    return {
      bindData: {
        code: ''
      }
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    }
  },

  computed: {
    phoneText() {
      return dephone(this.info.mobileNumber)
    },
    ...mapGetters({ info: 'getUser' })
  },

  methods: {
    async submit(done = () => {}) {
      let validResult = this.$validator.validate()
      if (validResult) {
        let { success } = await userApi.validateMobile(
          this.info.mobileNumber,
          this.bindData.code
        )
        if (success) {
          this.$emit('close')
          Dialog.open(AuthRebind)
        } else {
          Dialog.error('验证失败')
        }
      }

      done()
    }
  }
}
</script>

<style lang="less" scoped>
.verify-con {
  padding: 58px 64px 74px;
  // text-align: center;
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
      // height: 44px;
      background: rgba(246, 246, 246, 1);
      margin-bottom: 22px;
    }
  }
}
</style>

