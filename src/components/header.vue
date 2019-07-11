<template>
    <header class="header-container">
        <div class="nav">
        <div class="left">
            <ul>
                <li  class="title"><router-link to="/">靓仔个人博客|技术博客</router-link></li>
                <li><router-link to="/">首页</router-link></li>
                <li><router-link :to="{name:'Map'}">地图</router-link></li>
                <li><router-link :to="{name:'About'}">关于</router-link></li>
                <li><router-link :to="{name:'Guestbook'}">留言</router-link></li>
            </ul>
        </div>
        <div class="right">
            <input type="text" placeholder="输入关键词查找" v-model="inputVal">
            <button @click="search">搜索</button>
        </div>
        </div>
    </header>
</template>
<script>
    import Axios from "axios"
    import  {mapState, mapMutations} from "vuex"
    export  default {
        data(){
            return {
                inputVal:"",
                tagsEveryPage:2,
            }
        },
        methods:{
            ...mapMutations(['setPageNum','setCurPage']),
            search(){
                this.setCurPage(1);//换方式的时候要将页码置为1
                //根据标签Id查相关文章总数
                Axios.get("/selectByPlaceholder",{
                    params:{
                        inputVal:this.inputVal
                    }
                }).then(response=>{
                    console.log(response)
                    const pageNum = Math.ceil(response.data.data.length/this.tagsEveryPage);
                    this.setPageNum(pageNum);
                    this.$router.push({query:{
                            params:{
                                inputVal:this.inputVal
                            }
                        }});
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="sass">
    @import "@/assets/header.scss"
</style>
