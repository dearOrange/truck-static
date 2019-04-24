<template>
  <div class="password">
    <h1 class="password--title">修改密码</h1>
    <el-form class="password--form" :model="form" :rules="rules" ref="form" label-width="0">
      <div class="form-item">
        <span class="label">
          <sup>*</sup>旧密码
        </span>
        <el-form-item class="rt" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <span class="label">
          <sup>*</sup>新密码
        </span>
        <el-form-item class="rt" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <span class="label">
          <sup>*</sup>确认密码
        </span>
        <el-form-item class="rt" prop="cfPassword">
          <el-input type="password" v-model="form.cfPassword"></el-input>
        </el-form-item>
      </div>
      <div class="form-submit">
        <cool-link-button
          :async-click="submitForm"
          class="button psd-btn"
          themes="primary block"
          text="确认修改"
          alias="修改"
        ></cool-link-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/user'
import { cloneRoute } from '@utils'

import { mapActions } from 'vuex'
import { LOGOUT } from '@store/types'

export default {
  name: 'MyPassword',
  data() {
    let rPassword = /^(?!\d{8,16}$)[a-zA-z0-9]{8,16}$/
    var validateOldPass = (rule, value, done) => {
      if (!value) {
        return done(new Error('旧密码不能为空'))
      } else {
        done()
      }
    }
    var validatePass = (rule, value, done) => {
      if (value === '') {
        done(new Error('请输入密码'))
      } else {
        if (this.form.cfPassword !== '') {
          this.$refs.form.validateField('cfPassword')
        }
        if (rPassword.test(value)) {
          done()
        } else {
          done(new Error('请输入至少8位且含一个字母的密码'))
        }
      }
    }
    var validatePass2 = (rule, value, done) => {
      if (value === '') {
        done(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        done(new Error('两次输入密码不一致!'))
      } else {
        done()
      }
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        cfPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, validator: validateOldPass, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        cfPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      logout: LOGOUT
    }),
    async submitForm(done = () => {}) {
      let validResult = await this.$refs.form.validate().catch(bool => bool)
      if (validResult) {
        let { success: submitResult } = await userApi.updatePsd(this.form)
        if (submitResult) {
          let { success: logoutResult } = await this.logout()
          if (logoutResult) {
            this.$router.replace({
              name: 'authing',
              params: {
                to: cloneRoute(this.$route),
                text: '正在退出, 请重新登录'
              }
            })
          }
        }
      }
      done()
    }
  }
}
</script>

<style lang="postcss" scoped>
.password {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 100px;
  background: #fff;
}

.password--title {
  width: 100%;
  text-align: center;
}
.password--form {
  width: 60%;
}

.form-item {
  display: flex;
  align-items: center;
  & > .label {
    width: 100px;
    margin-right: 15px;
    text-align: right;
    & > sup {
      margin-right: 6px;
      color: red;
    }
  }
  & > .rt {
    flex: 1 auto;
    margin: 20px 0;
    &.gender {
      margin: 10px 0;
    }
  }
}

.form-submit {
  width: 200px;
  margin: 35px auto 0;
}
</style>

