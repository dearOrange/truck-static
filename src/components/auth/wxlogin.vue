<template>
  <div class="login--wx-qrcode" id="J-wxLogin">
    <div class="loading">正在加载中</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_USER_INFO } from '@store/types'

import AuthApi from '@api/auth'
import config from '@/config'

export default {
  name: 'AuthWxLogin',

  props: {
    onLoginComplete: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      wxToken: null,
      wxLoginTimeId: null
    }
  },

  methods: {
    ...mapActions({
      fetchAndSaveLoginUser: GET_USER_INFO
    }),
    async initWxLogin() {
      let { success, data: loginToken } = await AuthApi.qrcodeCheck()
      if (success) {
        this.wxToken = loginToken
        let state = Base64.encode(
          `${window.location.protocol}//${window.location.host}${
            config.server
          }/login/qrcodeCheck.do?loginToken=${loginToken}`
        )
        let wxLogin = new WxLogin({
          self_redirect: true,
          id: 'J-wxLogin',
          appid: 'wx5f50a28f55599417',
          scope: 'snsapi_login',
          redirect_uri: 'http://gcc.1hll.cn/weixinCallback.html',
          state: state,
          style: '',
          href: 'https://gcc.1hll.cn/css/weixin-login.css'
        })
      }
      this.schedule()
    },

    async checkWxLogin() {
      let loginToken = this.wxToken
      if (loginToken) {
        let {
          success: checkSuccess,
          data: { loginStatus, expandToken }
        } = await AuthApi.qrcodeCheck({ loginToken })
        if (checkSuccess) {
          // 扫码登录成功
          if (loginStatus == 2) {
            let { success: fetchSuccess } = await this.fetchAndSaveLoginUser()

            if (fetchSuccess) {
              this.stopSchedule()
              this.onLoginComplete(fetchSuccess)
            }
          }
          // 微信未绑定
          else if (loginStatus == 9) {
            this.stopSchedule()
            let unionid = JSON.parse(expandToken).unionid
            this.onLoginComplete(-1)
            this.goWxBind({ unionid })
          }
        }
      }
    },

    goWxBind(params) {
      this.$router.push({
        name: 'wxbind',
        params: params
      })
    },

    schedule() {
      this.wxLoginTimeId = setInterval(this.checkWxLogin, 2000)
    },

    stopSchedule() {
      this.wxLoginTimeId && clearInterval(this.wxLoginTimeId)
    }
  },

  mounted() {
    this.initWxLogin()
  },

  destroyed() {
    this.stopSchedule()
  }
}
</script>

<style lang="postcss" scoped>
.login--wx-qrcode {
  display: inline-block;
  width: 300px;
  height: 300px;
  margin-top: -10px;
  overflow: hidden;

  & > .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}
</style>