const DButil = require("./DButil");
//插入评论信息
function insertComment(params, success) {
    const connection = DButil.createConnection(),
        sql = "insert into comments(comments, username, parent, parent_username, blog_id, email, ctime, utime) values(?,?,?,?,?,?,?,?)";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据博客id查找相关评论
function selectCommentsByBlogId(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM comments WHERE blog_id = ?";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据评论id查找相关评论
function selectCommentByCommentId(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM comments WHERE id = ?";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
function recentComment(success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM comments order by ctime limit 0,4";
    connection.query(sql, function (err, result) {
        if(!err)
            success(result);
        else{
            throw new Error(err)
        }
    })
}
module.exports = {
    insertComment,
    selectCommentsByBlogId,
    selectCommentByCommentId,
    recentComment
}