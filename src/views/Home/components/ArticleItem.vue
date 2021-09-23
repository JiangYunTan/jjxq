<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{obj.title}}</span>
        <!-- 单图 -->
         <img class="thumb"
         :src="obj.cover.images[0]"
         v-if="obj.cover.type === 1"/>
      </div>
      <!-- 三张图片 -->
      <div class="thumb-box"  v-if="obj.cover.type > 1">
         <img class="thumb"
         v-for="(imgUrl, index) in obj.cover.images"
         :key="index"
         :src="imgUrl"/>
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ obj.aut_name }}</span>
          <span>{{ obj.comm_count }} 评论</span>
          <span>{{ relativeTime(obj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click="show = true" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" :cancel-text="cancelText" close-on-click-action get-container="body" @cancel="onCancel" />
        <!-- 其他问题面板 -->
        <van-dialog v-model="Jshow" title="反馈" show-cancel-button get-container="body" :before-close="confirmFN">
          <van-field type="textarea" placeholder="请输入问题"  v-model="msg" v-Jujiao></van-field>
        </van-dialog>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { firstActions, secondActions, articleDislikeAPI, articleReportsAPI } from '@/api'
// 引入不敢兴趣
// import { articleDislikeAPI } from '@/api'
import { Notify } from 'vant'
export default {
  props: {
    obj: { // 文章信息对象
      type: Object,
      default () {
        return {}
      }
    },
    i: Number
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消',
      Jshow: false,
      msg: ''
    }
  },
  methods: {
    // 反馈其他问题  Dialog弹出层 时 before-close 的 Props
    async confirmFN (action, done) {
      if (action === 'confirm') {
        if (!this.msg) {
          // this.Jshow = true;
          this.$toast('请输入正确反馈')
          done(false)
          return
        }
        try {
          await articleReportsAPI({
            target: this.obj.art_id,
            type: this.msg,
            remark: '就是其他问题'
          })
          done()
          Notify({ type: 'success', message: '举报成功' })
        } catch (err) {
          Notify({ type: 'warning', message: '举报失败' })
        }
      }
      done()
    },
    relativeTime (val) {
      const t = new Date(val)
      const diff = Date.now() - t.getTime()

      const year = Math.floor(diff / (1000 * 3600 * 24 * 365))
      if (year) {
        return `${year}年前`
      }
      const month = Math.floor(diff / (1000 * 3600 * 24 * 30))
      if (month) {
        return `${month}月前`
      }
      const day = Math.floor(diff / (1000 * 3600 * 24))
      if (day) {
        return `${day}天前`
      }
      const hour = Math.floor(diff / (1000 * 3600))
      if (hour) {
        return `${hour}小时前`
      }
      const minute = Math.floor(diff / (1000 * 60))
      if (minute) {
        return `${minute}分钟前`
      } else {
        return '刚才'
      }
    },
    // 显示反馈面板
    async onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false;
      // action绑定的数据对象, index是索引
      // console.log(item.name);
      if (item.name === '反馈垃圾内容') {
        // 证明点击的是反馈垃圾内容
        this.actions = secondActions
        this.cancelText = '返回'
        this.show = true
      } else if (item.name === '不感兴趣') {
        // 传递到ArticleList页面中引用
        // this.$emit('dislike', this.obj)
        // this.dislikeFn()
        try {
          await articleDislikeAPI({
            target: this.obj.art_id
          })
          Notify({ type: 'success', message: '反馈成功' })
          this.$emit('delunlike', this.i)
          this.show = false // 关闭弹窗
        } catch (err) {
          Notify({ type: 'warning', message: '反馈失败-联系程序员' })
        }
      } else if (item.name === '其它问题') {
        this.show = false
        this.Jshow = true
      } else {
        try {
          await articleReportsAPI({
            target: this.obj.art_id,
            type: item.name,
            remark: '就是其他问题'
          })
          Notify({ type: 'success', message: '举报成功' })
        } catch (err) {
          Notify({ type: 'warning', message: '举报失败' })
        }
      }
    },
    // 取消事件
    onCancel () {
      if (this.cancelText === '返回') {
        this.actions = firstActions
        this.cancelText = '取消'
        this.show = true // 点返回不要让弹窗关闭, 点取消文字按钮, 弹窗默认关闭
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
  margin: 0 3px;
  &:first-child{
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
