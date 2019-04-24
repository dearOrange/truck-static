<template>
  <div class="auth" :class="themeClass">
    <template v-if="!isLogged">
      <a class="login-btn" v-auth>登录</a>
      <a class="regist-btn" v-register>注册</a>
    </template>
    <template v-else>
      <svg class="icon header--icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-gerenzhongxin'"></use>
      </svg>
      <router-link :to="{name: 'my-home'}" tag="a">{{ name }}</router-link>
      <a class="logout-btn" @click="logout">退出</a>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneRoute } from '@utils'
import Dialog from '@components/common/dialog'

import { LOGOUT } from '@store/types'
export default {
  name: 'Auth',
  props: {
    theme: {
      type: String,
      default: 'bright',
      validator: function(value) {
        return ['dark', 'bright', 'primary'].includes(value)
      }
    }
  },

  data() {
    return {
      iconClicked: false
    }
  },

  computed: {
    ...mapGetters({
      isLogged: 'isLogged',
      name: 'getName'
    }),
    themeClass() {
      let theme = this.theme

      return {
        [`auth__${theme}`]: true
      }
    }
  },

  methods: {
    ...mapActions({
      dologout: LOGOUT
    }),

    logout() {
      Dialog.confirm('请确认是否要退出登录?', {
        confirm: {
          ok: async () => {
            let { success } = await this.dologout()
            this.$router.replace({
              name: 'authing',
              params: {
                to: cloneRoute(this.$route),
                text: '正在退出, 请稍后...'
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.auth {
  & > a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    color: var(--siteTextColor);
    &.search {
      & > svg {
        &.search-icon {
          width: 20px;
          height: 20px;
        }
        &.close-icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}

.auth__dark,
.auth__bright {
  & .regist-btn {
    background: var(--siteColor);
    color: #fff;
  }
}

.auth__dark,
.auth__primary {
  & > a {
    color: #fff;
  }
  & > .header--icon {
    fill: #fff;
  }
}
.header--icon {
  width: 26px;
  height: 26px;
}
</style>


