<template>
  <div class="authing">{{text}}</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { UPDATE_AUTH_ROUTE, GET_USER_INFO } from '@store/types'
import { logger, cloneRoute } from '@utils'
import { AUTH_LEVEL, isStrictAuth } from '@utils/auth'

const log = logger.getLogger('authing')
let defaultRoute = { path: '/' }

export default {
  name: 'Authing',
  beforeRouteEnter(to, from, next) {
    let { to: authTo, text } = to.params
    let needSync = true // 根据路由参数to, 来判断是否需要重新获取用户信息
    next(vm => {
      if (!authTo) {
        needSync = false
        authTo = defaultRoute
      }
      vm.updateAuthRoute(authTo)
      if (text) {
        vm.$set(vm, 'text', text)
      }

      if (needSync) {
        vm.sync()
      } else {
        vm.go()
      }
    })
  },

  data() {
    return {
      text: '正在认证中, 请稍后...'
    }
  },

  computed: {
    ...mapGetters({
      authRoute: 'authRoute',
      isLogged: 'isLogged'
    })
  },

  methods: {
    ...mapMutations({
      updateAuthRoute: UPDATE_AUTH_ROUTE
    }),
    ...mapActions({
      getUserInfo: GET_USER_INFO
    }),

    async sync() {
      if (process.env.NODE_ENV === 'development') {
        performance.mark('GET_USER_INFO')
      }

      let { success } = await this.getUserInfo()

      if (process.env.NODE_ENV === 'development') {
        log.debug(
          `页面刷新, 读取用户信息, 耗时: ${
            performance.measure('GET_USER_INFO').duration
          }ms`
        )
        performance.clearMarks('GET_USER_INFO')
        performance.clearMeasures('GET_USER_INFO')
      }

      if (this.isLogged) {
        this.go()
      } else {
        let { level } = this.authRoute.matched[0].meta
        if (isStrictAuth(level)) {
          log.debug(`页面[${this.authRoute.path}]访问被限制`)
          this.go({ name: 'login' }, false)
        } else {
          this.go()
        }
      }
    },
    go(route = this.authRoute, clear = true) {
      if (clear) {
        this.updateAuthRoute(null)
      }
      this.$router.replace(route)
    }
  }
}
</script>

<style lang="postcss" scoped>
.authing {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>




