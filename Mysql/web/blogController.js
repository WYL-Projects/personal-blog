const map = new Map(), blogDao = require("../dao/BlogDao"),tagDao = require("../dao/TagDao"),
    tag_blog_mappingDao = require("../dao/tag_blog_mappingDao")
    ctime = require("../util/getNowTime").getNowTime(),
    formStatus = require("../util/FormatStatus"),
    url = require("url");
//查找所有
function selectBlog(req, res){
    blogDao.selectAllArticle(function (result) {
        res.send(formStatus.FormatStatus(200,"插入成功", result));
    })
}
//分页查找
function selectBlogByPage(req, res){
    //获取参数，起始值和数据数，即从什么地方开始查，查多少行数据
    const reqUrl = url.parse(req.url, true).query,
        initVal = parseInt(reqUrl.initVal),rowNum = parseInt(reqUrl.rowNum);
    blogDao.selectArticleByPage([initVal, rowNum],function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result));
    })
}
//根据id查博客文章
function selectBlogById(req, res){
    //获取参数，起始值和数据数，即从什么地方开始查，查多少行数据
    const reqUrl = url.parse(req.url, true).query,
          blogId = parseInt(reqUrl.blogId);
    console.log(reqUrl)
    blogDao.selectArticleById([blogId],function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result));
    })
}
function  insertBlog(req, res) {
    //客户端请求的地址
    const reqUrl = url.parse(req.url, true).query
    //将tag标签按照逗号分开
    let title = reqUrl.title, tags = reqUrl.tags.replace(/ /g,"").replace("，",",");
    let content = "";
    req.on("data", function (data) {
        //先将</>之类标签变为空，然后再将<>之类标签变空
              content += data.toString();
    })
    req.on("end", function (data) {
        const params = [title, content, ctime, 20, reqUrl.tags, ctime];
        //插入文章
        blogDao.insertArticle(params,function (result) {
            let sendStr = "受影响行数为"+result.affectedRows;
            //检查每个标签是否存在
            tags.split(",").forEach(tag=>{
                selectTag(tag, result.insertId)
            });
            res.send(formStatus.FormatStatus(200,"插入成功", sendStr));
        })
    })
}
//根据标签名查询tag
function  selectTag(tag, blog_id){
    tagDao.selectTag([tag], function (result) {
        if(result[0]!=null){
            //存在则构建映射关系
            insertTag_blog_Mapping(result[0].id, blog_id)
        }else{
            //不存在则插入一个tag
            insertTag(tag, blog_id)
        }
    })
}
function insertTag(tag, blog_id) {
    tagDao.insertTag([tag, ctime, ctime],function (result) {
        //插入一个tag的同时插入一个映射关系
        insertTag_blog_Mapping(result.insertId, blog_id)
    })
}
function insertTag_blog_Mapping(tag_id, blog_id){
    tag_blog_mappingDao.insertTag_blog_Mapping([tag_id, blog_id, ctime, ctime],function (result) {

    })
}
//增加阅读数目
function addReadCount(req, res){
    const reqUrl = url.parse(req.url, true).query
    blogDao.addReadCount([reqUrl.blogId],function (result) {
        let sendStr = "受影响行数为"+result.affectedRows;
        res.send(formStatus.FormatStatus(200,"插入成功", sendStr));
    })
}
function recentHot(req, res){
    blogDao.recentHot(function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result));
    })
}
//模糊查询文章总数
function selectByPlaceholder(req, res){
    const reqUrl = url.parse(req.url, true).query;
    blogDao.selectByPlaceholder([reqUrl.inputVal],function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result));
    })
}
//模糊查询文章并分页
function selectByPlaceholderByPage(req, res){
    const reqUrl = url.parse(req.url, true).query;
    const initVal = parseInt(reqUrl.initVal),rowNum = parseInt(reqUrl.rowNum);
    blogDao.selectByPlaceholderByPage([reqUrl.inputStr, initVal, rowNum],function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result));
    })
}
map.set("insertBlog", insertBlog)
map.set("selectBlog", selectBlog)
map.set("selectBlogByPage", selectBlogByPage)
map.set("selectBlogById", selectBlogById)
map.set("addReadCount", addReadCount)
map.set("recentHot", recentHot)
map.set("selectByPlaceholder", selectByPlaceholder)
map.set("selectByPlaceholderByPage", selectByPlaceholderByPage)
module.exports = map;