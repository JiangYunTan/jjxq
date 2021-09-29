// 储存token
const userModule = {
  namespaced: true,
  state () {
    return {
      token: window.localStorage.getItem('token'),
      refreshToken: window.localStorage.getItem('refreshToken')
      // user: JSON.parse(localStorage.getItem('user')) || {} // 用户基本资料(默认从本地取)
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
    // setUser (state, userObj) {
    //   state.user = userObj
    //   localStorage.setItem('user', JSON.stringify(userObj))
    // }
  }
}
// 导出
export default userModule
