const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = {
    status: "success",
    message: "hello, world!",
  };
  
  const test= ctx.cookies.get("user");
});

module.exports = router;
