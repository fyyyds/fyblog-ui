<template>
  <div>
    <Header/>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>

    </div>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
import Header from "../components/Header";
import axios from 'axios'

export default {
  name: "BlogDetail",
  components: {Header},
  data() {
    return {
      blog: {
        userId: null,
        title: "",
        description: "",
        content: ""
      },
      ownBlog: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    axios.get('/blog/' + blogId).then(res => {
      console.log(res)
      console.log(res.data.data)
      _this.blog.id = res.data.data.id
      _this.blog.title = res.data.data.title
      var MardownIt = require("markdown-it")
      var md = new MardownIt()
      var result = md.render(res.data.data.content)
      _this.blog.content = result
      // 判断是否是自己的文章，能否编辑
      _this.ownBlog = (res.data.data.userId === _this.$store.getters.getUser.id)
      console.log(res.data.data.userId)
    });
  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
}
</style>