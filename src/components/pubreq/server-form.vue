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
      label="可分割"
      prop="splitable"
      :rules="{
            required: true,
            message: '请选择是否可分割',
            trigger: 'change'
          }"
    >
      <el-radio-group v-model="data.splitable">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="月台类型"
      prop="platformType"
      :rules="{
            required: true,
            message: '请选择月台类型',
            trigger: 'change'
          }"
    >
      <el-radio-group v-model="data.platformType">
        <el-radio
          v-for="item in platType"
          :key="item.definedCode"
          :label="item.definedCode"
        >{{item.definedName}}</el-radio>
      </el-radio-group>
    </el-form-item>
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
          v-for="item in type"
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
    <el-form-item
      label="软件系统"
      prop="systemVal"
      :rules="{
            type: 'array',
            required: true,
            message: '请选择软件系统',
            trigger: 'change'
          }"
    >
      <el-checkbox-group v-model="data.systemVal" @change="changeSystem">
        <template v-for="item in systemTypeList">
          <el-checkbox :label="item.definedCode" :key="item.definedCode">{{item.definedName}}</el-checkbox>
        </template>

        <!-- <el-checkbox
          :label="item.definedCode"
          v-for="item in systemType"
          :key="item.definedCode"
        >{{item.definedName}}</el-checkbox>-->
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="上传照片" class="zhu-con">
      <div>注：上限为五张, 默认第一张为封面图</div>
      <div class>
        <el-upload
          :action="uploadAction"
          list-type="picture-card"
          :file-list="data.imgUrl"
          :on-success="handlePictureCardPreview"
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
      </div>
    </el-form-item>
    <el-form-item label="仓库优势" class="zhu-con" prop="advantage">
      <div>
        <el-input type="textarea" v-model.trim="data.advantage"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="合作案例" class="zhu-con" prop="cooperationCase">
      <div>
        <el-input type="textarea" v-model.trim="data.cooperationCase"></el-input>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  SupportFacility,
  SupportService,
  PlatformType,
  ServiceMode,
  ExistingSystem
} from '@/utils/dictionary'
import config from '@/config'
import Dialog from '@components/common/dialog'
import { remove } from 'lodash'
export default {
  name: 'Serverform',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      platType: [],
      supportType: [],
      type: [],
      modeType: [],
      systemType: [],
      rules: {},
      uploadAction: `${config.server}/example/upload.do`,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },

  computed: {
    systemTypeList() {
      let oList = this.systemType
      let nList = oList

      let systemType = this.data.systemVal

      if (systemType.includes('N')) {
        nList = oList.filter(item => item.definedCode === 'N')
      } else if (systemType && systemType.length && !systemType.includes('N')) {
        nList = oList.filter(item => item.definedCode !== 'N')
      }

      return nList
    }
  },

  methods: {
    handleRemove(file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.scenePhoto = photoArr.join(',')
    },
    handlePictureCardPreview(response, file, fileList) {
      let photoArr = fileList.map(ele => {
        return ele.response ? ele.response.data.ukid : ele.uid
      })
      this.data.scenePhoto = photoArr.join(',')
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
    changeSystem(val) {
      this.data.existingSystem = val.join(',')
    },
    validForm() {
      return this.$refs.ruleForm.validate()
    }
  },
  watch: {},
  mounted() {
    //配套设施
    SupportFacility().then(res => {
      this.supportType = res
    })
    SupportService().then(res => {
      this.type = res
    })

    PlatformType().then(res => {
      this.platType = res
    })

    ServiceMode().then(res => {
      this.modeType = res
    })
    ExistingSystem().then(res => {
      this.systemType = res
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
  height: 120px !important;
}
</style>


