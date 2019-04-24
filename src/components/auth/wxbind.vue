<template>
  <auth-box>
    <template slot="title">
      <auth-title :title="'微信绑定'" :need-logo="false"/>
    </template>
    <template slot="inputs">
      <ul>
        <li>
          <cool-link-input
            v-model="wxbindData.mobileNumber"
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
            v-model="wxbindData.code"
            placeholder="请输入短信验证码"
            name="code"
            data-vv-as="验证码"
            v-validate="'required'"
            :error="coolLinkFieldErrors"
          >
            <template slot="suff">
              <sms-vcode :phone="wxbindData.mobileNumber" type="bindingWechat"></sms-vcode>
            </template>
          </cool-link-input>
          <cool-link-whitespace size="15"></cool-link-whitespace>
        </li>
      </ul>
      <cool-link-button
        class="wxbind--submit"
        themes="primary block round"
        :async-click="submit"
        text="绑定"
      ></cool-link-button>
    </template>
  </auth-box>
</template>

<script>
import AuthTitle from '@components/auth/title.vue'
import AuthBox from '@components/auth/box.vue'

// import ImageVcode from '@components/common/input/image-vcode.vue'
import Dialog from '@components/common/dialog'
import SmsVcode from '@components/common/input/sms-vcode.vue'
import { cloneRoute } from '@utils'
import AuthApi from '@api/auth'

import { mapActions } from 'vuex'
import { GET_USER_INFO } from '@store/types'

export default {
  name: 'Wxbind',
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
      wxbindData: {
        mobileNumber: '',
        code: ''
      }
    }
  },
  computed: {
    isPageMode() {
      return this.mode === 'page'
    }
  },
  methods: {
    ...mapActions({
      fetchAndSaveLoginUser: GET_USER_INFO
    }),
    async submit(done = () => {}) {
      let validResult = await this.$validator.validate()
      if (validResult) {
        let { success: bindSuccess } = await AuthApi.bindWx(this.wxbindData)
        if (bindSuccess) {
          let { success: fetchSuccess } = await this.fetchAndSaveLoginUser()

          if (fetchSuccess) {
            Dialog.success('绑定成功')
            this.$emit('completed', true)
          } else {
            Dialog.error('用户信息无效')
          }
        } else {
          Dialog.error('绑定失败')
        }
      }

      done()
    }
  },

  mounted() {
    let { unionid } = this.$route.params || {}
    this.wxbindData.unionid = unionid
  }
}
</script>

<style lang="postcss" scoped>
@import 'auth.postcss';
.wxbind--remember {
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

.wxbind--regist {
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
</style>
