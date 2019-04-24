import { mapGetters, mapMutations } from 'vuex'
import { UPDATE_AUTH_ROUTE } from '@store/types'

export default {
  computed: {
    ...mapGetters({
      authRoute: 'authRoute'
    })
  },

  methods: {
    ...mapMutations({
      updateAuthRoute: UPDATE_AUTH_ROUTE
    }),
    authComplete(authPage) {
      this.goAuthAfterPage(authPage)
    },
    goAuthAfterPage(page = this.authRoute) {
      if (!page) {
        page = { path: '/' }
      }
      this.updateAuthRoute(null)
      this.$router.replace(page)
    }
  }
}
