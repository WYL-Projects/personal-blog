<template>
   <div class="message">
            <p class="questioner">
                <img src="@/assets/images/headImg1.jpg" alt="" class="icon">
             &nbsp;<span class="questioner-name">{{comment.username}}</span>
                <span style="color: #F56C6C;font-size: 16px" >{{Receiver}}</span> ：发表于 {{publishTime}}
            <span class="recall" v-on:click="reply">[回复]</span>
             </p>
            <p class="questions">{{content}}</p>
   </div>
</template>
<script>
    import Axios from "axios"
    import {mapMutations} from "vuex"
    export default {
        props:["comment"],
        methods:{
            //点击回复将请求来的评论对应的用户名保存
            reply(){
                const parentObj = {};
                location.href = "#editComment";
                parentObj.username = this.comment.username;
                parentObj.id = this.comment.id;
                //将被回复者类存起来
                this.setParentUser(parentObj);
            },
            ...mapMutations(["setParentUser"])
        },
        computed:{
            content(){
                return this.comment.comments
            },
            publishTime(){
                return this.comment.ctime
            },
            Receiver(){
                //this.comment['parent_username']注意这里是字符串0，即'0'
                return this.comment['parent_username']==0 ? '' : ('@'+ this.comment['parent_username'])
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "@/assets/message.scss"
</style>
