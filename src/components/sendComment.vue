<template>
    <div class="comment-area" id="editComment">
        <!--    提交评论相当于没有父级    -->
        <!--   第一个hidden标签用做直接发送评论而不是回复评论     -->
        <input type="hidden" name="parent" ref="parent" value="-1">
        <!--   第二个hidden标签用做回复评论  默认为0   -->
        <input type="hidden" name="parent_user_name" ref="parent_user_name" value="0">
        <p class="title">发表评论</p>
        <div>
            <input type="text" id="name" placeholder="昵称" ref="name">
            <input type="text" id="email" placeholder="邮箱" ref="email">
        </div>
        <textarea name="content" id="content"  placeholder="无意义内容我可能不会回复你" ref="content"></textarea>
        <div class="Verification-Code">
            <input type="text" placeholder="验证码" ref="VerificationCode">
            <!--      点击更新验证码     -->
            <span v-html="svg" class="svg" @click="updateValidCode"></span>
        </div>
        <div class="btns">
        <button id="submitMessage" @click="uploadContent">提交留言</button>
        <button  @click="reset">重写</button>
        </div>
    </div>
</template>

<script>
    import Axios from "axios"
    import {mapState, mapActions} from "vuex"
    export default {
        name: "comment",
        created(){
            this.getValidCode();
        },
        props:['blogId'],//这个是用于关于页面和留言页面的评论
        data(){
            return {
                svg:"",
                text:""
            }
        },
        computed:{
            ...mapState(["parentUser"])
        },
        methods:{
            ...mapActions(['getCommentsByBlogId']),
            uploadContent(){
                let name = this.$refs.name.value, email = this.$refs.email.value, content = this.$refs.content.value,
                VerificationCode = this.$refs.VerificationCode.value,
                    parent = !this.parentUser ? this.$refs.parent.value : this.parentUser.id,
                    //这里判断vuex里面存储的被回复则是否为空，如果为空，则说明该评论属于直接评论，没有针对谁和谁的；反之
                    //不为空的话则是对某个人回复
                    replyLastUser = !this.parentUser ? this.$refs.parent_user_name.value : this.parentUser.username;
                if(name==""||email==""||content==""||VerificationCode==""){
                    alert("不能有一项为空！");
                    return;
                }
                //插入数据
                if(VerificationCode != this.text){
                    console.log(VerificationCode, this.text)
                    alert("验证码出错");
                return
            }
                Axios.get("/uploadComment",{
                    params:{
                        name,
                        email,
                        content,
                        VerificationCode,
                        blogId: this.blogId||this.$route.query.blogId,//如果this.blogId存在的话说明是需要查找关于界面，和留言界面的评论
                        parent,
                        replyLastUser
                    }
                }).then(response=>{
                    //评论谁成功
                    alert(response.data.data+"，评论"+replyLastUser+"成功！");
                    this.getCommentsByBlogId({curObj:this,oBlogId:this.blogId});//如果this.blogId存在的话说明是需要查找关于界面，和留言界面的评论
                    this.reset();
                }).catch(err=>{
                    console.log(err)
                })
            },
            reset(){
                const obj = this.$refs;
                for(let prop in obj){
                    //隐藏的、存储数据的hidden属性的input标签不能被置为空
                    if(prop != "parent"&&prop != "parent_user_name") obj[prop].value = "";
                }
            },
            getValidCode(){
                //获取验证码数据
                Axios.get("/get-img-verify").then(response=>{
                    this.svg = response.data.data.data;
                    this.text = response.data.data.text;
                }).catch(err=>{
                    console.log(err)
                })
            },
            updateValidCode(){
                this.getValidCode();
            }
        }
    }
</script>

<style lang="sass">
    @import "@/assets/sendComment.scss"
</style>