const map = new Map(), everydayDao = require("../dao/EverydayDao"),
    ctime = require("../util/getNowTime").getNowTime(),
    formStatus = require("../util/FormatStatus");
function insertEveryday(req, res) {
    req.on("data", function (data) {
        const params = [data.toString().trim(), ctime];
        everydayDao.insertEvery_day(params, function (result) {
            let sendStr = "受影响行数为"+result.affectedRows;
            res.send(formStatus.FormatStatus(200,"插入成功", sendStr))
        })
    })
}
function selectEvery_day(req, res) {
        everydayDao.selectEvery_day(function (result) {
            res.send(formStatus.FormatStatus(200,"查询成功", result))
        })
}
map.set("insertEveryday",insertEveryday);
map.set("selectEvery_day",selectEvery_day);
module.exports = map;