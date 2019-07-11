const  express = require("express"), map = require("./loader");
const  app = express(), fs =require("fs");
const path = require('path');
app.use(express.static("../dist"));
app.use(express.static("./bootstrap-wysiwyg-master"));
//获取每日一句
app.get("/getEveryday",function (req, res) {
    map.get("selectEvery_day")(req,res);
})
//获取所有博客信息
app.get("/getBlog",function (req, res) {
    map.get("selectBlog")(req,res);
})
//分页获取博客
app.get("/getTagsByPageCode",function (req, res) {
    map.get("selectBlogByPage")(req,res);
})
app.get("/getArticleById",map.get("selectBlogById"))
//上传编辑好的每日一句
app.post("/edit-every-sentence",function (req,res) {
    map.get("insertEveryday")(req,res);
})
//上传编辑好的文章信息
app.post("/edit-Blog",function (req,res) {
    map.get("insertBlog")(req,res);
})
//上传评论
app.get("/uploadComment", map.get("insertComment"));
//获取验证码
app.get("/get-img-verify", map.get("getValidateCode"));
//博客详情页获取评论
app.get("/getCommentsByBlogId", map.get("selectCommentsByBlogId"));
//点击进入详情页增加阅读数目
app.get("/addReadCount", map.get("addReadCount"));
//获得最新热门
app.get("/recentHot", map.get("recentHot"));
//获得最新评论
app.get("/recentComment", map.get("recentComment"));
//根据评论Id得到评论
app.get("/getCommentByCommentId", map.get("selectCommentByCommentId"));
//查询所有的标签
app.get("/selectAllTag", map.get("selectAllTag"));
//根据标签Id查相关文章并分页
app.get("/selectBlogByTag", map.get("selectBlogByTag"));
//根据标签Id查相关文章总数
app.get("/selectBlogCountByTag", map.get("selectBlogCountByTag"));
//模糊查询文章总数
app.get("/selectByPlaceholder", map.get("selectByPlaceholder"));
//模糊查询文章并分页
app.get("/selectByPlaceholderByPage", map.get("selectByPlaceholderByPage"));
app.get('*', function (req, res) {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html);
});
app.listen(80);