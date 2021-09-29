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
// 搜索联想菜单
export const suggestListAPI = ({ q }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: q
    }
  })
}
// 搜索 - 结果列表
export const searchResultListAPI = ({ q, page = 1 }) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
// 文章 - 详情
export const articleDetailAPI = ({ id }) => {
  return request({
    // :id是后台规定的参数名
    // 前端要在对应路径位置传值(不要写:)
    url: `/v1_0/articles/${id}`
  })
}
// 文章 - 关注作者
export const followedUserAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 文章 - 取消关注作者
export const unFollowedUserAPI = ({ uid }) => {
  return request({
    // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
    url: `/v1_0/user/followings/${uid}`,
    method: 'DELETE'
  })
}
// 文章 - 点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 文章 - 取消点赞
export const articleDisLikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
// 评论 - 获取列表
// offset第一页时, 不用在params携带(axios发现值为null会自动忽略此参数)
export const commentListAPI = ({ artId, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: artId,
      offset,
      limit
    }
  })
}
// 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论-取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 评论 - 发布评论
export const sendCommentAPI = ({ artId, content }) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: artId,
      content: content
    }
  })
}
// 用户 - 基本资料
export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
    // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}
// 用户 - 更新资料
export const updateProfileAPI = ({ birthday, userName }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday: birthday,
      name: userName
    }
  })
}
