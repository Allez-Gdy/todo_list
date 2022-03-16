const Router = require("koa-router");
const email = new Router();
const SandVerification = require("../utils/nodemailer");
const mysql = require("../mysql/mysql");
let emailCodes = require("../utils/emailCodes");
email.get("/email", async (ctx, next) => {
  let email = ctx.query.email;
  await mysql.findUserEmail(email).then((res) => {
    if (res.length !== 0) {
      return (ctx.body = {
        code: 0,
        message: "邮箱已被注册",
      });
    } else {
      let emailCode = "";
      for (let i = 0; i < 6; i++) {
        emailCode += Math.floor(Math.random() * 10);
      }
      emailCodes.push({
        id: emailCodes.length + 1,
        email: email,
        emailCode: emailCode,
      });
      SandVerification(emailCode, email).then(async (res) => {
        console.log("发送成功");
      });
      return (ctx.body = {
        code: 1,
        message: "发送成功",
      });
    }
  });
});

module.exports = {
  email,
};
