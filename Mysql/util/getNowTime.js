function getNowTime() {
    return parseInt(Date.now()/1000); //获取距离1970年1月1日的秒数
}
module.exports.getNowTime = getNowTime;