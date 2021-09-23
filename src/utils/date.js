import moment from 'moment'
// 设置中文模式
moment.locale('zh-cn')

/**
 * .....多久之前
 * @param {*} 之前的时间
 * @returns 系统时间到之前指定时间的距离值
 */
export const timeAgo = (targetTime) => {
  // 格式化时间
  return moment(targetTime).fromNow() // 返回多久之前...
}
