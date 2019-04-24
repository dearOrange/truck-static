<template>
  <div class="reserve">
    <div class="title">免费预约看库</div>

    <el-form class="reserve--form" ref="form" :rules="rules" :model="reserveData" label-width="5em">
      <el-form-item label="姓名" prop="contactName">
        <el-input v-model="reserveData.contactName" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="reserveData.gender">
          <el-radio label="1">先生</el-radio>
          <el-radio label="2">女士</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机" prop="contactMobile">
        <el-input v-model="reserveData.contactMobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="contactTel">
        <el-input v-model="reserveData.contactTel" placeholder="请输入您的电话"></el-input>
      </el-form-item>
      <el-form-item label="客户意向" prop="contactContent">
        <el-input
          type="textarea"
          rows="4"
          v-model="reserveData.contactContent"
          placeholder="例：看库人数，时间，要求"
        ></el-input>
      </el-form-item>
      <cool-link-button class="reserve--button" @click="doClick" themes="primary block">提交</cool-link-button>
    </el-form>
  </div>
</template>

<script>
import { sleep } from '@utils'
import depotApi from '@/api/depot'

export default {
  name: 'Reserve',

  data() {
    let vphone = /^1[3|4|5|6|7|8][0-9]{9}$/
    var isPhone = (rule, value, done) => {
      if (!value) {
        done(new Error('请填写手机号码'))
      } else if (!vphone.test(value)) {
        done(new Error('请填写正确的手机号码'))
      } else {
        done()
      }
    }
    var isTel = (rule, value, done) => {
      if (!value) {
        done()
      } else {
        if (!vphone.test(value)) {
          done(new Error('请填写正确的手机号码'))
        } else {
          done()
        }
      }
    }
    return {
      reserveData: {
        gender: '1'
      },
      rules: {
        contactName: [
          {
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        contactMobile: [
          { required: true, validator: isPhone, trigger: 'blur' }
        ],
        contactTel: [{ validator: isTel, trigger: 'blur' }],
        contactContent: [
          {
            required: true,
            message: '请填写意向',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    async doClick() {
      this.reserveData.relatedDataType = 'SL'
      //SL仓库出租/SR仓库求租/TL车出租/TR求车
      this.reserveData.relatedDataUkid = this.$route.params.id
      this.reserveData.contactType = 'M'
      this.$refs.form.validate(valid => {
        if (valid) {
          depotApi.addIntention(this.reserveData).then(({ success }) => {
            this.$emit('close', success)
          })
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.reserve {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  padding: 60px 100px 40px;
  background: #fff;
  & .title {
    font-size: 24px;
    margin-bottom: 50px;
  }
}

.reserve--form {
  width: 400px;
}
.reserve--button {
  margin-top: 50px;
}
</style>

<style lang="postcss">
.reserve--form .el-form-item__label {
  width: 6em !important;
}
.reserve--form .el-form-item__content {
  margin-left: 6em !important;
}
</style>



