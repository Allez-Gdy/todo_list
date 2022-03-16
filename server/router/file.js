const Router = require("koa-router");
const mysql = require("../mysql/mysql");
const fs = require("fs");
const path = require("path");
const file = new Router();

file.post("/avatarimg", async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, "../public/avatar-img/") + file.name;
  console.log(filePath);
  // 检测目录是否存在
  const fileDir = path.join(__dirname, "../public/avatar-img/");
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, (err) => {
      console.log(err);
      console.log("创建失败");
    });
  }
  const upStream = fs.createWriteStream(filePath);
  const pro = new Promise((resolve, reject) => {
    let stream = reader.pipe(upStream);
    stream.on("finish", function () {
      // resolve(`http://localhost:3200/avatar-img/${file.name}`);
      resolve(`http://82.157.165.58:3300/avatar-img/${file.name}`);
    });
  });
  let imgPath = await pro;
  ctx.body = {
    code: 1,
    message: "图片上传成功",
    data: {
      imgPath: imgPath,
    },
  };
  await next();
});

module.exports = file;
