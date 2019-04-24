<template>
  <auth-box>
    <template slot="title">
      <auth-title :title="'找回密码'"/>
    </template>
    <template slot="inputs">
      <ul>
        <li>
          <cool-link-input
            v-model="forgetData.mobileNumber"
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
            v-model="forgetData.code"
            placeholder="请输入短信验证码"
            name="code"
            data-vv-as="验证码"
            v-validate="'required'"
            :error="coolLinkFieldErrors"
          >
            <template slot="suff">
              <sms-vcode :phone="forgetData.mobileNumber" type="retrievePass"></sms-vcode>
            </template>
          </cool-link-input>
          <cool-link-whitespace size="15"></cool-link-whitespace>
        </li>
        <li>
          <cool-link-password
            v-model="forgetData.password"
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
            v-model="forgetData.cfPassword"
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
      <cool-link-button
        class="forget--submit"
        themes="primary block round"
        :async-click="submit"
        text="修改密码"
        alias="修改"
      ></cool-link-button>
    </template>
  </auth-box>
</template>

<script>
import AuthTitle from '@components/auth/title.vue'
import AuthBox from '@components/auth/box.vue'

// import ImageVcode from '@components/common/input/image-vcode.vue'
import SmsVcode from '@components/common/input/sms-vcode.vue'
import AuthApi from '@api/auth'

export default {
  name: 'Register',
  components: {
    AuthTitle,
    AuthBox,
    // ImageVcode,
    SmsVcode
  },
  data() {
    return {
      forgetData: {
        mobileNumber: '',
        code: '',
        password: '',
        cfPassword: ''
      }
    }
  },
  methods: {
    async submit(done = () => {}) {
      let validResult = await this.$validator.validate()
      if (validResult) {
        let { success } = await AuthApi.retrieve(this.forgetData)
        this.$emit('completed', success)
      }
      done()
    }
  }
}
</script>

