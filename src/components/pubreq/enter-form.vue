<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="计划入驻" prop="planEnterDate">
      <el-date-picker
        v-model="data.planEnterDate"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions0"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="计划租期" prop="planRentPeriod">
      <el-radio-group v-model="data.planRentPeriod">
        <el-radio
          v-for="item in planRentType"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="期望价格" class="zhu-con" prop="expectedPriceType">
      <div class="want-p">
        <el-radio-group v-model="data.expectedPriceType">
          <el-radio
            v-for="item in priceType"
            :key="item.definedCode"
            :label="item.definedCode"
          >{{item.definedName}}</el-radio>
        </el-radio-group>
        <div class="bargain--p">
          <el-form-item prop="expectedPriceBegin">
            <el-input
              class="inp--num"
              v-model.trim="data.expectedPriceBegin"
              :disabled="isDisabled"
              placeholder="请输入数值"
            ></el-input>
          </el-form-item>
          <span>—</span>
          <el-form-item prop="expectedPriceEnd">
            <el-input
              class="inp--num"
              v-model.trim="data.expectedPriceEnd"
              :disabled="isDisabled"
              placeholder="请输入数值"
            ></el-input>
          </el-form-item>
          <el-form-item prop="stockPriceUnit">
            <el-select
              class="item-input"
              v-model="data.stockPriceUnit"
              :disabled="isDisabled"
              placeholder="请选择"
            >
              <el-option
                v-for="item in units"
                :key="item.definedCode"
                :label="item.definedName"
                :value="item.definedCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  ExpectedPriceType,
  PlanRentPeriod,
  StockPriceUnit
} from '@/utils/dictionary'
export default {
  name: 'Enterform',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    let vnumber = /^([1-9][\d]{0,8})$/
    var num1 = (rule, value, done) => {
      if (this.data.expectedPriceType === 'S') {
        if (!value) {
          done(new Error('请填写数字'))
        } else {
          if (!vnumber.test(value)) {
            done(new Error('请填写正确格式的数字'))
          } else {
            done()
          }
        }
      } else {
        done()
      }
    }

    var numRep = (rule, value, done) => {
      if (this.data.expectedPriceType === 'S') {
        if (!value) {
          done(new Error('请填写数字'))
        } else {
          if (!vnumber.test(value)) {
            done(new Error('请填写正确格式的数字'))
          } else {
            if (parseInt(value) > parseInt(this.data.expectedPriceBegin)) {
              done()
            } else {
              done(new Error('填写的值不能小于最小的值'))
            }
          }
        }
      } else {
        done()
      }
    }

    var priceS = (rule, value, done) => {
      if (this.data.expectedPriceType === 'S') {
        if (!value) {
          done(new Error('请选择价格单位'))
        } else {
          done()
        }
      } else {
        done()
      }
    }
    return {
      priceType: [],
      planRentType: [],
      units: [],
      isDisabled: true,
      rules: {
        planEnterDate: [
          {
            type: 'string',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],

        planRentPeriod: [
          {
            required: true,
            message: '请选择计划租期',
            trigger: 'change'
          }
        ],
        plandate: [
          {
            required: true,
            message: '请选择租期',
            trigger: 'change'
          }
        ],
        expectedPriceBegin: [
          {
            required: true,
            validator: num1,
            trigger: 'blur'
          }
        ],
        expectedPriceEnd: [
          {
            required: true,
            validator: numRep,
            trigger: 'blur'
          }
        ],
        expectedPriceType: [
          {
            required: true,
            message: '请选择价格方式',
            trigger: 'change'
          }
        ],
        stockPriceUnit: [
          {
            required: true,
            validator: priceS,
            trigger: 'change'
          }
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e6 //如果没有后面的-8.64e6就是可以选择今天的
        }
      }
    }
  },
  watch: {
    'data.expectedPriceType': function(newVal, oldVal) {
      this.isDisabled = newVal === 'S' ? false : true
      if (newVal === 'N') {
        this.data.expectedPriceBegin = ''
        this.data.expectedPriceEnd = ''
        this.data.stockPriceUnit = ''
      }
    }
  },
  methods: {
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  mounted() {
    ExpectedPriceType().then(res => {
      this.priceType = res
    })
    PlanRentPeriod().then(res => {
      this.planRentType = res
    })
    //价格单位
    StockPriceUnit().then(res => {
      this.units = res
    })
  }
}
</script>

<style lang="less" scoped>
.zhu-con {
  margin-top: 24px;
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
.want-p {
  display: flex;
  align-items: center;
}
.want-p .el-input {
  width: 114px !important;
  margin: 0 7px;
}
.bargain--p {
  display: flex;
}
</style>


