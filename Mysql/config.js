const fs = require("fs");
let configObj = {}, configArr=[];
configArr = fs.readFileSync("./server.conf").toString().split("\r\n");
configArr.forEach(ele=>{
    const tempArr = ele.split("=");
    configObj[tempArr[0]] = tempArr[1];
})
module.exports = configObj;