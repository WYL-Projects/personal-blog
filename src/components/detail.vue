<template>
<div v-if="isShowComment">
    <div class="detail" >
        <div class="title-info">
            <p class="detail-title">{{blog.title}}</p>
            <p class="relative-info">
                <span>作者：最靓的仔</span>
                <span>标签：{{blog.tags}}</span>
                <span>发布于：{{publishTime(blog.ctime)}}</span>
                <span>浏览（{{readCount}}）</span>
            </p>
        </div>
        <div class="detail-content" v-html="blog.content"></div>
    </div>
    <p class="message-count">关于：目前有{{commentsObj?commentsObj.commentsCount:0}}条留言</p>
    <message v-for="(item,index) in (commentsObj?commentsObj.comments:[])"  :key="index" :comment="item"/>
    <comment/>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import { ColorfulLabelCloud } from "@/utils/util.js"
    import Axios from "axios"
    //发送评论栏
    import comment from  "@/components/sendComment.vue"
    //评论信息栏
    import message from  "@/components/about/message.vue"
    export default {
        created() {

        },
        data(){
            return {
                blog:{},
                isShowComment:false
            }
        },
        computed:{
            ...mapState(["labels", "commentsObj","disorderLabels"]),
            readCount(){
                return this.blog.readCount
            },
            publishTime(){
                return function (ctime) {
                    const date = new Date(ctime*1000),
                    Y = date.getFullYear() + '-',
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                    D = date.getDate() + ' ',
                    h = date.getHours() + ':',
                    m = date.getMinutes() + ':',
                    s = date.getSeconds();
                    return Y+M+D+h+m+s;
                }
            }
        },
        methods:{
            //根据blogID获取评论信息
            ...mapActions(['selectAllTag',"getCommentsByBlogId"]),
            //根据blogID获取文章信息
            getArticleInfo(){
                const that = this;
                Axios.get("/getArticleById", {
                    params:{
                        blogId:this.$route.query.blogId
                    }
                }).then(function (response) {
                    that.blog = response.data.data[0]
                    that.isShowComment = true;
                }).catch(err=>{
                    console.log(err)
                })
            },
            addReadCount(){
                const that = this;
                Axios.get("/addReadCount", {
                    params:{
                        blogId:this.$route.query.blogId
                    }
                }).then(function (response) {

                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        components:{
            comment,
            message
        },
        watch:{
            //当detail页面blogID发生改变时
            $route:function () {
                console.log("$route")
                this.selectAllTag();
                this.getCommentsByBlogId({curObj:this});
                this.addReadCount();//进来的时候阅读数增加一个
                this.getArticleInfo();//然后获取文章数目
            }
        },
        //当主页面进入detail页面时响应
        beforeRouteEnter(to, from, next){
            if(from.fullPath!=to.fullPath&&to.fullPath.indexOf("/detail")>-1){
                console.log('beforeRouteEnter')
                next(vm=>{
                    vm.selectAllTag();
                    vm.getCommentsByBlogId({curObj:vm});
                    vm.addReadCount();//进来的时候阅读数增加一个
                    vm.getArticleInfo();//然后获取文章数目
                })
            }
        }
    }
</script>

<style lang="sass">
    @import "@/assets/detail.scss"
</style>