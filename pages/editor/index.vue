<template>
  <div class="editor-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="postPublish">
            <fieldset>
                <fieldset class="form-group">
                    <input type="text" class="form-control form-control-lg" v-model="articleItem.title" placeholder="Article Title" required>
                </fieldset>
                <fieldset class="form-group">
                    <input type="text" class="form-control"  v-model="articleItem.description" placeholder="What's this article about?" required>
                </fieldset>
                <fieldset class="form-group">
                    <textarea class="form-control" rows="8" v-model="articleItem.body" placeholder="Write your article (in markdown)" required></textarea>
                </fieldset>
                <fieldset class="form-group">
                    <input type="text" class="form-control" placeholder="Enter tags">
                    <!-- <div class="tag-list" style="width:100%">
                        <select style="width:100%">
                            <option value="1" label="1"></option>
                        </select>
                    </div> -->
                </fieldset>
                <button class="btn btn-lg pull-xs-right btn-primary" :disabled="disabled">
                    Publish Article
                </button>
            </fieldset>
            </form>
        </div>

        </div>
    </div>
    </div>  
</template>

<script>
import { publishArticle, getArticle, modifyArticle } from '@/api/article';
import { mapState } from 'vuex';


export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data(){
    return {
        disabled: false,
        slug: this.$route.query.slug || '', 
        articleItem: {
          "title": "",
          "description": "",
          "body": "",
          "tagList": ['55555']
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {},
  created(){
      this.init()
  },
  mounted(){},
  methods: {
    async postPublish() {
    console.log(">>>>点击public")
       const articleItem  = this.articleItem;      
      this.disabled = true;
       const body = {
        "article" : articleItem
      }
      console.log(body)
      if(this.slug!==''){
        await modifyArticle(this.slug, body);
      }else {
        const { data } = await publishArticle(body);
        this.slug = data.article.slug;
      }
      this.disabled = false;
      this.$router.replace({
        path: '/article/' + this.slug
      })
    },
    init(){
      if(this.slug!==''){
        this.getDetail();
      }
    },
    async getDetail() {
      const { data } = await getArticle(this.slug);
      const { article } = data;
      Object.keys(this.articleItem).forEach(key => {
        this.articleItem[key] = article[key];
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
