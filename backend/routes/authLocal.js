const Router = require("koa-router");
const passport = require("koa-passport");
const query = require("../db/queries/users");
const router = new Router();

const BASE_URL_LOG = "/login";
const BASE_URL_REG = "/register";

router.post(BASE_URL_REG, async (ctx) => {
  try {
    if (await query.checkUser(ctx.request.body)) {
      console.log("check login");
      ctx.status = 409;
      ctx.body = "username already taken";
      return;
    } else if (await query.checkEmail(ctx.request.body)) {
      console.log("check email");
      ctx.status = 409;
      ctx.body = "email already taken";
      return;
    } else {
      const res = await query.addUserLocal(ctx.request.body);
      ctx.status = 201;
      ctx.body = res;
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
