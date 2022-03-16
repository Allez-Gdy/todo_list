const mysql = require("mysql");
const code = require("../utils/code");
// console.log(mysql);
// 创建数据池
const pool = mysql.createPool({
  // host: "82.157.165.58", // 数据库地址
  host: "localhost",
  port: "3306",
  user: "root", // 数据库用户
  password: "root", // 数据库密码
  database: "todolist", // 选中数据库
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("数据库连接成功");
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

// 注册用户
let insertData = function (value) {
  let _sql = "insert into users set username=?,password=?,email=?,avatar=?;";
  return query(_sql, value);
};

// 查询用户
let findUserData = function (name) {
  let _sql = `select * from users where username="${name}";`;
  return query(_sql);
};

// 查询邮箱
let findUserEmail = function (email) {
  let _sql = `select * from users where userEmail="${email}"`;
  return query(_sql);
};

module.exports = {
  query,
  insertData,
  findUserData,
  findUserEmail,
};
