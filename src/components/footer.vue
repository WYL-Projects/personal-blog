<template>
    <div class="footer">
        <p class="labelSet">
            <router-link v-for="(item,index) in labelArray" :key="index"  to="/about">{{item}}</router-link>
        </p>
        <p class="copyright">
            Copyright © 2010-2017
            <router-link to="/">郑晓个人博客</router-link> 
            All rights reserved. 由免费开源的<router-link to="/" >WordPress</router-link>强力驱动. <router-link to="/" >鲁ICP备14017955号</router-link><router-link to="/">站长统计</router-link>
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            labelArray:['C/C++', 'CSS/DIV', 'java', 'javacript', 'Linux', 'Mac', 'PC技术', 
            'PHP', 'Python', 'Raspberry', 'Ubuntu', 'wordpress', '关于SEO分享经验',
             '听听音乐', '幽默搞笑', '建站经验', '新闻资讯', '模拟飞行', '片言碎语', '玩转手机',
              '编程基础', '视频分享']
        }
    }
}
</script>