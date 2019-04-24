<template>
  <auth-box>
    <template slot="title">
      <auth-title :title="'您好，欢迎注册1号冷链'"/>
    </template>
    <template slot="inputs">
      <ul>
        <li>
          <cool-link-input
            v-model="registerData.mobileNumber"
            placeholder="请输入您的手机号"
            name="mobileNumber"
            data-vv-as="手机号"
            v-validate="'required|is-phone'"
            :error="coolLinkFieldErrors"
          ></cool-link-input>
          <cool-link-whitespace size="15"></cool-link-whitespace>
        </li>
        <li>
          <cool-link-input
            v-model="registerData.code"
            placeholder="请输入短信验证码"
            name="code"
            data-vv-as="验证码"
            v-validate="'required'"
            :error="coolLinkFieldErrors"
          >
            <template slot="suff">
              <sms-vcode :phone="registerData.mobileNumber" type="registered"></sms-vcode>
            </template>
          </cool-link-input>
          <cool-link-whitespace size="15"></cool-link-whitespace>
        </li>
        <li>
          <cool-link-password
            v-model="registerData.password"
            type="password"
            name="password"
            data-vv-as="密码"
            v-validate="'required|is-password'"
            :error="coolLinkFieldErrors"
            ref="password"
          ></cool-link-password>
          <cool-link-whitespace size="15"></cool-link-whitespace>
        </li>
        <li>
          <cool-link-password
            v-model="registerData.cfPassword"
            type="password"
            placeholder="请输入确认密码"
            name="cfPassword"
            data-vv-as="确认密码"
            v-validate="'required|is-password|confirmed:password'"
            :error="coolLinkFieldErrors"
            ref="cfPassword"
          ></cool-link-password>
        </li>
      </ul>
      <cool-link-whitespace size="30"></cool-link-whitespace>
      <div class="protocol">
        <el-checkbox v-model="checked">注册即代表同意</el-checkbox>
        <span class="procotol--link" @click="goProcotol">《1号冷链平台服务协议》</span>
      </div>
      <cool-link-whitespace size="10"></cool-link-whitespace>
      <cool-link-button
        class="register--submit"
        themes="primary block round"
        :async-click="submit"
        text="注册"
      ></cool-link-button>
      <div class="register--regist">
        已有账号？
        <a>
          <router-link v-if="isPageMode" :to="{name: 'login'}" tag="span">登录</router-link>
          <span v-else v-auth>登录</span>
        </a>
      </div>
    </template>
  </auth-box>
</template>

<script>
import AuthTitle from '@components/auth/title.vue'
import AuthBox from '@components/auth/box.vue'

// import ImageVcode from '@components/common/input/image-vcode.vue'
import SmsVcode from '@components/common/input/sms-vcode.vue'
import { cloneRoute } from '@utils'
import AuthApi from '@api/auth'

export default {
  name: 'Register',
  components: {
    AuthBox,
    AuthTitle,
    SmsVcode
  },
  props: {
    mode: {
      type: String,
      default: 'dialog',
      validator: function(value) {
        return ['dialog', 'page'].includes(value)
      }
    }
  },
  data() {
    return {
      registerData: {
        mobileNumber: '',
        code: '',
        password: '',
        cfPassword: ''
      },
      checked: true
    }
  },
  computed: {
    isPageMode() {
      return this.mode === 'page'
    }
  },
  methods: {
    async submit(done = () => {}) {
      let validResult = await this.$validator.validate()
      if (validResult && this.checked) {
        let { success } = await AuthApi.regist(this.registerData)
        this.$emit('completed', success)
        if (success) {
          this.$router.replace({
            name: 'authing',
            params: {
              to: this.isPageMode ? { name: 'home' } : cloneRoute(this.$route),
              text: '正在登录, 请等待...'
            }
          })
        }
      }
      done()
    },
    goProcotol() {
      this.$emit('close')
      const { href } = this.$router.resolve({ name: 'procotol' })
      window.open(href, '_blank', 'toolbar=yes')
    }
  }
}
</script>

<style lang="postcss" scoped>
@import 'auth.postcss';
.register--remember {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 10px;
  overflow: hidden;

  & .forget {
    font-size: 14px;
    line-height: 14px;
    color: rgba(51, 144, 197, 1);
  }
}

.register--regist {
  width: 100%;
  color: var(--siteTextLightColor);
  line-height: 14px;
  text-align: right;
  margin-top: 6px;
  & > a {
    color: var(--siteLinkColor);
    cursor: pointer;
  }
}
.protocol {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(102, 102, 102, 1);
  & > .procotol--link {
    color: #00ae66;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
