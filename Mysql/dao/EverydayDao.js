const DButil = require("./DButil");
function  insertEvery_day(params, success) {
    const connection = DButil.createConnection(),
        sql = "insert into every_day(content,ctime) values(?,?)";
        connection.query(sql, params, function (err, result) {
            if(!err){
                success(result);
            }else{
                throw new Error(err)
            }
        })
    connection.end();
}
function selectEvery_day(success){
    const connection = DButil.createConnection(),
        sql = "SELECT   * FROM every_day ORDER BY  id DESC  LIMIT 1";
    connection.query(sql,function (err, result) {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}
module.exports = {
    insertEvery_day,
    selectEvery_day
};