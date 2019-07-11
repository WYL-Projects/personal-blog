const DButil = require("./DButil");
//插入一个tag
function  insertTag(params, success) {
    const connection = DButil.createConnection(),
        sql = "insert into tags(tag, ctime, utime) values(?,?,?)";
    connection.query(sql, params, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//查询所有tag标签
function selectAllTag(success) {
    const connection = DButil.createConnection(),
        sql = "select * from tags";
    connection.query(sql, function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err)
        }
    })
    connection.end();
}
//根据tag名称查询tag标签
function selectTag(params, success) {
    const connection = DButil.createConnection(),
        sql = "select * from tags where tag = ?";
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
    insertTag,
    selectTag,
    selectAllTag
};