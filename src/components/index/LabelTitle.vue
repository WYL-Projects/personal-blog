<template>
    <p class="label-title">{{title}}</p>
</template>
<script>
import  {Colorful}  from "@/utils/util.js"
export default {
    mounted() {
        //只让它执行一次，防止出现颜色抖动
        if(this.$store.state.isRunColorful){
          this.$store.commit("setIsRunColorful",false);
          Colorful("label-title", [175,72,72],210,50);
        }
    },
    props:{
        title:String
    }
}
</script>