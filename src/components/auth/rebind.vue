<template>
  <auth-box>
    <template slot="title">
      <auth-title :title="'更换手机号码'" :need-logo="true"/>
    </template>
    <template slot="inputs">
      <form>
        <cool-link-password
          v-model="rebindData.password"
          name="password"
          data-vv-as="密码"
          v-validate="'required|is-password'"
          :error="coolLinkFieldErrors"
          ref="password"
        ></cool-link-password>
        <cool-link-whitespace :size="15"></cool-link-whitespace>
        <cool-link-input
          v-model="rebindData.mobileNumber"
          placeholder="请输入您的手机号"
          name="mobileNumber"
          data-vv-as="手机号"
          v-validate="'required|is-phone'"
          :error="coolLinkFieldErrors"
        ></cool-link-input>
        <cool-link-whitespace :size="15"></cool-link-whitespace>
        <cool-link-input
          v-model="rebindData.code"
          placeholder="请输入短信验证码"
          name="code"
          data-vv-as="验证码"
          v-validate="'required'"
          :error="coolLinkFieldErrors"
        >
          <template slot="suff">
            <sms-vcode :phone="rebindData.mobileNumber" type="replaceMobile"></sms-vcode>
          </template>
        </cool-link-input>

        <cool-link-whitespace :size="15"></cool-link-whitespace>
        <cool-link-whitespace size="30"></cool-link-whitespace>
        <cool-link-button
          class="rebind--submit"
          :async-click="submit"
          text="立即绑定"
          themes="primary block"
        ></cool-link-button>
      </form>
    </template>
  </auth-box>
</template>

<script>
import SmsVcode from '@components/common/input/sms-vcode.vue'
import AuthTitle from '@components/auth/title.vue'
import AuthBox from '@components/auth/box.vue'
import userApi from '@/api/user'
import { mapGetters, mapMutations } from 'vuex'
import { UPDATE_USER } from '@/store/types'
import Dialog from '@components/common/dialog'
export default {
  name: 'Rebind',
  components: {
    SmsVcode,
    AuthTitle,
    AuthBox
  },

  data() {
    return {
      rebindData: {
        mobileNumber: '',
        code: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapMutations({
      updataUser: UPDATE_USER
    }),

    async submit(done = () => {}) {
      let validResult = this.$validator.validate()

      if (validResult) {
        let { success } = userApi.replaceMobile(this.rebindData)
        if (success) {
          this.updateUser({
            mobileNumber: rebindData.mobileNumber
          })
          Dialog.success('解绑成功')
          this.$emit('completed', success)
        } else {
          Dialog.error('解绑失败')
        }
      }
      done()
    }
  }
}
</script>


