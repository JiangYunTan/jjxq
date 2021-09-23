// 基于 axios 封装的请求模块
import axios from 'axios'
import router from '@/router'
import store from '@/store'
// 新建一个新的axios实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基地址
})
// 请求拦截器 带上token
request.interceptors.request.use(config => {
  const { token } = store.state.user
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
// 添加响应拦截器
request.interceptors.response.use(function (response) { // 当状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, async function (error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    store.commit('user/setToken', null)
    store.commit('user/setRefreshToken', null)
    router.push({ path: '/login' })
  }

  return Promise.reject(error)
})

// 导出自定义函数
export default request
