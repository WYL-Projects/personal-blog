import Vue from 'vue'
import Router from 'vue-router'
const About = ()=>import("@/views/About.vue"),
 Map1 = ()=>import("@/views/Map.vue"),
 Guestbook = ()=>import("@/views/Guestbook.vue"),
 Index = ()=>import("@/views/index.vue"),
 mainLeft = ()=>import("@/components/index/mainLeft.vue"),
 Detail = ()=>import("@/components/detail.vue"),
 ErrorPage = ()=>import("@/error/404.vue")
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        //为了使得相同的区域
        path:"/",
        component:Index,
        children:[
          {
            path:"/",
            component:mainLeft,
            name:"mainLeft"
          },
          {
            path:"/guestbook",
            component:Guestbook,
            name:"Guestbook"
          },
          {
            path:"/about",
            component:About,
            name:"About"
          },
          {
            path:"/detail",
            component:Detail,
            name:"Detail"
          }
        ]
      },
      {
        path:"/sitemap.html",
        component:Map1,
        name:"Map"
      },
      {
        path:"*",
        component:ErrorPage
      }
  ]
})
