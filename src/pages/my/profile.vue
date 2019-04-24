<template>
  <div class="profile">
    <h1 class="profile--title">我的资料</h1>

    <el-form class="profile--form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
      <div class="form-item">
        <span class="label">用户名</span>
        <el-form-item class="rt" prop="userName">
          <el-input type="text" v-model="ruleForm.userName"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <span class="label">上传头像</span>
        <div class="rt upload-avatar">
          <cool-link-avatar :url="avatarUrl"></cool-link-avatar>
          <el-upload
            class="upload-btn"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <cool-link-button themes="linear">上传头像</cool-link-button>
          </el-upload>
        </div>
      </div>
      <div class="form-item">
        <span class="label">微信号</span>
        <el-form-item class="rt" prop="wechat">
          <el-input type="text" v-model="ruleForm.wechat"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <span class="label">QQ号码</span>
        <el-form-item class="rt" prop="qq">
          <el-input type="text" v-model="ruleForm.qq"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <span class="label">性别</span>
        <el-form-item class="rt gender" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="F">男</el-radio>
            <el-radio label="M">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- <div class="form-item" v-if="hasPhone">
        <span class="label">我的手机</span>
        <div class="rt telphone">
          <span class="num">{{phoneText}}</span>
          <cool-link-button themes="linear" size="small" @click="changeNumber">更换号码</cool-link-button>
        </div>
      </div>-->
      <div class="form-submit">
        <cool-link-button
          @click="submitForm('ruleForm')"
          class="button psd-btn"
          themes="primary block"
        >确认提交</cool-link-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { assign } from 'lodash'

import Dialog from '@components/common/dialog'
// import Verify from '@components/my/profile/verify.vue'
import config from '@/config'
import userApi from '@/api/user'
import { UPDATE_USER } from '@/store/types'
import { dephone } from '@utils/desensitive'

export default {
  name: 'MyProflie',
  data() {
    let QQ = /^[1-9]*[1-9][0-9]*$/
    let WeChat = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
    var validateQQ = (rule, value, done) => {
      if (!value) {
        done()
      } else {
        if (QQ.test(value)) {
          done()
        } else {
          done(new Error('请填写正确的QQ号'))
        }
      }
    }
    var validateWeChat = (rule, value, done) => {
      if (!value) {
        done()
      } else {
        if (WeChat.test(value)) {
          done()
        } else {
          done(new Error('请填写正确的微信号'))
        }
      }
    }
    return {
      ruleForm: {
        userId: '',
        userName: '',
        wechat: '',
        qq: '',
        sex: '',
        profilePhoto: ''
      },
      rules: {
        qq: [{ validator: validateQQ, trigger: 'blur' }],
        wechat: [{ validator: validateWeChat, trigger: 'blur' }]
      },
      uploadAction: `${config.server}/example/upload.do`,
      avatarUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      userId: 'getUserId',
      user: 'getUser'
    }),

    hasPhone() {
      return !!this.user.mobileNumber
    },

    phoneText() {
      return dephone(this.user.mobileNumber)
    }
  },

  watch: {
    user: {
      handler(newUser) {
        this.ruleForm = assign(this.ruleForm, newUser)
        this.avatarUrl = newUser.photoUrl
      },
      immediate: true
    }
  },

  methods: {
    ...mapMutations({
      updateUser: UPDATE_USER
    }),
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.modifyForm()
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess({ code, data }) {
      if (code === '0') {
        this.avatarUrl = data.url
        this.ruleForm.profilePhoto = data.ukid
      }
    },
    modifyForm() {
      userApi.updateUser(this.ruleForm).then(({ success, data }) => {
        if (success) {
          this.updateUser(data)
          Dialog.success('修改成功')
        } else {
          Dialog.error('修改失败')
        }
      })
    }
  }
}
</script>


<style lang="postcss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 100px;
  background: #fff;
}

.profile--title {
  width: 100%;
  text-align: center;
}
.profile--form {
  width: 60%;
}

.form-item {
  display: flex;
  align-items: center;
  & > .label {
    width: 100px;
    margin-right: 15px;
    text-align: right;
  }
  & > .rt {
    flex: 1 auto;
    margin: 20px 0;
    &.gender {
      margin: 10px 0;
    }
  }
}

.upload-avatar {
  display: flex;
  align-items: center;
}
.upload-btn {
  margin-left: 15px;
}

.telphone {
  display: flex;
  align-items: center;
  & .num {
    margin-right: 15px;
  }
}

.form-submit {
  width: 200px;
  margin: 35px auto 0;
}
</style>



