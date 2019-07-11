<template>
  <div>
    <div class="everyday" v-on:dblclick="edit">
      <p class="everyday-title">每日一句&nbsp;
          <span class="glyphicons"></span>
      </p>
        <p v-html="sayings" class="English-Sayings"></p>
    </div>
    <div class="tags" v-for="(blogTag, index) in blogsTags" :key="index">
    <!--  每一个tag-->
      <Tag :blogTag="blogTag" />
    </div>
    <div class="turning-page">
       <page-turning  :maxPage="pageNum" :tagsEveryPage="tagsEveryPage" ></page-turning>
    </div>
  </div>
</template>
<script>
import Tag from "@/components/index/singleBlogTag.vue";
import PageTurning from "@/components/Page-turning-plugins/page-turning.vue";
import  {mapState, mapMutations} from "vuex"
import  {Colorful}  from "@/utils/util.js"
import Axios from "axios"
export default {
    created(){
        this.getEveryday();
      //如果进入页面就有tagId地址的话就不执行，有tagId说明是显示相关标签的文章
        if(!this.$route.query.tagId)  this.getBlog();
    },
  mounted() {
    if(this.$store.state.isRunColorful){
      Colorful("everyday-title",[175,72,72]);
    }
  },
  data() {
    return {
      sayings: {},
      tagsEveryPage:2, //每页的tag数
    };
  },
  computed:{
      ...mapState(['pageNum','blogsTags']),
    //一旦路由发生改变后

  },
  watch:{
    //监听route属性改变，刷新界面时，不执行该函数
    $route(){
      if(!this.$route.query.tagId)  this.getBlog();
    }
  },
  components: {
    Tag,
    PageTurning
  },
  methods:{
      ...mapMutations(['setPageNum']),
      edit(){
        //双击跳转到编辑页面
        window.location.href = "/edit-every-sentence.html"
      },
      //axios获取后端接口的数据
      getEveryday(){
          const that = this;
        //当刷新的时候，颜色变化定时器重新定义
        this.$store.commit("setIsRunColorful",true);
          Axios.get("/getEveryday").then(function (response) {
              that.sayings = response.data.data[0].content;
          }).catch(function (err) {
            console.log(err)
          })
      },
      //axios获取博客文章的总数目
      getBlog(){
        console.log("总界面")
        const that = this;
        Axios.get("/getBlog").then(function (response) {
            const pageNum = Math.ceil(response.data.data.length/that.tagsEveryPage);
            that.setPageNum(pageNum);//将查出来的总页数放到store中，包括单标签点击时查和初始化查
        }).catch(function (err) {
          console.log(err)
        })
      }
  }
};
</script>