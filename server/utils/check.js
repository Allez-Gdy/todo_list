const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);

async function check(ctx, next) {
  let url = ctx.request.url;
  url = url.split("/");

  // 登录 不用检查
  let reqUrl = url[url.length - 1];
  // console.log("url", url[url.length - 2]);
  // console.log(reqUrl);
  if (
    reqUrl == "login" ||
    reqUrl == "register" ||
    url[url.length - 2] == "email" ||
    url[url.length - 2] == "avatar-img" ||
    url[url.length - 2] == "file"
  ) {
    await next();
  } else {
    // 规定token写在header 的 'autohrization'
    let token = ctx.request.headers["authorization"];
    // console.log(ctx.request.headers);
    // console.log(token);
    // 解码
    let payload = await verify(token, "secret");
    let { time, timeout } = payload;
    // console.log(time, timeout);
    let data = new Date().getTime();
    if (data - time <= timeout) {
      // 未过期
      console.log("没过期");
      await next();
    } else {
      // 过期
      console.log("过期");
      ctx.body = {
        code: 0,
        message: "token 已过期",
      };
    }
  }
}

module.exports = check;
