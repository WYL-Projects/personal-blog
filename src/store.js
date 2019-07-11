import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import Axios from "axios"
import { ColorfulLabelCloud } from "@/utils/util.js"
export default new Vuex.Store({
  state: {
     //是否执行Colorful函数
      isRunColorful:true,
      disorderLabels:[],
      labelNameCorId:{},//标签id对应标签名称
      curPage:1,//当前页码,
      pageNum:0,//总页数
      blogsTags:[],//查到的blog数，级点击就可以进入博客详情的
      parentUser:null,   //父级名称，即回复别人（指父级的名称）
      commentsObj:{},  //这个类包含单个页面的评论总数和评论信息
  },
  mutations: {
      setIsRunColorful(state, isRunColorful){
        state.isRunColorful = isRunColorful;
      },
      setCurPage(state, curPage){
         state.curPage = curPage;
      },
      setPageNum(state, pageNum){
         state.pageNum = pageNum
      },
      setBlogsTags(state, blogsTags){
         state.blogsTags = blogsTags;
      },
      setParentUser(state, parentUser){
          state.parentUser = parentUser;
      },
      setCommentsObj(state, commentsObj){
          state.commentsObj = commentsObj;
      },
      setCommentsCount(state, commentsCount){
          state.commentsCount = commentsCount;
      },
      setRandomLabels(state, disorderLabels){
          state.disorderLabels = disorderLabels;
      },
      setLabelNameCorId(state, labelNameCorId){
         state.labelNameCorId = labelNameCorId
      }
  }
  ,
  actions: {
      //由于这个方法多个组件需要调用所以，根据blogID获取评论信息
      getCommentsByBlogId({commit}, {curObj, oBlogId}){
          const that = curObj;
          Axios.get("/getCommentsByBlogId", {
              params:{
                  blogId:oBlogId||that.$route.query.blogId//如果oBlogId存在的话说明是需要查找关于界面，和留言界面的评论
              }
          }).then(function (response) {
              console.log(response)
              let commentsCount = response.data.data.length;
              let comments = response.data.data;
              commit('setCommentsObj',{commentsCount, comments})
          }).catch(err=>{
              console.log(err)
          })
      },
      selectAllTag({commit}){
          Axios.get("/selectAllTag").then(function (response) {
              console.log("执行了")
              let labels = [],labelNameCorId={};
              response.data.data.forEach(ele=>{
                  labels.push(ele.tag)
                  labelNameCorId[ele.tag] = ele.id;
              });
              labels = labels.sort((a,b)=>{
                  return Math.random()>0.5?(a.length-b.length):(b.length - a.length)
              })
              commit('setRandomLabels', labels)//将打乱后的标签给disorderLabels
              commit('setLabelNameCorId', labelNameCorId)//给每个标签添加标志
              setTimeout(function () {
                  ColorfulLabelCloud(document.getElementsByClassName("label1"))
              },50)
          }).catch(err=>{
              console.log(err)
          })
      }
  }
})
