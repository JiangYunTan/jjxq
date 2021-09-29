import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/Login'
// 首页
import Layout from '@/views/Layout'
// 首页下的二级路由
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'
import UserEditor from '@/views/User/UserEdit'
import Chat from '@/views/Chat'
Vue.use(VueRouter)

const routes = [
  // 登录路由
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/:keywords',
    component: SearchResult
  },
  {
    path: '/article_detail',
    component: ArticleDetail
  },
  // 我的个人中心编辑
  {
    path: '/user_editor',
    component: UserEditor
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  // 小思同学
  {
    path: '/chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})
// // 路由守卫
// import store from '@/store'
// router.beforeEach((to, from, next) => {
//   // 有token, 不能去登录页
//   // 无token, 需要用户"权限"的才需要去登录页
//   // console.log(store.state);
//   if (store.state.user.token.length > 0 && to.path === '/login') {
//     // 证明有token-已经登录了
//     next(false) // 阻止跳转原地呆着
//   } else {
//     next()
//   }
// })
export default router
