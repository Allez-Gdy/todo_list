const Router = require("koa-router");
const router = new Router();
const user = require("./user");
const email = require("./email");
const matter = require("./matter");
const file = require("./file");

router.get("/", async (ctx) => {
  ctx.body = "hello world";
});

router.use("/user", user.routes(), router.allowedMethods());
router.use("/email", email.email.routes(), router.allowedMethods());
router.use("/matter", matter.routes(), router.allowedMethods());
router.use("/file", file.routes(), router.allowedMethods());

module.exports = router;
