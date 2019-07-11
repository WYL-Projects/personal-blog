const DButil = require("./DButil");
function  insertTag_blog_Mapping(params, success) {
    const connection = DButil.createConnection(),
        sql = "insert into tag_blog_mapping(tag_id,blog_id,ctime,utime) values(?,?,?,?)";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据标签Id查相关文章总数
function selectBlogCountByTag(params, success) {
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM blog WHERE id IN (SELECT blog_id FROM tag_blog_mapping  WHERE  tag_id = ?)";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据标签Id查相关文章并分页
function selectBlogByTag(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM blog WHERE id IN (SELECT blog_id FROM tag_blog_mapping  WHERE  tag_id = ?) order by ctime desc limit ?,? ";
        console.log(params)
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
module.exports.insertTag_blog_Mapping = insertTag_blog_Mapping
module.exports.selectBlogByTag = selectBlogByTag
module.exports.selectBlogCountByTag = selectBlogCountByTag