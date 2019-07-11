<template>
    <div class="right">
                <!-- 随机标签云 -->
                <div class="panel" >
                <!-- slotProps是将组件Panel里面的数据拿过来自己用，而不需要在父组件里面定义数据 -->
                    <label-title title="随机标签云"/>
                <div class="panel-content cloud-labels">
                    <router-link   tag="span"  :to="{path:'/',query:{tagId:labelNameCorId[item]}}"  class="label1"
                                 v-for="(item, index) in disorderLabels"
                                 :key="index" @click.native="relativeArticle(labelNameCorId[item])">{{item}}</router-link>
                </div>
                </div>
                <!-- 最近热门 -->
                <div class="panel" ref="label">
                    <label-title title="最近热门"/>
                <div class="panel-content hot-labels">
                    <p class="hot-label" v-for="(item, index) in recentInfo" :key="index">
                        <router-link :to="{path:'/detail',query:{blogId:item.id}}" ref="oo">{{item.title}}</router-link>
                    </p>
                </div>
                </div>
                <!-- 最新评论 -->
                <div class="panel">
                    <label-title title="最新评论"/>
                <div class="panel-content recent-comments">
                    <div class="comment-label" v-for="(item, index) in commentInfo" :key="index">
                        <p>
                            <span class="name">{{item.username}}</span>
                            <span>[{{commentTime(item.ctime)}}]</span>
                        </p>
                        <p><router-link to="/about">{{item.comments}}</router-link></p>
                    </div>
                </div>
                </div>
            </div>
</template>
<script>
    import Axios from "axios"
    import LabelTitle from "./LabelTitle.vue"
import {mapState, mapMutations,mapActions} from "vuex"
export default {
    components:{
        LabelTitle
    },
    data(){
      return {
          tagsEveryPage:2,
          recentInfo:[],
          commentInfo:[]
      }
    },
    created(){
        //如果进入页面就有tagId地址的话就直接执行
        if(this.$route.query.tagId)  this.relativeArticle(this.$route.query.tagId)
        this.getRecentHot();
        this.recentComment();
    },
    mounted(){
        //由于要获取dom节点，所以得等app挂载后才能获取的到
        this.selectAllTag()
    },
    methods:{
        ...mapMutations(['setCurPage','setPageNum','setBlogsTags']),
        ...mapActions(['selectAllTag']),
        //将标签id打印
        relativeArticle(tagId){
            this.setCurPage(1);//换方式的时候要将页码置为1
            //根据标签Id查相关文章总数
            Axios.get("/selectBlogCountByTag",{
                params:{
                    tagId
                }
            }).then(response=>{
                const pageNum = Math.ceil(response.data.data.length/this.tagsEveryPage);
                this.setPageNum(pageNum);
            }).catch(err=>{
                console.log(err)
            })
        },
        getRecentHot(){
            const that = this;
            Axios.get("/recentHot").then(function (response) {
                that.recentInfo = response.data.data;
            }).catch(err=>{
                console.log(err)
            })
        },
        recentComment(){
            const that = this;
            Axios.get("/recentComment").then(function (response) {
                that.commentInfo = response.data.data
            }).catch(err=>{
                console.log(err)
            })
        },
    },
    computed:{
        ...mapState(['disorderLabels', 'labelNameCorId','curPage','blogsTags']), //获取标签名与标签id的对应关系 //disorderLabels在store.state里面
        commentTime(){
            return function (ctime) {
                // 指定日期和时间
                const EndTime = new Date(ctime*1000);
                // 当前系统时间
                const NowTime = new Date();
                const t = NowTime.getTime() - EndTime.getTime();
                const d = Math.floor(t / 1000 / 60 / 60 / 24);
                return d>=7 ? (Math.floor(d/7)+'周前'):(d+"天前");
            }
        }
    }
}
</script>