<template>
  <div class="feedback">
    <div class="title">免费咨询</div>
    <div class="tip">留下您的手机号，我们将尽快联系您</div>
    <el-input
      name="username"
      class="input"
      v-validate="'required|is-phone'"
      v-model="contactMobile"
      placeholder="请输入您的手机号码"
    ></el-input>
    <cool-link-button @click="doClick" class="button" themes="primary block">提交</cool-link-button>
  </div>
</template>

<script>
import { sleep } from '@utils'
import depotApi from '@/api/depot'
export default {
  name: 'Feedback',

  data() {
    return {
      contactMobile: ''
    }
  },

  methods: {
    async doClick() {
      // TODO 后台请求
      let data = {
        relatedDataType: 'SL',
        relatedDataUkid: this.$route.params.id,
        contactType: 'T',
        contactMobile: this.contactMobile
      }

      //SL仓库出租/SR仓库求租/TL车出租/TR求车
      //C 咨询  F 反馈 M 预约查看 T 回电
      let validResult = await this.$validator.validate()
      if (validResult) {
        depotApi.addIntention(data).then(({ success }) => {
          this.$emit('close', success)
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  width: 380px;
  padding: 70px 100px;
  background: #fff;
  & .title {
    font-size: 24px;
  }

  & .tip {
    margin: 40px 0 20px;
    font-size: 18px;
  }

  & .button {
    margin-top: 20px;
  }
}
</style>


