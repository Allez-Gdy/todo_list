const Koa = require("koa");
const router = require("./router/index");
const cors = require("koa2-cors");
// const bodyParser = require("koa-bodyparser");
const koaBody = require("koa-body");
const check = require("./utils/check");
const static = require("koa-static");
const path = require("path");
const port = 3300;

const app = new Koa();

// 解析post请求参数
// app.use(bodyParser());
app.use(koaBody({ multipart: true }));
//解决跨域
app.use(cors());
// app.use(check); // token 验证
app.use(static(path.join(__dirname, "public")));
/**
 * router.routes() 启动路由
 * router.allowedMethods() 允许访问任何请求 post get put delete 。。。
 */
app.use(router.routes(), router.allowedMethods());

app.listen(port, () => {
  console.log("server is running at http://localhost:" + port);
  // console.log("server is running at http://82.157.165.58:" + port);
});
