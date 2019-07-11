<template>
    <div class="index-container">
        <Header/>
        <main class="main">
            <div class="left"><router-view ></router-view></div>
            <MainRight/>
        </main>
        <Footer/>
    </div>
</template>
<script>
import Header from "@/components/header.vue"
import MainLeft from "@/components/index/mainLeft.vue"
import MainRight from "@/components/index/mainRight.vue"
import Footer from "@/components/footer.vue"
export default {
    data(){
        return{
            
        }
    },
    components:{
        Header,
        MainLeft,
        MainRight,
        Footer
    }
}
</script>
<style lang="sass">
    // @import "../assets/index" 相对路径
    @import "@/assets/index.scss"
</style>

