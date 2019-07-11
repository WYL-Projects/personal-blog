<template>
    <div class="panel">
        <label-title :title="title"/>
        <slot></slot>
    </div>
</template>
<script>

import {mapState, mapActions} from  "vuex"
export default {
    components:{
        LabelTitle
    },
    props:["title"],
    created(){
        //获取所有标签
        // this.selectAllTag()
    },
    mounted(){

        console.log(this.$refs)
    },
    methods:{
        ...mapActions(['selectAllTag']),
    }
}
</script>