<template>
    <div class="squares">
        <div class="lastPageBtn" :class="{'boundary':curPage==1}" @click="reducePN(1)">&lt;</div>
        <div class="firstNum"  @click="getCurPage" 
        :class="{'active':curPage==1}">1</div>
        <div class="extendSymbol" v-if="curPage>4&&maxPage>7" 
            @mouseenter="focus1" 
            @mouseleave="unfocus"  @click="reducePN(5)">···</div>
            <!-- (maxPage>1&&maxPage<7?maxPage:7)代表最大页数至少为8页，
            如果小于8页将以普通方式展示 -->
        <div v-show="maxPage>1" v-for="item in ((maxPage>1&&maxPage<7?maxPage:7) - 2)" 
         :key="item" @click="getCurPage" :class="curPage==val(item)?'active':''">
           {{val(item)}}
        </div>
        <div class="extendSymbol" v-if="(curPage<maxPage-3)&&maxPage>7" 
        @mouseenter="focus" 
        @mouseleave="unfocus"
        @click="AddPN(5)">···</div>
        <div class="lastNum" @click="getCurPage" 
        :class="{'active':curPage==maxPage}" v-if="maxPage>1">{{maxPage}}</div>
        <div class="nextPageBtn" :class="{'boundary':curPage==maxPage}" @click="AddPN(1)">&gt;</div>
    </div>
</template>
<script>
import Axios from "axios"
import  {mapState, mapMutations} from "vuex"
export default {
    props:['maxPage', 'tagsEveryPage'],
    mounted(){
        this.getTagsByPageCode(this.curPage)
    },
    methods: {
        ...mapMutations(['setCurPage','setBlogsTags']),
        getCurPage(e){
            const curTarget = e.target;
            this.setCurPage(parseInt(curTarget.innerText))
        },
        reducePN(num){
            if(this.curPage-num>=1){
                this.setCurPage(this.curPage - num)
            }else{
                this.setCurPage( 1 )
                return false
            }
        },
        AddPN(num){
            if(this.curPage+num<=this.maxPage){
                this.setCurPage(this.curPage + num)
            }else{
                this.setCurPage(this.maxPage)
                return false;
            }
        },
        focus(e){
            e.target.innerText = "》"
            e.target.style.fontSize = "12px";
        },
        focus1(e){
            e.target.innerText = "《"
            e.target.style.fontSize = "12px";
        },
        unfocus(e){
            e.target.innerText = "···"
        },
        getTagsByPageCode(){
            if(!this.$route.query.tagId){
                //展示总标签
               this.oAxios('/getTagsByPageCode',  {
                    params:{
                        initVal:this.tagsEveryPage*(this.curPage - 1),
                        rowNum: this.tagsEveryPage
                    }
                })
            }else if(this.$route.query.inputVal){
                //展示搜索结果
                this.oAxios('/selectByPlaceholderByPage',  {
                    params:{
                        inputVal: this.$route.query.inputVal,
                        initVal:this.tagsEveryPage*(this.curPage - 1),
                        rowNum: this.tagsEveryPage
                    }
                })
            }else{
                //展示关联tagId的tag
                this.oAxios('/selectBlogByTag',  {
                    params:{
                        tagId:this.$route.query.tagId,
                        initVal:this.tagsEveryPage*(this.curPage - 1),
                        rowNum: this.tagsEveryPage
                    }
                })
            }
        },
        oAxios(url, params){
            const that =this;
            Axios.get(url, params).then(function (response) {
                const tagsEveryPage = response.data.data;
                that.setBlogsTags(tagsEveryPage);
            }).catch(function (err) {
                console.log(err);
            })
        }
    },
    computed: {
        ...mapState(['curPage','blogsTags']),
        //带有参数的计算属性只能这样写，通过js闭包原理
        val(){
            return function(item){
                //当前页面值小于等于4的时候都是等于item+1即2，3，4，5，6
                //当当前页面值大于最大值减4时，即96，序列为95，96，97，98，99
                 if(this.maxPage > 7){
                     return (this.curPage<=4)?(item+1):((this.curPage<=(this.maxPage - 4))?(this.curPage+item-3):((this.maxPage - 6)+item));
                 }else if(this.maxPage > 1){
                     return (item+1)
                 }else{
                     return item
                 }
            }
        }
    },
    //监听器，一旦curPage发生改变的话，触发该函数，这个针对没有选择标签的情况下；如果选择了标签的话，则需要监听两个
    watch:{
        curPage(){
            this.getTagsByPageCode(this.curPage);
        },
        $route(){
            this.getTagsByPageCode(this.curPage);
        }
    }
}
</script>
<style lang="scss">
    .squares{
    >div{
        display: inline-block;
        font-size: 16px;
        width: 30px;
        height: 30px;
        padding: 4px;
        cursor: pointer;
        color: #666;
        text-align: center;
        line-height: 30px;
        &:hover{
                color: #409eff;
        }
        &.lastPageBtn,&.nextPageBtn{
            &:hover{
                color: #909399;
            }
        }
        &.active{
            background: #1f1f1f;
            color: #fff;
            cursor:initial;
            border-radius: 3px;
        }
        &.boundary{
            color: rgba(#666, .5);
            cursor:no-drop;
        }
}
}
</style>

