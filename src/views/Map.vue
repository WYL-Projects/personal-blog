<template>
    <div class="siteMap">
        <p class="map-title">靓仔个人博客's siteMap</p>
        <p class="nav">
            <router-link to="/">靓仔个人博客</router-link>
              >
             <router-link to="/sitemap.html">站点地图</router-link>
        </p>
        <div class="latest-article">
            <p class="latest-article-title">最新文章</p>
            <ul class="siteSet">
                <li v-for="(site,index) in siteArray" :key="index" class="site">
                <router-link :to="{path:'/detail', query:{blogId: site.blogId}}"  :title="item">{{site.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Axios from "axios"
export default {
    components:{
        
    },
    data() {
        return {
            siteArray:[],
        }
    },
    created() {
        this.getBlog();
    },
    methods:{
        //axios获取博客文章的总数目
        getBlog(){
            const that = this;
            Axios.get("/getBlog").then(function (response) {
                const allblogs = response.data.data;
                allblogs.forEach(ele=>{
                    that.siteArray.push({title:ele.title, blogId:ele.id})
                })
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="sass" scoped>
    @import "@/assets/siteMap.scss"
</style>

