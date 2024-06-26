const Router = require("koa-router");
const passport = require("koa-passport");
const query = require("../db/queries/users");
const router = new Router();

const BASE_URL_LOG = "/login";
const BASE_URL_REG = "/register";

router
  .post(BASE_URL_LOG, async (ctx) => {
    try {
      const res = await query.checkUser(ctx.request.body);
      if (res.status) {
        ctx.status = 302;
        ctx.body = res.message;
        ctx.login(res.user);
      } else {
        ctx.status = 401;
        ctx.body = res.message;
        return;
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  })

  .post(BASE_URL_REG, async (ctx) => {
    try {
      if (await query.checkUserName(ctx.request.body)) {
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
        const user = await query.addUserLocal(ctx.request.body);
        return passport.authenticate("local", (err, user) => {
          if (user) {
            ctx.login(user);
            ctx.status = 201;
          } else {
            ctx.status = 400;
            ctx.body = err;
          }
        })(ctx);
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  });

module.exports = router;
