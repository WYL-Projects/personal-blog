const map = new Map(), commentsDao = require("../dao/CommentDao"),
    ctime = require("../util/getNowTime").getNowTime(),
    formStatus = require("../util/FormatStatus"),
    url = require("url"),
    //调用验证码的包
    svgCaptcha = require("svg-captcha");
function insertComment(req, res) {
    //获取插入评论接口的参数
    const reqUrl = url.parse(req.url, true).query;
    const params = [reqUrl.content, reqUrl.name, reqUrl.parent,reqUrl.replyLastUser, reqUrl.blogId, reqUrl.email, ctime, ctime];
    commentsDao.insertComment(params, function (result) {
        let sendStr = "受影响行数为"+result.affectedRows;
        res.send(formStatus.FormatStatus(200,"插入成功", sendStr))
    })
}
//获取验证码
function getValidateCode(req, res){
    //验证码的相关属性
    const option = {
        size: 4,  //验证码长度
        width: 150,
        height: 40,
        background: "#909399",
        noise: 2,//干扰线条数
        fontSize: 32,
        ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    }
    const img = svgCaptcha.create(option);
    res.send(formStatus.FormatStatus(200,"获取验证码成功", img))
}
function selectCommentsByBlogId(req, res){
    //获取博客id查询
    const reqUrl = url.parse(req.url, true).query;
    console.log(reqUrl.blogId,typeof  reqUrl.blogId)
    commentsDao.selectCommentsByBlogId([reqUrl.blogId], function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
function selectCommentByCommentId(req, res){
    //获取博客id查询
    const reqUrl = url.parse(req.url, true).query;
    commentsDao.selectCommentsByBlogId([reqUrl.commentId], function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
function recentComment(req, res){
    commentsDao.recentComment(function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
map.set("insertComment",insertComment);
map.set("getValidateCode",getValidateCode);
map.set("selectCommentsByBlogId", selectCommentsByBlogId);
map.set("selectCommentByCommentId", selectCommentByCommentId);
map.set("recentComment", recentComment);
module.exports = map;