<template>
  <div class="sms-vcode">
    <a @click="start">{{text}}</a>
  </div>
</template>
<script>
import { isPhone } from '@utils/is'
import AuthApi from '@api/auth'
import Dialog from '@components/common/dialog'

export default {
  name: 'SmsVCode',
  props: {
    total: {
      type: Number,
      default: 60
    },
    phone: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: this.total,
      isBegin: false
    }
  },
  computed: {
    text() {
      return this.isBegin ? `${this.count}秒后重新发送` : '获取验证码'
    }
  },

  methods: {
    start() {
      if (!this.isBegin && this.valid()) {
        this.begin()
        this.send()
      }
    },
    valid() {
      if (this.phone === '') {
        console.log('请输入手机号')
        return false
      }
      if (!isPhone(this.phone)) {
        console.log('手机号格式不正确')
        return false
      }
      return true
    },
    begin() {
      this.isBegin = true
      let self = this
      function countdown() {
        window.setTimeout(() => {
          self.count -= 1
          if (self.count === 0) {
            self.end()
            return
          }
          countdown()
        }, 1000)
      }
      countdown()
    },
    end() {
      this.isBegin = false
      this.count = this.total
    },

    async send() {
      let { success, msg: message } = await AuthApi.sendVCode(
        this.phone,
        this.type
      )
      if (!success) {
        Dialog.error(message || '发送失败')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.sms-vcode {
  display: flex;
  align-items: center;
  position: absolute;
  right: 15px;
  top: 0;
  height: 100%;
  & a {
    cursor: pointer;
  }
}
</style>

