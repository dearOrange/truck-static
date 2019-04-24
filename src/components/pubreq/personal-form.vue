<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm person-form"
  >
    <el-form-item label="联系人" prop="contactName">
      <el-input class="title-input" v-model.trim="data.contactName"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="data.gender" placeholder="请选择">
        <el-option
          v-for="item in sex"
          :label="item.definedName"
          :value="item.definedCode"
          :key="item.definedCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系手机" prop="contactMobile">
      <el-input class="title-input" v-model.trim="data.contactMobile"></el-input>
    </el-form-item>
    <el-form-item label="固定电话" prop="contactTel">
      <el-input class="title-input" v-model.trim="data.contactTel"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { Gender } from '@/utils/dictionary'
export default {
  name: 'Personform',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    var isPhone = (rule, value, done) => {
      let vphone = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        done(new Error('请填写手机号码'))
      } else if (!vphone.test(value)) {
        done(new Error('请填写正确的手机号码'))
      } else {
        done()
      }
    }
    var isTel = (rule, value, done) => {
      let vphone = /^1[3|4|5|6|7|8][0-9]{9}$/
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
      sex: [],
      value: [],
      rules: {
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, validator: isPhone, trigger: 'blur' }
        ],
        contactTel: [{ validator: isTel, trigger: 'blur' }]
      }
    }
  },
  methods: {
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  mounted() {
    Gender().then(res => {
      this.sex = res
    })
  }
}
</script>

<style lang="less" scoped>
.title-input {
  width: 610px !important;
  height: 40px !important;
}
.unit-req {
  display: contents;
  div {
    display: flex;
    &:nth-of-type(2) {
      margin: 0 40px;
    }
    .el-select {
      width: 98px;
      height: 40px;
    }
    .el-input {
      width: 126px;
      height: 40px;
      margin: 0 7px 0 4px;
    }
  }
}
.zhu-con {
  margin-top: 24px;
}
.zhu-kuan {
  width: 248px;
  height: 40px;
  display: flex;
}
</style>
<style>
.el-input__inner {
  background-color: rgba(245, 245, 246, 1) !important;
}
.last-item .el-select:nth-of-type(2) {
  margin: 0;
}
.last-item .el-input {
  width: 394px !important;
}
.want-p .el-input {
  width: 114px !important;
}
.person-form .el-input,
.person-form .el-select {
  width: 252px !important;
}
</style>


