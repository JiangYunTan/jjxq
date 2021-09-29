import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 自动聚焦  全局自定义指令
import '@/directive/index.js'

// 适配区域
import 'amfe-flexible'

// 导入事件格式化 多久之前
import { timeAgo } from '@/utils/date'

// vant 引入实例化 NavBar导航模块
// 导入登录页面的vant ui  Form, Field, Button 的组件
// 导入 底部导航栏 Tabbar, TabbarItem 的组件
// 导入 Layout 页面的 图标 Icon 组件
// Home页面 的滚动标签 需要 Tab, Tabs 组件
// Home页面 子页面 下面使用 cell
// 下拉加载 List PullRefresh
// 轻提示 Toast
// ActionSheet 动作面板
// 弹出层 Popup home 下的index引用
// 注册分割线组件, Divider 在main.js
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, Toast, ActionSheet, Dialog, Popup, Row, Col, Badge, Search, Divider, Tag, CellGroup, Image, DatetimePicker, Picker } from 'vant'

const Components = [NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, Toast, ActionSheet, Dialog, Popup, Row, Col, Badge, Search, Divider, Tag, CellGroup, Image, DatetimePicker, Picker]

Components.forEach(item => {
  Vue.use(item)
})
Vue.prototype.$timeAgo = timeAgo
// Vue.use(NavBar)
// Vue.use(Form)
// Vue.use(Field)
// Vue.use(Button)
// Vue.use(Tabbar)
// Vue.use(TabbarItem)
// Vue.use(Icon)
// Vue.use(Tab)
// Vue.use(Tabs)
// Vue.use(Cell)
// Vue.use(List)
// Vue.use(PullRefresh)
// Vue.use(Toast)
// Vue.use(ActionSheet)
// Vue.use(Dialog)
// Vue.use(Popup)
// Vue.use(Badge)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Search)
// Vue.use(Divider)
// Vue.use(CellGroup)
// Vue.use(Tag)
// Vue.use(Image)
// Vue.use(DatetimePicker)
// Vue.use(Picker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
