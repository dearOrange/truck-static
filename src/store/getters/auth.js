export default {
  isLogged({ user }) {
    return user && user.userId
  },

  authRoute({ auth }) {
    return auth.route
  },

  afterAuthRoute({ auth }) {
    return auth.after
  },
  beforeAuthRoute({ auth }) {
    return auth.before
  }
}
