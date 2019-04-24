<template>
  <div class="feedback">
    <h2>意见反馈</h2>
    <p>您对1号冷链有任何意见和建议，或使用中遇到的问题，
      <br>请在本页面填写您的反馈，我们将为您不断改进。
    </p>
    <cool-link-whitespace size="23"></cool-link-whitespace>
    <textarea class="textarea" name id cols="30" rows="10" placeholder="请输入反馈..."></textarea>
    <cool-link-whitespace size="15"></cool-link-whitespace>
    <cool-link-input
      class="phone--inp"
      v-model="mobileNumber"
      name="username"
      data-vv-as="手机号"
      v-validate="'required|is-phone'"
      :placeholder="'请输入您的手机号'"
      :error="coolLinkFieldErrors"
      key="login-phone"
    ></cool-link-input>
    <cool-link-whitespace size="38"></cool-link-whitespace>
    <div class="submit--btn">
      <cool-link-button class="login--submit" :async-click="cancel" :text="'取消'"></cool-link-button>
      <cool-link-button class="login--submit" themes="primary" :async-click="submit" :text="'确定'"></cool-link-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data() {
    return {
      mobileNumber: ''
    }
  },
  methods: {
    async submit(done = () => {}) {
      let validResult = await this.$validator.validate()
      if (validResult) {
      }
      done()
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.feedback {
  padding: 30px 67px 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .textarea {
    padding: 10px;
    width: 400px;
    height: 144px;
    resize: none;
    outline: none;
    text-indent: 2em;
    border: 1px solid #d1d1d1;
  }
  .phone--inp {
    width: 100%;
  }
  .submit--btn {
    display: flex;
    width: 80%;
    justify-content: space-between;
    .login--submit {
      width: 130px;
      height: 40px;
    }
  }
}
</style>

