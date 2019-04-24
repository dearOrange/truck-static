<template>
  <auth-box>
    <template slot="title">
      <auth-title :title="'您好，欢迎登录1号冷链'"/>
    </template>

    <template slot="inputs">
      <div class="login--switch">
        <a
          :class="{
                active: isAccountLogin
              }"
          @click="changeType('account')"
        >账号密码登录</a>
        <span class="sep"></span>
        <a
          :class="{
                active: isPhoneLogin
              }"
          @click="changeType('phone')"
        >手机快捷登录</a>
      </div>
      <cool-link-whitespace :size="20"></cool-link-whitespace>
      <div class="login--inputs">
        <form>
          <ul>
            <li v-if="isAccountLogin">
              <cool-link-input
                v-model="accountLoginData.userAccount"
                name="username"
                data-vv-as="账号"
                v-validate="'required'"
                :error="coolLinkFieldErrors"
                :placeholder="'请输入您的账号/手机号'"
                key="login-account"
              ></cool-link-input>
              <cool-link-whitespace size="15"></cool-link-whitespace>
            </li>
            <li v-else>
              <cool-link-input
                v-model="phoneLoginData.mobileNumber"
                name="username"
                data-vv-as="手机号"
                v-validate="'required|is-phone'"
                :placeholder="'请输入您的手机号'"
                :error="coolLinkFieldErrors"
                key="login-phone"
              ></cool-link-input>
              <cool-link-whitespace size="15"></cool-link-whitespace>
            </li>
            <li v-if="isPhoneLogin">
              <cool-link-input
                v-model="phoneLoginData.code"
                name="code"
                placeholder="请输入短信验证码"
                data-vv-as="验证码"
                v-validate="'required'"
                :error="coolLinkFieldErrors"
                key="login-code"
              >
                <template slot="suff">
                  <sms-vcode :phone="phoneLoginData.mobileNumber" type="validateByMobile"></sms-vcode>
                </template>
              </cool-link-input>
            </li>
            <li v-if="isAccountLogin">
              <cool-link-password
                v-model="accountLoginData.userPassword"
                name="userPassword"
                type="password"
                data-vv-as="密码"
                v-validate="'required'"
                :error="coolLinkFieldErrors"
                key="login-password"
              ></cool-link-password>
            </li>
          </ul>
        </form>
      </div>
      <cool-link-whitespace size="30"></cool-link-whitespace>
      <cool-link-button
        class="login--submit"
        themes="primary block round"
        :async-click="submit"
        :text="'登录'"
      ></cool-link-button>
      <div class="login--regist">
        <a class="forget">
          <router-link v-if="isPageMode" :to="{name: 'forget'}" tag="span">忘记密码？</router-link>
          <span v-else v-forget>忘记密码？</span>
        </a>
        <span>
          还没有账号？
          <a>
            <router-link v-if="isPageMode" :to="{name: 'register'}" tag="span">注册</router-link>
            <span v-else v-register>注册</span>
          </a>
        </span>
      </div>
    </template>

    <template slot="right">
      <auth-wxlogin :on-login-complete="onLoginComplete"></auth-wxlogin>
    </template>
  </auth-box>
</template>

<script>
import AuthTitle from '@components/auth/title.vue'
import AuthBox from '@components/auth/box.vue'
import AuthWxlogin from '@components/auth/wxlogin.vue'

import ImageVcode from '@components/common/input/image-vcode.vue'
import SmsVcode from '@components/common/input/sms-vcode.vue'

import { mapActions } from 'vuex'
import { LOGIN } from '@store/types'

let Base64 = require('js-base64').Base64

export default {
  name: 'Login',
  components: {
    AuthBox,
    AuthTitle,
    AuthWxlogin,
    ImageVcode,
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
      type: 'account',

      accountLoginData: {
        userAccount: '',
        userPassword: ''
      },
      phoneLoginData: {
        mobileNumber: '',
        code: ''
      }
    }
  },
  computed: {
    isPhoneLogin() {
      return this.type === 'phone'
    },
    isAccountLogin() {
      return this.type === 'account'
    },

    isPageMode() {
      return this.mode === 'page'
    },

    loginData() {
      return this.isPhoneLogin ? this.phoneLoginData : this.accountLoginData
    }
  },
  methods: {
    ...mapActions({
      login: LOGIN
    }),
    changeType(type) {
      this.type = type
    },

    onLoginComplete(success) {
      this.$emit('completed', success)
    },

    async submit(done = () => {}) {
      let validResult = await this.$validator.validate()
      if (validResult) {
        let { success } = await this.login({
          ...this.loginData,
          type: this.type
        })
        this.onLoginComplete(success)
      }
      done()
    },
  },
}
</script>

<style lang="postcss" scoped>
@import 'auth.postcss';

.login--switch {
  display: flex;
  justify-content: center;
  align-items: center;
  & > a {
    font-size: 18px;
    color: var(--siteTextColor);
    cursor: pointer;
    &.active {
      color: var(--siteColor);
    }
  }

  & > .sep {
    width: 2px;
    height: 18px;
    margin: 0 15px;
    background: #949494;
  }
}
.login--remember {
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  & .forget {
    font-size: 14px;
    line-height: 14px;
    color: rgba(51, 144, 197, 1);
  }
}

.login--regist {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: var(--siteTextLightColor);
  margin-top: 6px;
  & a {
    color: var(--siteLinkColor);
    cursor: pointer;
  }
}
</style>




