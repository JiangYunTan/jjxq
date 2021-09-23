<template>
  <div class="article-list__container">
      <ArticleItem v-for="(item, index) in articleList" :key="item.art_id" :obj="item" :articleList="articleList" :i="index" @delunlike="delunlikefn"  @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from './components/ArticleItem.vue'

export default {
  // 父传子的文章列表
  props: ['articleList'],
  data () {
    return {
      // articleList: [],

    }
  },
  components: {
    ArticleItem
  },

  methods: {
    delunlikefn (i) {
      this.$emit('delunlike', i)
    }
  }
}
</script>
