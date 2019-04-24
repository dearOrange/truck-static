/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import { createStore } from '@/store'

import { isRefreshPage, logger, cloneRoute } from '@utils'
import { AUTH_LEVEL, isNotAuth, isNotStrictAuth } from '@utils/auth'
let log = logger.getLogger('router')

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "home" */
        '@pages/home')
    },
    {
      path: '/login',
      name: 'login',
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "auth" */
        '@pages/login')
    },
    {
      path: '/wxbind/:unionid',
      name: 'wxbind',
      props: true,
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "auth" */
        '@pages/wxbind')
    },
    {
      path: '/register',
      name: 'register',
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "auth" */
        '@pages/register')
    },
    {
      path: '/forget',
      name: 'forget',
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "auth" */
        '@pages/forget')
    },
    {
      path: '/depot/list',
      name: 'depot-list',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "depot-list" */
        '@pages/depot/list')
    },
    {
      path: '/depot/map',
      name: 'depot-map',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "depot-map" */
        '@pages/depot/map')
    },
    {
      path: '/depot/:id',
      name: 'depot-detail',
      meta: { level: AUTH_LEVEL.NORMAL },
      props: true,
      component: () =>
        import(/* webpackChunkName: "depot-detail" */
        '@pages/depot/detail')
    },
    {
      path: '/map/truck',
      name: 'map-truck',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "map-truck" */
        '@pages/map/truck')
    },
    {
      path: '/pubreq',
      name: 'pubreq',
      meta: { level: AUTH_LEVEL.STRICT },
      component: () =>
        import(/* webpackChunkName: "pubreq" */
        '@pages/pubreq')
    },
    {
      path: '/pubinfo',
      name: 'pubinfo',
      meta: { level: AUTH_LEVEL.STRICT },
      component: () =>
        import(/* webpackChunkName: "pubinfo" */
        '@pages/pubinfo')
    },
    {
      path: '/procotol',
      name: 'procotol',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "my-home" */
        '@pages/procotol')
    },
    {
      path: '/rent/list',
      name: 'rent-list',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "rent-list" */
        '@pages/rent/list')
    },
    {
      path: '/rent/:id',
      name: 'rent-detail',
      meta: { level: AUTH_LEVEL.NORMAL },
      props: true,
      component: () =>
        import(/* webpackChunkName: "rent-detail" */
        '@pages/rent/detail')
    },
    {
      path: '/truck/:id',
      name: 'truck-detal',
      meta: { level: AUTH_LEVEL.NORMAL },
      component: () =>
        import(/* webpackChunkName: "truck-detail" */
        '@pages/truck/detail')
    },

    {
      path: '/my',
      meta: { level: AUTH_LEVEL.STRICT },
      component: () =>
        import(/* webpackChunkName: "my" */
        '@pages/my'),
      children: [
        {
          path: '',
          name: 'my',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'my-home',
          component: () =>
            import(/* webpackChunkName: "my-home" */
            '@pages/my/home')
        },
        {
          path: 'trade',
          name: 'my-trade',
          component: () =>
            import(/* webpackChunkName: "my-trade" */
            '@pages/my/trade')
        },
        {
          path: 'release',
          name: 'my-release',
          component: () =>
            import(/* webpackChunkName: "my-release" */
            '@pages/my/release')
        },
        {
          path: 'focus',
          name: 'my-focus',
          component: () =>
            import(/* webpackChunkName: "my-focus" */
            '@pages/my/focus')
        },
        {
          path: 'cert',
          name: 'my-cert',
          component: () =>
            import(/* webpackChunkName: "my-cert" */
            '@pages/my/cert')
        },
        {
          path: 'profile',
          name: 'my-profile',
          component: () =>
            import(/* webpackChunkName: "my-profile" */
            '@pages/my/profile')
        },
        {
          path: 'password',
          name: 'my-password',
          component: () =>
            import(/* webpackChunkName: "my-password" */
            '@pages/my/password')
        }
      ]
    },

    {
      path: '/authing',
      name: 'authing',
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "share" */
        '@pages/authing')
    },

    {
      path: '/404',
      name: 'err404',
      meta: { level: AUTH_LEVEL.NOT },
      component: () =>
        import(/* webpackChunkName: "share" */
        '@pages/404')
    },

    {
      path: '*',
      redirect: {
        name: 'err404'
      }
    }
  ],
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  let { level } = to.matched[0].meta
  let { getters } = createStore()
  log.debug(`路由轨迹: [from:${from.path}] -> [to:${to.path}]`)
  if (isNotAuth(level)) {
    next()
  } else {
    if (isRefreshPage(from)) {
      next({
        name: 'authing',
        params: {
          to: cloneRoute(to)
        }
      })
    } else {
      if (getters.isLogged || isNotStrictAuth(level)) {
        next()
      } else {
        next({
          name: 'authing',
          params: {
            to: cloneRoute(to)
          }
        })
      }
    }
  }
})
export function createRouter() {
  return router
}

export default router
