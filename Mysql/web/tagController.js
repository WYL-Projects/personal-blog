const map = new Map(), tagDao = require("../dao/TagDao"), tag_blog_mappingDao = require("../dao/tag_blog_mappingDao"),
    ctime = require("../util/getNowTime").getNowTime(),
    formStatus = require("../util/FormatStatus");
function selectAllTag(req, res){
    tagDao.selectAllTag(function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
//根据标签Id查相关文章总数
function selectBlogCountByTag(req, res){
    const reqUrl = url.parse(req.url, true).query;
    tag_blog_mappingDao.selectBlogCountByTag([reqUrl.tagId], function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
//点击标签时，//根据标签Id查相关文章并分页
function selectBlogByTag(req, res){
    const reqUrl = url.parse(req.url, true).query, initVal = parseInt(reqUrl.initVal),rowNum = parseInt(reqUrl.rowNum);
    tag_blog_mappingDao.selectBlogByTag([reqUrl.tagId, initVal, rowNum], function (result) {
        res.send(formStatus.FormatStatus(200,"查询成功", result))
    })
}
map.set("selectAllTag",selectAllTag);
map.set("selectBlogByTag",selectBlogByTag);
map.set("selectBlogCountByTag",selectBlogCountByTag)
module.exports = map;