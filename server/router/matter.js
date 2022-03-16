const Router = require("koa-router");
const matter = new Router();
const matterFn = require("../mysql/matter");

// 获取所有事项
matter.get("/all", async (ctx, next) => {
  let userId = ctx.query.userId;
  await matterFn
    .findAllMatter(userId)
    .then((res) => {
      ctx.body = {
        code: 1,
        message: "查询成功",
        data: {
          taskList: res,
        },
      };
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
});

// 添加事项
matter.post("/add", async (ctx, next) => {
  let value = ctx.request.body;
  await matterFn
    .addMatter(value)
    .then((res) => {
      ctx.body = {
        code: 1,
        message: "添加成功",
      };
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
});

// 改变事项状态
matter.post("/changeState", async (ctx, next) => {
  let { id, userId, state } = ctx.request.body;
  console.log(id, userId, state);
  await matterFn
    .updateTaskState(id, userId, state)
    .then((res) => {
      ctx.body = {
        code: 1,
        message: "更新成功",
      };
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
});

module.exports = matter;
