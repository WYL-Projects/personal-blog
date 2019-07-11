const DButil = require("./DButil");
//插入文章信息
function  insertArticle(params, success) {
    const connection = DButil.createConnection(),
        sql = "insert into blog(title,content,utime,readCount,tags,ctime) values(?,?,?,?,?,?)";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//查询所有文章
function selectAllArticle(success) {
    const connection = DButil.createConnection(),
        sql = "select * from blog ";
    connection.query(sql, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据参数分页查询
function selectArticleByPage(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM blog order by ctime desc LIMIT ?,?" ;
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据blogId查询对应的文章
function selectArticleById(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM blog WHERE id = ?" ;
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
function addReadCount(params, success){
    const connection = DButil.createConnection(),
        sql = "UPDATE  blog SET readCount = readCount+1 WHERE id = ?";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
function recentHot(success){
    const connection = DButil.createConnection(),
        sql = "select title,id from blog order by readCount desc limit 0,10";
    connection.query(sql,function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//模糊查询文章总数
function selectByPlaceholder(params, success){
    const connection = DButil.createConnection(),
        //这里的sql语句字符串需要注意一下
        sql = "SELECT * FROM blog WHERE title LIKE '%"+params[0]+"%'";
    console.log(params)
    connection.query(sql, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//模糊查询文章并分页
function selectByPlaceholderByPage(params, success){
    const connection = DButil.createConnection(),
        sql = "SELECT * FROM blog WHERE title LIKE '%?%' limit ?,?" ;
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
module.exports = {
    insertArticle,
    selectAllArticle,
    selectArticleByPage,
    selectArticleById,
    addReadCount,
    recentHot,
    selectByPlaceholder,
    selectByPlaceholderByPage
};