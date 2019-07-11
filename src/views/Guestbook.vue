<template>
    <div class="guestbook">
        <div class="content">
            <p class="xx">欢迎灌水交流，别看我长时间不发博，博主可一直都在线~</p>
            <p>友链只交换技术类个人博客。</p>
            <p>不要皮，谢谢。</p>
            <p>博主联系:13114365362</p>
        </div>
        <p class="message-count">关于：目前有{{commentsObj?commentsObj.commentsCount:0}}条留言</p>
        <message v-for="(item,index) in (commentsObj?commentsObj.comments:[])"  :key="index" :comment="item"/>
        <comment blogId="-3"/>
    </div>
</template>
<script>import message from "@/components/about/message.vue"
import {mapState, mapActions} from "vuex";
//发送评论栏
import comment from  "@/components/sendComment.vue"
export default {
    components:{
        message,
        comment
    },
    created(){
        //博客id为-3的是留言界面的评论
        this.getCommentsByBlogId({curObj:this, oBlogId:"-3"})
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
    @import "@/assets/Guestbook.scss"
</style>
