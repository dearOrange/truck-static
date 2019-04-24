<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="标题"
      prop="publishTitle"
      :rules="[{required: true, message: '请输入标题', trigger: 'blur'},
      { min: 0, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' }]"
    >
      <el-input class="title-input" v-model.trim="data.publishTitle" placeholder="字数（0-25）"></el-input>
    </el-form-item>
    <el-form-item label="仓库名称" prop="stockName">
      <el-input class="title-input" v-model.trim="data.stockName" placeholder="字数（0-25）"></el-input>
    </el-form-item>
    <!-- <el-form-item label="所属单位" prop="bizUnitId">
      <el-input class="title-input" v-model="data.bizUnitId"></el-input>
    </el-form-item>-->
    <div class="price--left">
      <el-form-item label="计价方式" class="item-con" prop="expectedPriceType">
        <div class="price-con">
          <div style="display:flex;align-items:center;margin:12px 0;">
            <el-radio-group v-model="data.expectedPriceType">
              <el-radio
                v-for="item in priceType"
                :key="item.definedCode"
                :label="item.definedCode"
              >{{item.definedName}}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="data.expectedPriceType === 'S'">
            <el-form-item
              v-for="(domain, index) in data.ptStockPriceList"
              :key="index"
              :prop="'ptStockPriceList.' + index + '.price'"
              :rules="data.expectedPriceType === 'N' ? rules.price : rules.area"
              class="item-div"
            >
              <!-- <el-radio
                v-if="domain.isDefault == 1"
                class="item-check"
                v-model="priceDefaultIndex"
                name="priceNum"
                :label="index"
              ></el-radio>-->
              <el-input
                :disabled="data.expectedPriceType === 'N' ? true : false"
                class="item-input"
                v-model.trim="domain.price"
              ></el-input>
              <el-form-item
                :prop="'ptStockPriceList.' + index + '.stockPriceUnit'"
                :rules="data.expectedPriceType === 'S' ? rules.stockPriceUnit : ''"
              >
                <el-select
                  class="item-input"
                  v-model="domain.stockPriceUnit"
                  :disabled="domain.isDefault == 1 || data.expectedPriceType === 'N' ? true : false"
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

              <svg
                v-if="domain.isDefault != 1"
                class="icon price--icon"
                aria-hidden="true"
                @click="clearRow(index, data.ptStockPriceList)"
              >
                <use v-bind:xlink:href="'#icon-shanchu'"></use>
              </svg>
            </el-form-item>
          </div>
        </div>
        <div class="addPrice" v-if="data.expectedPriceType === 'S'" @click="addDomain">添加计价方式</div>
      </el-form-item>
    </div>
    <el-form-item label="温层分级" prop="baStockDetailList">
      <el-table :data="data.baStockDetailList" border style="width: 100%">
        <el-table-column
          prop="stockType"
          :formatter="row => row.stockType"
          align="center"
          label="温层名称"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'baStockDetailList.'+ scope.$index + '.stockType'"
              :rules="rules.baStock"
              class="td--bot"
            >
              <el-select v-model="scope.row.stockType" placeholder="请选择">
                <el-option
                  v-for="(item, index) in temper"
                  :key="index"
                  :label="item.definedName"
                  :value="item.definedCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalArea"
          :formatter="row => row.totalArea"
          align="center"
          label="温层面积（㎡）"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'baStockDetailList.'+ scope.$index + '.totalArea'"
              :rules="rules.area"
              class="td--bot"
            >
              <el-input v-model.trim="scope.row.totalArea" @blur="totalArea"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="emptyArea"
          :formatter="row => row.emptyArea"
          align="center"
          label="可租面积（㎡）"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'baStockDetailList.'+ scope.$index + '.emptyArea'"
              :rules="rules.emptyAreaOne"
              class="td--bot"
            >
              <el-input v-model.trim="scope.row.emptyArea" @blur="addArea()"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="emptyCapacity"
          :formatter="row => row.emptyCapacity"
          align="center"
          label="可用容量（吨）"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'baStockDetailList.'+ scope.$index + '.emptyCapacity'"
              :rules="rules.area"
              class="td--bot"
            >
              <el-input v-model.trim="scope.row.emptyCapacity" @blur="addCapacity()"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, data.baStockDetailList)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span class="addTab" @click="addRow">添加温层类型</span>
    </el-form-item>
    <div class="rent-l">
      <el-form-item label="总面积" class="zhu-con" prop="totalArea">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.totalArea" readonly placeholder="请输入数值"></el-input>
          <em>㎡</em>
        </div>
      </el-form-item>
      <el-form-item label="总可租面积" class="zhu-con" prop="emptyArea">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.emptyArea" readonly placeholder="请输入数值"></el-input>
          <em>㎡</em>
        </div>
      </el-form-item>
    </div>
    <div class="rent-l">
      <!-- <el-form-item label="总容量" class="zhu-con" prop="totalCapacity">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.totalCapacity" placeholder="请输入数值"></el-input>
          <em>吨</em>
        </div>
      </el-form-item>-->
      <el-form-item label="总可用容量" class="zhu-con" prop="emptyCapacity">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.emptyCapacity" readonly placeholder="请输入数值"></el-input>
          <em>吨</em>
        </div>
      </el-form-item>
    </div>
    <div class="rent-l">
      <el-form-item label="温度下限" class="zhu-con" prop="temperatureLower">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.temperatureLower" placeholder="请输入数值"></el-input>
          <em>℃</em>
        </div>
      </el-form-item>
      <el-form-item label="温度上限" class="zhu-con" prop="temperatureUpper">
        <div class="zhu-kuan">
          <el-input v-model.trim="data.temperatureUpper" placeholder="请输入数值"></el-input>
          <em>℃</em>
        </div>
      </el-form-item>
    </div>
    <el-form-item label="适合品类" prop="suitableCategory">
      <el-checkbox-group v-model="data.suitcateVal" @change="changeSuit">
        <el-checkbox
          :label="item.definedCode"
          v-for="item in suitcate"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="所属楼层" class="zhu-con" prop="locatedFloor">
      <div class="zhu-kuan">
        <el-input v-model.trim="data.locatedFloor" placeholder="请输入数值"></el-input>
        <em>层</em>
      </div>
    </el-form-item>
    <el-form-item label="仓库层高" class="zhu-con" prop="floorHeight">
      <div class="zhu-kuan">
        <el-input v-model.trim="data.floorHeight" placeholder="请输入数值"></el-input>
        <em>m</em>
      </div>
    </el-form-item>
    <el-form-item
      label="消防等级"
      prop="fireGrade"
      :rules="{ required: true, message: '请选择消防等级', trigger: 'change' }"
    >
      <el-radio-group v-model="data.fireGrade">
        <el-radio
          v-for="item in firerating"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item
      label="建筑结构"
      prop="structureType"
      :rules="{ required: true, message: '请选择建筑结构', trigger: 'change' }"
    >
      <el-radio-group v-model="data.structureType">
        <el-radio
          v-for="item in structureType"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>-->
    <el-form-item label="地坪类型" prop="groundType">
      <el-radio-group v-model="data.groundType">
        <el-radio
          v-for="item in groundType"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="运营资质"
      prop="stockVal"
      :rules="{ type:'array', required: true, message: '请选择运营资质', trigger: 'change' }"
    >
      <el-checkbox-group v-model="data.stockVal" @change="changeCheck">
        <el-checkbox
          :label="item.definedCode"
          v-for="item in stockQual"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="unit-req" label="具体地址" prop="districtCode">
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
        <el-select v-model="data.cityCode" placeholder="请选择市区" @change="changeArea">
          <el-option
            v-for="item in cityName"
            :label="item.areaName"
            :value="item.areaId"
            :key="item.areaId"
          ></el-option>
        </el-select>
        <el-select v-model="data.districtCode" placeholder="请选择地区">
          <el-option
            v-for="item in districtName"
            :label="item.areaName"
            :value="item.areaId"
            :key="item.areaId"
          ></el-option>
        </el-select>
        <el-form-item prop="address">
          <el-input v-model="data.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <!-- </div> -->
      </div>
    </el-form-item>
    <!-- <el-form-item label="建筑年份" class="year-l" prop="buildDate">
      <el-date-picker
        v-model="data.buildDate"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </el-form-item>-->
  </el-form>
