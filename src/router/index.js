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
  }
]

const router = new VueRouter({
  routes
})

export default router
