const Router = require("koa-router");
const user = new Router();
const mysql = require("../mysql/mysql");
const email = require("./email");
const jwt = require("jsonwebtoken");
let emailCodes = require("../utils/emailCodes");

// 登录
user.post("/login", async (ctx) => {
  let { userEmail, userPassword } = ctx.request.body;
  await mysql.findUserEmail(userEmail).then((res) => {
    console.log(res);
    if (res.length === 0) {
      return (ctx.body = {
        code: 0,
        message: "账号并未注册",
      });
    } else {
      if (userPassword !== res[0].userPwd) {
        return (ctx.body = {
          code: 0,
          message: "密码错误",
        });
      } else {
        let payload = {
          userEmail: userEmail,
          time: new Date().getTime(),
          timeout: 1000 * 60 * 60 * 24,
        };
        let token = jwt.sign(payload, "secret");
        return (ctx.body = {
          code: 1,
          message: "登录成功",
          data: {
            token: token,
            user: {
              id: res[0].userId,
              username: res[0].userName,
              avatar: res[0].userAvatar,
              email: userEmail,
              // gender: res[0].gender,
              // birthday: res[0].birthday,
              // profession: res[0].profession,
            },
          },
        });
      }
    }
  });
});

// 注册
user.post("/register", async (ctx, next) => {
  let { username, password, email, emailCode, avatarImg } = ctx.request.body;
  console.log("avatarImg" + avatarImg);
  let filte = emailCodes.filter((item) => {
    return item.email === email;
  });
  let len = filte.length;
  // 判断是否是获取了验证码的邮箱及验证码正确性
  if (len == 0) {
    return (ctx.body = {
      code: 0,
      message: "请输入获取验证码的邮箱",
    });
  } else {
    if (filte[len - 1].emailCode !== emailCode) {
      return (ctx.body = {
        code: 0,
        message: "验证码不正确",
      });
    } else {
      ctx.body = {
        code: 1,
        message: "验证码正确",
      };
    }
  }

  await mysql.findUserData(username).then(async (res) => {
    if (res.length) {
      return (ctx.body = {
        code: 0,
        message: "用户名重复",
      });
    } else {
      await mysql
        .insertData([username, password, email, avatarImg])
        .then(async (res) => {
          if (res.warningCount === 0 && res.affectedRows === 1) {
            console.log("成功");
            return (ctx.body = {
              code: 1,
              message: "注册成功",
            });
          } else {
            console.log("失败");
            return (ctx.body = {
              code: 0,
              message: "注册失败",
            });
          }
        });
    }
  });
  await next();
});

module.exports = user;
