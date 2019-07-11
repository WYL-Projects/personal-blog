const mysql = require("mysql");
function  createConnection() {
     const connection = mysql.createConnection({
          host: "localhost",
          port:"3306",
          database:"personal blog",
          user:"root",
          password:"wyl123"
     })
     connection.connect();
     console.log("服务已经启动!");
     return connection;
}
module.exports.createConnection = createConnection;