</template>

<script>
import {
  FireGrade,
  StockPriceUnit,
  StockType,
  GroundType,
  StructureType,
  SuitableCategory,
  StockQualification,
  ExpectedPriceType
} from '@/utils/dictionary'
import commonApi from '@/api/common'
import Dialog from '@components/common/dialog'
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
          this.data.baStockDetailList.forEach(function(item, index) {
            if (parseInt(item.emptyArea) > parseInt(item.totalArea)) {
              done(new Error('可租面积不能大于温层面积'))
            } else {
              done()
            }
          })
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
    var num3 = (rule, value, done) => {
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
      priceType: [],
      stockQual: [],
      suitcate: [],
      structureType: [],
      firerating: [],
      temper: [],
      units: [],
      groundType: [],
      priceDefaultIndex: 0,
      provinceName: [],
      cityName: [],
      districtName: [],
      numbers: 0,
      rules: {
        stockName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
          { min: 0, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' }
        ],
        temperatureUpper: [
          { required: true, validator: numRep, trigger: 'blur' }
        ],
        temperatureLower: [
          { required: true, validator: tempNum, trigger: 'blur' }
        ],
        baStockDetailList: [
          { required: true, message: '此项必填', trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: '请填写省份', trigger: 'change' }
        ],
        cityCode: [
          { required: true, message: '请填写市区', trigger: 'change' }
        ],
        districtCode: [
          { required: true, message: '请填写区域', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ],
        area: [{ required: true, validator: num3, trigger: 'blur' }],
        emptyAreaOne: [{ required: true, validator: num1, trigger: 'blur' }],
        price: [{ validator: num2, trigger: 'blur' }],
        baStock: [{ required: true, message: '请选择温层', trigger: 'change' }],
        // totalArea: [{ validator: num2, trigger: 'blur' }],
        // totalCapacity: [{ validator: num2, trigger: 'blur' }],
        locatedFloor: [{ validator: num2, trigger: 'blur' }],
        floorHeight: [{ validator: HeightNum, trigger: 'blur' }],
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
            message: '请选择价格单位',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    deleteRow(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1)
      } else {
        Dialog.error('温层最少1个')
      }
    },
    clearRow(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1)
      } else {
        Dialog.error('价格最少1个')
      }
    },
    addRow() {
      if (this.data.baStockDetailList.length < 5) {
        this.data.baStockDetailList.push({
          totalArea: '',
          emptyArea: '',
          emptyCapacity: '',
          stockType: []
        })
      } else {
        Dialog.error('温层最多5个')
      }
    },
    addDomain() {
      if (this.data.ptStockPriceList.length < 5) {
        this.data.ptStockPriceList.push({
          price: '',
          stockPriceUnit: '',
          isDefault: '0'
        })
      } else {
        Dialog.error('价格最多5个')
      }
    },
    changeCheck(val) {
      this.data.stockQualification = val.join(',')
    },
    changeSuit(val) {
      this.data.suitableCategory = val.join(',')
    },
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
      commonApi.getCitys(val).then(({ success, data }) => {
        if (success) {
          this.cityName = data
          if (this.data.cityCode) {
            this.changeArea(this.data.cityCode)
          }
        }
      })
    },
    changeArea(val) {
      commonApi.getDistricts(val).then(({ success, data }) => {
        if (success) {
          this.districtName = data
        }
      })
    },
    validForm() {
      // console.log(`共${this.$refs.ruleForm.fields.length}条 待验证字段`)
      let rst = this.$refs.ruleForm.validate()
      // console.log(rst)

      // this.$refs.ruleForm.fields.forEach(field => {
      //   console.log(`${field.prop} -> ${field.validateState}`)
      // })

      return rst
    },
    addCapacity() {
      let that = this
      that.data.emptyCapacity = 0
      that.data.totalCapacity = 0
      this.data.baStockDetailList.forEach(function(item, index) {
        that.data.emptyCapacity += parseInt(item.emptyCapacity)
        that.data.totalCapacity += parseInt(item.emptyCapacity)
      })
      this.$forceUpdate()
    },
    addArea() {
      let that = this
      that.data.emptyArea = 0
      this.data.baStockDetailList.forEach(function(item, index) {
        that.data.emptyArea += parseInt(item.emptyArea)
      })
      this.$forceUpdate()
    },
    totalArea() {
      let that = this
      that.data.totalArea = 0
      this.data.baStockDetailList.forEach(function(item, index) {
        that.data.totalArea += parseInt(item.totalArea)
      })
      this.$forceUpdate()
    }
  },

  watch: {
    priceDefaultIndex: {
      handler: function(newIndex, oldIndex) {
        this.data.ptStockPriceList.forEach(function(item, index) {
          item.isDefault = index === newIndex ? '1' : '0'
          item.stockPriceUnit = item.isDefault == 1 ? 'MM' : ''
        })
      },
      immediate: true
    }

    // 'data.expectedPriceType': {
    //   handler: function(newIndex, oldIndex) {
    //     this.data.stockPriceUnit = newIndex === 'S' ? 'MM' : ''
    //   },
    //   immediate: true
    // }
  },

  mounted() {
    //消防等级
    FireGrade().then(res => {
      this.firerating = res
    })
    //价格单位
    StockPriceUnit().then(res => {
      this.units = res
    })
    //仓库类型
    StockType().then(res => {
      this.temper = res
    })
    //地坪类型
    GroundType().then(res => {
      this.groundType = res
    })
    //建筑结构类型
    StructureType().then(res => {
      this.structureType = res
    })
    // 适合品类
    SuitableCategory().then(res => {
      this.suitcate = res
    })
    StockQualification().then(res => {
      this.stockQual = res
    })
    ExpectedPriceType().then(res => {
      this.priceType = res
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
    &:nth-of-type(2) {
      margin: 0 40px;
    }
    .el-select {
      width: 120px;
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
  em {
    margin-left: 7px;
  }
}
.zhu-kuan {
  width: 248px;
  height: 40px;
  display: flex;
}
.rent-l {
  display: flex;
  .zhu-con {
    flex: 1;
  }
}
.addTab {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-decoration: underline;
  color: rgba(0, 174, 102, 1);
  line-height: 14px;
  cursor: pointer;
}
.last-item .el-select:nth-of-type(2) {
  margin: 0 4px 0 10px !important;
}
.year-l {
  margin-top: 29px;
}
.price-con {
  // display: flex;
  // flex-wrap: wrap;
  // align-items: center;
}
.item-con {
  display: flex;
  div.item-div {
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .item-input {
    width: 98px;
    margin: 0 4px;
  }
}
.item-check {
  display: flex;
  align-items: center;
}
.addPrice {
  width: 90px;
  font-size: 14px;
  text-decoration: underline;
  color: rgba(0, 174, 102, 1);
  cursor: pointer;
}
.price--icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.td--bot {
  margin-bottom: 15px;
}
</style>
<style>
.el-input__inner {
  background-color: rgba(245, 245, 246, 1) !important;
}
.last-item .el-input {
  width: 394px !important;
}
.price-con .el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.price--left .el-form-item__content {
  margin-left: 0 !important;
}
</style>


