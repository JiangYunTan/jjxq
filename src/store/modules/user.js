// 储存token
const userModule = {
  namespaced: true,
  state () {
    return {
      token: window.localStorage.getItem('token'),
      refreshToken: window.localStorage.getItem('refreshToken')
    }
  },
  mutations: {
    setToken (state, tokenStr) {
      state.token = tokenStr
      localStorage.setItem('token', tokenStr)
    },
    setRefreshToken (state, refreshTokenStr) {
      state.refreshToken = refreshTokenStr
      localStorage.setItem('refreshToken', refreshTokenStr)
    }
  }
}
// 导出
export default userModule
