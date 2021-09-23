<template>
  <div class="search-container">
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        background="#007BFF"
        v-model="kw"
        shape="round"
        @input="getSuggLIstFn"
        @search="enterFn"
        v-Jujiao/>
    </div>
    <!-- 搜索建议列表 -->
   <!-- 搜索建议列表 -->
   <div class="sugg-list" v-for="(str, index) in suggestList" :key="index" v-show="kw.length !== 0">
      <div class="sugg-item" v-html="lightFn(str, kw)"  @click="clickFn(str)"></div>
   </div>
    <!-- 搜索历史 -->
   <div class="search-history" v-show="kw.length === 0">
      <!-- 标题 -->
      <van-cell title="搜索历史">
         <!-- 使用 right-icon 插槽来自定义右侧图标 -->
         <template #right-icon>
               <van-icon name="delete" class="search-icon" @click="clearFn" />
         </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
         <span class="history-item" v-for="(str, index) in history" :key="index" @click="hisClickFn(str)">{{ str }}</span>
      </div>
   </div>
  </div>

</template>

<script>
import { suggestListAPI } from '@/api'
import { lightFn } from '@/utils/str'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖, 用的定时器
      suggestList: [], // 建议关键字列表
      lightFn, // key和value变量名同名
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  methods: {
    getSuggLIstFn () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.kw.length === 0) return // 防止空内容触发下面逻辑
        const res = await suggestListAPI({
          q: this.kw
        })
        this.suggestList = res.data.data.options
        // console.log(this.suggestList);
        // console.log(this.kw)
      }, 500)
      // console.log(1);
    },
    // 输入框回车
    enterFn () {
      this.history.push(this.kw) // 保存搜索关键字
      setTimeout(() => {
        this.$router.push({
          path: `/search/${this.kw}`
        })
        this.history = Array.from(new Set(this.history)) // 去重
      })
    },
    // 建议列表点击
    clickFn (str) {
      this.history.push(str) // 保存搜索关键
      setTimeout(() => {
        this.$router.push({
          path: `/search/${str}`
        })
        this.history = Array.from(new Set(this.history)) // 去重
      })
    },
    // 历史记录点击
    hisClickFn (str) {
      this.$router.push({
        path: `/search/${str}`
      })
    },
    // 清空搜索历史
    clearFn () {
      this.history = [] // watch会触发, 把空数组保存到本地
    }
  },
  watch: {
    history () {
      localStorage.setItem('his', JSON.stringify(this.history))
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  display: flex;
  align-items: center;
  height: 46px;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
