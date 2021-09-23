<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar fixed>
      <template #left>
        <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
        <img class="logo" :src="imgObj"/>
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
      </template>
    </van-nav-bar>
    <!-- 导航区域 -->
    <van-tabs v-model="channelId"
      animated
      sticky
      offset-top="1.226667rem">

      <van-tab v-for="(item, index) in channelList" :key="index" :title="item.name" :name="item.id">

         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="50"
            :immediate-check="false"
            >
              <ArticleList :articleList="articleList" @delunlike="delunlikefn"></ArticleList>
            </van-list>
         </van-pull-refresh>

      </van-tab>
    </van-tabs>
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.45rem" class="moreChannels" @click="show = true"/>
    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap" @closed="onPopupClosed">
      <!-- 弹出层的主体区域 -->
      <ChannelEdit @close="show = false" :userChannelList="channelList" @addchannel="addChannelFn" @removeChannel="removeChannelFn" ref="JchannelEdit" @changeChannel="channgeChannelFn"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
// 头部图片
import logoPng from '@/assets/image/logo.png'
// 频道数据
import { getUserChannelAPI, getArticlesListAPI, updateChannelAPI } from '@/api'
import ArticleList from '@/views/Home/ArticleList'
import ChannelEdit from '@/views/Home/components/ChannelEdit'
export default {
  name: 'Home',
  // prop: ['articleList'],
  data () {
    return {
      channelId: 0,
      imgObj: logoPng,
      channelList: [], // 频道数据
      articleList: [],
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完成
      timestamp: undefined, // 用于加载更多(分页)
      isLoading: false, // 顶部刷新状态
      show: false // 添加频道
    }
  },
  methods: {
    // 删除文章
    async delunlikefn (i) {
      this.articleList.splice(i, 1)
      if (this.articleList.length < 6) {
        // 负责拿文章列表数据
        const res = await getArticlesListAPI({
          channelId: this.channelId,
          timestamp: this.timestamp
        })
        // //  console.log(res)
        // 回来的数据进行预处理, 把时间转成多久多久之前
        res.data.data.results.forEach((obj) => {
          obj.pubdate = this.$timeAgo(obj.pubdate)
        })

        // //  如果数据<6 就添加数据
        if (res.data.data.results.length < 6) {
          // this.finished = true // 告诉list组件直接底部显示没有更多数据

        } else {
          this.timestamp = res.data.data.pre_timestamp // 保存下一页数据的时间(做分页用)
          this.articleList = [...this.articleList, ...res.data.data.results]
          // this.$emit("send",[...this.articleList, ...res.data.data.results])
          // 等待网络请求结果后
          this.loading = false // 底部加载更多状态
        }
      }
    },
    async getArticleList () {
      // 负责拿文章列表数据
      const res = await getArticlesListAPI({
        channelId: this.channelId,
        timestamp: this.timestamp
      })
      //  console.log(res)
      // 回来的数据进行预处理, 把时间转成多久多久之前
      res.data.data.results.forEach((obj) => {
        obj.pubdate = this.$timeAgo(obj.pubdate)
      })

      //  如果无数据
      if (res.data.data.results.length === 0) {
        this.finished = true // 告诉list组件直接底部显示没有更多数据
      } else {
        this.timestamp = res.data.data.pre_timestamp // 保存下一页数据的时间(做分页用)
        this.articleList = [...this.articleList, ...res.data.data.results]
        // this.$emit("send",[...this.articleList, ...res.data.data.results])
        // 等待网络请求结果后
        this.loading = false // 底部加载更多状态
      }
    },
    // 底部加载
    onLoad () {
      if (this.articleList.length > 0) {
        this.getArticleList()
      }
    },
    // 顶部刷新事件方法
    onRefresh () {
      setTimeout(() => {
        // Toast('刷新成功');
        this.$toast('刷新成功')
        this.isLoading = false
        this.nextTime = null
        this.articleList = []
        this.getArticleList()
      }, 1000)
    },
    // 统一更新频道 在更改频道的时候调用
    async updateChannel () {
      // 先拷贝一份数组(前端页面用channelList, 后端用拷贝出的数组)
      // 数组第一层, 对象里key+value是第二层
      const newArr = this.channelList.map(obj => {
        const newObj = { ...obj }
        return newObj
      })
      // 先剔除推荐
      const index = newArr.findIndex(obj => obj.name === '推荐')
      newArr.splice(index, 1)
      // 转换字段
      newArr.forEach((obj, index) => {
        delete obj.name
        obj.seq = index + 1
      })
      // 调用接口
      await updateChannelAPI({
        channels: newArr
      })
    },
    // 添加 频道
    async addChannelFn (obj) {
      this.channelList.push(obj)
      this.updateChannel()
    },
    // 删除频道
    async removeChannelFn (obj) {
      const ind = this.channelList.findIndex(item => item.id === obj.id)
      this.channelList.splice(ind, 1)
      this.updateChannel()
    },
    // / 弹层关闭-重置编辑频道状态
    onPopupClosed () {
      this.$refs.JchannelEdit.isEdit = false
    },
    // 切换频道
    channgeChannelFn (obj) {
      this.channelId = obj.id // 传过来的频道ID, 影响tabs默认v-model的选择
    }
  },
  async created () {
    this.getArticleList()
    // 频道列表
    const res = await getUserChannelAPI()
    this.channelList = res.data.data.channels
    // console.log(res.data.data);
    // 文章列表
    const resa = await getArticlesListAPI({ channelId: this.channelId })
    this.articleList = resa.data.data.results
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  // 侦听 channelId的变化 去切换文章列表
  watch: {
    async channelId () {
      // 根据新的频道id，发请求，拿数据
      // console.log(this.channelId);
      const res = await getArticlesListAPI({ channelId: this.channelId })
      this.articleList = res.data.data.results
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content{
  padding-top: 44px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 25px;

  background-color: #fff;
}
// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 58px;
  right: 8px;
  z-index: 999;

}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap{
  width: 100%;
  height: 100%;
}
</style>
