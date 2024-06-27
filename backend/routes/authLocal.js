const Router = require("koa-router");
const passport = require("koa-passport");
const query = require("../db/queries/users");
const router = new Router();

const BASE_URL_LOG = "/login";
const BASE_URL_REG = "/register";

router
  .post(BASE_URL_LOG, async (ctx) => {
    try {
      const { username } = ctx.request.body;
      const res = await query.checkUser(ctx.request.body);
      if (res.status) {
        ctx.status = 302;
        ctx.body = res.message;
        ctx.session.isAuthenticated = true;
        ctx.session.user = query.getUser(username);
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
      const { username, email, password } = ctx.request.body;
      if (await query.checkUserName(username)) {
        ctx.status = 409;
        ctx.body = "username already taken";
        return;
      } else if (await query.checkEmail(email)) {
        ctx.status = 409;
        ctx.body = "email already taken";
        return;
      } else {
        const user = await query.addUserLocal(username, email, password);
        ctx.session.isAuthenticated = true;
        ctx.session.user = user;
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  });

module.exports = router;
