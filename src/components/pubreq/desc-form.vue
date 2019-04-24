<template>
  <el-form
    label-position="left"
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="商品类型" prop="productCategoryName">
      <el-input class="title-input" v-model.trim="data.productCategoryName" placeholder="字数（0-25）"></el-input>
    </el-form-item>
    <!-- <el-form-item label="商品名称" prop="productName">
      <el-input class="title-input" v-model="data.productName" placeholder="字数（0-25）"></el-input>
    </el-form-item>-->
    <!-- <el-form-item label="商品数量" prop="productNumber">
      <el-input class="title-input" v-model.trim="data.productNumber" placeholder="数量+单位"></el-input>
    </el-form-item>-->
    <el-form-item
      label="配套设施"
      prop="supportVal"
      :rules="{
            type: 'array',
            required: true,
            message: '请选择配套设施',
            trigger: 'change'
          }"
    >
      <el-checkbox-group v-model="data.supportVal" @change="changeCheck">
        <el-checkbox
          :label="item.definedCode"
          v-for="item in supportType"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="配套服务"
      prop="typeVal"
      :rules="{
            type: 'array',
            required: true,
            message: '请选择配套服务',
            trigger: 'change'
          }"
    >
      <el-checkbox-group v-model="data.typeVal" @change="changeType">
        <el-checkbox
          :label="item.definedCode"
          v-for="item in serviceType"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="服务模式"
      prop="modeVal"
      :rules="{
            type: 'array',
            required: true,
            message: '请选择服务模式',
            trigger: 'change'
          }"
    >
      <el-checkbox-group v-model="data.modeVal" @change="changeMode">
        <el-checkbox
          :label="item.definedCode"
          v-for="item in modeType"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="上传照片" class="zhu-con">
      <div>注：上限为五张, 默认第一张为封面图</div>
      <div class>
        <el-upload
          :action="uploadAction"
          list-type="picture-card"
          :file-list="data.imgUrl"
          :on-success="handlePictureCardSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="handleError"
          :before-upload="beforeAvatarUpload"
          :limit="5"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="图片">
        </el-dialog>
        <!-- <img :src="avatarUrl" alt="图片"> -->
      </div>
    </el-form-item>
    <el-form-item label="其他说明" class="zhu-con" prop="otherDesc">
      <div>
        <el-input type="textarea" v-model.trim="data.otherDesc"></el-input>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  SupportFacility,
  SupportService,
  ServiceMode,
  ExistingSystem
} from '@/utils/dictionary'
import config from '@/config'
import Dialog from '@components/common/dialog'
export default {
  name: 'Descform',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      supportType: [],
      serviceType: [],
      modeType: [],
      uploadAction: `${config.server}/example/upload.do`,
      dialogVisible: false,
      dialogImageUrl: '',
      rules: {
        productCategoryName: [
          { required: true, message: '请输入商品类型', trigger: 'blur' },
          { min: 0, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' }
        ],
        // productName: [
        //   { required: true, message: '请输入商品名称', trigger: 'blur' },
        //   { min: 0, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' }
        // ],
        productNumber: [
          {
            required: true,
            message: '请输入商品数量',
            trigger: 'blur'
          }
          // { min: 0, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.productPhoto = photoArr.join(',')
    },
    handlePictureCardSuccess(response, file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.productPhoto = photoArr.join(',')
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleError({ code, message }) {
      if (code === '0') {
        Dialog.success('上传成功')
      } else {
        Dialog.success(message)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (isJPG || isPNG) {
        return
      } else {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      return isJPG || isPNG
    },
    changeCheck(val) {
      this.data.supportFacility = val.join(',')
    },
    changeType(val) {
      this.data.supportService = val.join(',')
    },
    changeMode(val) {
      this.data.serviceMode = val.join(',')
    },
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  mounted() {
    //配套设施
    SupportFacility().then(res => {
      this.supportType = res
    })
    SupportService().then(res => {
      this.serviceType = res
    })
    ServiceMode().then(res => {
      this.modeType = res
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
.zhu-con .el-textarea .el-textarea__inner {
  height: 172px !important;
}
</style>


