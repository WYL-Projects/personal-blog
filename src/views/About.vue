<template>
<div>
    <div class="about">
        <AboutMe title="关于我">
            <div class="about-me-instruction">
                <div class="basic-instruction">
                    博主<router-link to="/" class="realname">万以亮</router-link>,
                    wyl ,性别男 , 江西南昌即南昌人。
                </div>
                <div class="skills">
                    <p v-for="(item,index) in skills" :key="index">{{item}}</p>
                </div>
                <div class="other-instruction">
                    <p>我的书单：<a href="https://book.douban.com/people/58553308/" target="_blank">https://book.douban.com/people/58553308/</a></p>
                    <p>我的知乎：<a href="https://www.zhihu.com/people/zheng-xiao-93-51/activities" target="_blank">https://www.zhihu.com/people/zheng-xiao-93-51/activities</a></p>
                </div>
            </div>
        </AboutMe>
        <AboutMe title="关于博客">
            <div class="about-me-blogs">
                <div class="blog-instuction"><p v-for="(item,index) in blogs" :key="index">{{item}}</p></div>
                <div class="other-recommand">
                    <p>推荐便宜又稳定的xen-VPS吧: <router-link to="/">HostShare</router-link></p>
                </div>
            </div>
        </AboutMe>
    </div>       
        <p class="message-count">关于：目前有{{commentsObj?commentsObj.commentsCount:0}}条留言</p>
        <message v-for="(item,index) in (commentsObj?commentsObj.comments:[])"  :key="index" :comment="item"/>
        <comment blogId="-2"/>
    </div>
</template>
<script>
import AboutMe from "@/components/about/aboutMe.vue"
import message from "@/components/about/message.vue"
import {mapState, mapActions} from "vuex";
//发送评论栏
import comment from  "@/components/sendComment.vue"
export default {
    components:{
        AboutMe,
        message,
        comment
    },
    created(){
        //博客id为-2的是关于界面的评论
        this.getCommentsByBlogId({curObj:this, oBlogId:"-2"})
    },
    data() {
        return {
            skills:["会打王者的野生程序员","认为Javascript是世界上最有趣的语言","两年前端开发","梦想进腾讯","互联网行业"],
            blogs:["从2009年 – 今","博主很懒加词穷，佛系更新…","域名 zhengoo.cn -> zh30.com",
            "程序 tcms -> WordPress","服务器 免费空间 -> 国内某收费空间 -> 国外vps -> 阿里云"]
        }
    },
    computed:{
        ...mapState(['commentsObj']),

    },
    methods:{
        ...mapActions(["getCommentsByBlogId"])
    }
}
</script>
<style lang="sass">
    @import "@/assets/about.scss"
</style>

