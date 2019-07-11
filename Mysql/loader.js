const fs = require("fs"), configObj = require("./config");
const map = new Map();
const files = fs.readdirSync(configObj.web_path);
files.forEach(ele=>{
     const controllerMap = require(configObj.web_path+"/"+ele);
     if(controllerMap) {
         for (let [k, v] of controllerMap) {
            if(!map.get(k)){
                map.set(k,v);
            }else{
                //一个url只能对应一个方法，不能有一样的
                throw new Error("url异常错误");
            }
         }
     }
})

module.exports = map;