import request from '../utils/request.js'
// Home页面 频道切换数据接口
// import store from '../store/index'

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
export const getAllChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 登录接口
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
export const getUserChannelAPI = () => request({
  url: '/v1_0/user/channels'
  // headers: {
  //   // Authorization: 'Bearer ' + localStorage.getItem('token')
  //   Authorization: `'Bearer ' + ${store.state.user.token}`
  // }
})
// Home页面 获取文章列表
export const getArticlesListAPI = ({ channelId, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp || (new Date()).getTime()
    }
  })
}
// 反馈面板数据 在ArticleItem页面引用
export const firstActions = [
  {
    id: 11,
    name: '不感兴趣'
  },
  {
    id: 22,
    name: '反馈垃圾内容'
  },
  {
    id: 33,
    name: '拉黑作者'
  }
]
// 反馈垃圾内容 在ArticleItem页面引用
export const secondActions = [
  {
    id: 0,
    name: '其它问题'
  },
  {
    id: 1,
    name: '标题夸张'
  },
  {
    id: 2,
    name: '低俗色情'
  },
  {
    id: 3,
    name: '错别字多'
  },
  {
    id: 4,
    name: '旧闻重复'
  },
  {
    id: 6,
    name: '内容不实'
  },
  {
    id: 8,
    name: '侵权'
  },
  {
    id: 5,
    name: '广告软文'
  },
  {
    id: 7,
    name: '涉嫌违法犯罪'
  }
]
// 文章 - 不感兴趣 在ArticleItem页面引用
export const articleDislikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 文章举报 在ArticleItem页面引用
export const articleReportsAPI = ({ target, type, remark }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: target,
      type: type,
      remark: remark
    }
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 在添加频道和删除频道的时候 去更新数据
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
