<template>
  <div>
  <div class="tag">
     <!--  不同的标题点击可以链接到不同的详情页  参数为各个文章的id值 -->
    <p class="tagTitle"><router-link :to="{path:'/detail',query:{blogId:blogTag.id}}">{{blogTag.title}}</router-link></p>
    <div class="tagContent">{{content}}</div>
  </div>
  <p class="tag-info">
      <span>发布于{{publishTime(blogTag.ctime)}}</span>
      |
      <span>浏览({{blogTag.readCount}})</span>
      |
      <span>Tags：<router-link to="/">{{blogTag.tags}}</router-link></span>
    </p>
  </div>
</template>
<script>
export default {
    props:["blogTag"],
    computed:{
        //规定content只能有200长度
        content(){
            return this.blogTag.content.length > 200?(this.blogTag.content.replace(/<\s*\/?\s*[a-zA-z_]([^>]*?["][^"]*["])*[^>"]*>/g, "").substring(0, 200)+"...."):
                this.blogTag.content;
        },
        publishTime(){
            return function (ctime) {
                const date = new Date(ctime*1000),
                    Y = date.getFullYear() + '-',
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                    D = date.getDate() + ' ';
                return Y+M+D;
            }
        }
    }
}
</script>