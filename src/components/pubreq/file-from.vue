<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="标题" prop="demandTitle">
      <el-input class="title-input" v-model.trim="data.demandTitle" placeholder="字数（0-25）"></el-input>
    </el-form-item>
    <el-form-item class="unit-req" label="面积需求" prop="stockType">
      <div class="unit-req">
        <div>
          <el-form-item prop="stockType">
            <el-select v-model="data.stockType" placeholder="请选择">
              <el-option
                v-for="item in stockType"
                :label="item.definedName"
                :value="item.definedCode"
                :key="item.definedCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="demandArea">
            <el-input v-model.trim="data.demandArea" placeholder="请输入数值"></el-input>
          </el-form-item>
          <em>㎡</em>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="温度需求" class="zhu-con" prop="temperatureUpper">
      <div class="zhu-kuan">
        <el-form-item prop="temperatureLower">
          <el-input style="width:120px;" v-model.trim="data.temperatureLower" placeholder="请输入数值"></el-input>
        </el-form-item>
        <span style="margin:0 4px;">-</span>
        <el-input style="width:120px;" v-model.trim="data.temperatureUpper" placeholder="请输入数值"></el-input>
        <em>℃</em>
      </div>
    </el-form-item>
    <!-- <el-form-item label="主通道宽度" class="zhu-con" prop="mainRoadWidth">
      <div class="zhu-kuan">
        <el-input v-model.trim="data.mainRoadWidth" placeholder="请输入数值"></el-input>
        <em>m</em>
      </div>
    </el-form-item>-->
    <el-form-item label="仓库层高" class="zhu-con" prop="floorHeight">
      <div class="zhu-kuan">
        <el-input v-model.trim="data.floorHeight" placeholder="请输入数值"></el-input>
        <em>m</em>
      </div>
    </el-form-item>
    <!-- <el-form-item label="建筑结构" prop="structureType">
      <el-radio-group v-model="data.structureType">
        <el-radio
          v-for="item in typeVal"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>-->
    <el-form-item class="unit-req" label="需求地址" prop="cityCode">
      <div class="last-item">
        <!-- <div> -->
        <el-select v-model="data.provinceCode" placeholder="请选择省份" @change="changeCity">
          <el-option
            v-for="item in provinceName"
            :label="item.areaName"
            :value="item.areaId"
            :key="item.areaId"
          ></el-option>
        </el-select>
        <el-select v-model="data.cityCode" placeholder="请选择市区">
          <el-option
            v-for="item in cityName"
            :label="item.areaName"
            :value="item.areaId"
            :key="item.areaId"
          ></el-option>
        </el-select>
        <!-- </div> -->
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { StockType, StructureType } from '@/utils/dictionary'
import commonApi from '@/api/common'
export default {
  name: 'Filefrom',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    let vnumber = /^([1-9][\d]{0,8})$/
    let shu = /^-?[0-9]\d*$/
    let Height = /^(([1-9]\d+)|[1-9])(\.\d{1,2})?$/
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
          done(new Error('请填写数字'))
        } else {
          done()
        }
      }
    }
    var HeightNum = (rule, value, done) => {
      if (!value) {
        done()
      } else {
        if (!Height.test(value)) {
          done(new Error('请填写正确格式的数字'))
        } else {
          done()
        }
      }
    }
    var tempNum = (rule, value, done) => {
      value = value.toString()
      if (!value) {
        done(new Error('请填写数字'))
      } else {
        if (!shu.test(value)) {
          done(new Error('请填写正确格式的数字'))
        } else {
          if (!this.data.temperatureUpper) {
            done()
          } else {
            if (parseInt(value) <= parseInt(this.data.temperatureUpper)) {
              done()
            } else {
              done(new Error('填写的值不能大于最大的值'))
            }
          }
        }
      }
    }

    var numRep = (rule, value, done) => {
      value = value.toString()
      if (!value) {
        done(new Error('请填写数字'))
      } else {
        if (!shu.test(value)) {
          done(new Error('请填写正确格式的数字'))
        } else {
          if (!this.data.temperatureLower) {
            done()
          } else {
            if (parseInt(value) >= parseInt(this.data.temperatureLower)) {
              done()
            } else {
              done(new Error('填写的值不能小于最小的值'))
            }
          }
        }
      }
    }
    return {
      stockType: [],
      typeVal: [],
      region: [],
      provinceName: [],
      cityName: [],
      rules: {
        demandTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' }
        ],
        structureType: [
          {
            required: true,
            message: '请选择建筑结构',
            trigger: 'change'
          }
        ],
        temperatureUpper: [
          { required: true, validator: numRep, trigger: 'blur' }
        ],
        temperatureLower: [
          { required: true, validator: tempNum, trigger: 'blur' }
        ],
        stockType: [
          {
            required: true,
            message: '请选择仓库类型',
            trigger: 'change'
          }
        ],
        demandArea: [
          {
            required: true,
            validator: num1,
            trigger: 'blur'
          }
        ],
        mainRoadWidth: [
          {
            validator: num2,
            trigger: 'blur'
          }
        ],
        floorHeight: [
          {
            validator: HeightNum,
            trigger: 'blur'
          }
        ],
        cityCode: [
          {
            required: true,
            message: '请选择区域',
            trigger: 'change'
          }
        ]
      }
    }
  },
  watch: {
    'this.data.provinceCode': function(val) {
      this.changeCity(val)
    }
  },
  methods: {
    getProvince() {
      //获取省份
      commonApi.getProvinces().then(({ success, data }) => {
        if (success) {
          this.provinceName = data
          if (this.data.provinceCode) {
            this.changeCity(this.data.provinceCode)
          }
        }
      })
    },
    changeCity(val) {
      // this.ruleForm.cityCode = ''
      commonApi.getCitys(val).then(({ success, data }) => {
        if (success) {
          this.cityName = data
        }
      })
    },
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  mounted() {
    StockType().then(res => {
      this.stockType = res
    })
    StructureType().then(res => {
      this.typeVal = res
    })
    this.getProvince()
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

    .el-select {
      width: 120px;
      height: 40px;
      margin-right: 7px;
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
  width: 274px;
  height: 40px;
  display: flex;
  em {
    margin-left: 7px;
  }
}
.require--flex {
  display: flex;
  .el-form-item__content {
    width: 126px;
    height: 40px;
    margin: 0 7px 0 4px;
  }
  .el-input {
    width: 126px;
    height: 40px;
    margin: 0 7px 0 4px;
  }
}
</style>
<style>
.el-input__inner {
  background-color: rgba(245, 245, 246, 1) !important;
}
.last-item .el-select:nth-of-type(2) {
  margin: 0 !important;
}
.last-item .el-input {
  width: 394px !important;
}
</style>


