<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm person-form"
  >
    <el-form-item label="起租期" prop="minRentMonths">
      <el-input class="title-input" v-model.trim="data.minRentMonths"></el-input>
      <span>月</span>
    </el-form-item>
    <el-form-item label="起租面积" prop="minRentArea">
      <el-input class="title-input" v-model.trim="data.minRentArea"></el-input>
      <span>㎡</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Personform',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    let vnumber = /^([1-9][\d]{0,8})$/
    var num1 = (rule, value, done) => {
      if (!value) {
        done(new Error('请填写数字'))
      } else {
        if (!vnumber.test(value)) {
          done(new Error('请填写正确格式的数字'))
        } else {
          done()
        }
      }
    }
    var num2 = (rule, value, done) => {
      if (!value) {
        done()
      } else {
        if (!vnumber.test(value)) {
          done(new Error('请填写正确格式的数字'))
        } else {
          done()
        }
      }
    }
    return {
      rules: {
        minRentMonths: [
          {
            required: true,
            validator: num1,
            trigger: 'blur'
          }
        ],
        minRentArea: [
          {
            validator: num2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.title-input {
  width: 610px !important;
  height: 40px !important;
}
span {
  margin-left: 7px;
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


