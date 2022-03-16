const mysql = require("./mysql");
// 查询所有事项
let findAllMatter = function (userId) {
  let _sql = `select * from task_list where userId="${userId}"`;
  return mysql.query(_sql);
};

let addMatter = function (value) {
  let _sql = `insert into task_list set userId=${value.userId},content='${value.content}',state=${value.state},createdAt='${value.createdAt}',updatedAt='${value.updatedAt}',sort='${value.sort}';`;
  return mysql.query(_sql, value);
};

let updateTaskState = function (taskId, userId, state) {
  let _sql = `update task_list set state=${state} where id=${taskId} and userId=${userId};`;
  return mysql.query(_sql);
};

module.exports = {
  findAllMatter,
  addMatter,
  updateTaskState,
};
