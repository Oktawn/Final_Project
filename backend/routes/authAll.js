const Router = require("koa-router");
const query = require("../db/queries/users");
const router = new Router();

const BASE_URL_LOG = "/login";
const BASE_URL_REG = "/register";

const ensureAuthenticated = async (ctx, next) => {
  if (ctx.session && ctx.session.user) {
    ctx.body = { mes: "logout" };
    await next();
  } else {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized" };
  }
};

//router local registration
router.post(BASE_URL_REG, async (ctx) => {
  try {
    const { username, email, password } = ctx.request.body;
    console.log(username, email, password);
    if (!username || !email || !password) {
      ctx.throw(400, "no full info");
    }
    if (await query.checkUserName(username)) {
      ctx.throw(409, "username already exists");
    }
    if (await query.checkEmail(email)) {
      ctx.throw(409, "Email already exists");
    }
    const user = await query.addUserLocal(username, email, password);
    ctx.status = 201;
    ctx.body = { message: "Registration successful", user: ctx.session.user };
    ctx.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    ctx.redirect("/status");
  } catch (error) {
    ctx.status = error.status || 400;
    ctx.body = error;
  }
});

//router local login and logout

router.post(BASE_URL_LOG, async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const ans = await query.checkUser(email, password);
    if (!ans.status) {
      ctx.throw(401, ans.mes);
    }
    const user = ans.user;
    ctx.session.user = {
      id: user[0].user_id,
      username: user[0].username,
      email: user[0].email,
      avatar: user[0].avatar,
      created_at: user[0].created_at,
    };
    ctx.redirect("/status");
  } catch (error) {
    ctx.status = error.status || 400;
    ctx.body = error;
  }
});

router.get("/status", async (ctx) => {
  if (ctx.session && ctx.session.user) {
    ctx.redirect("/");
  } else {
    ctx.body = { isAuthenticated: false };
    ctx.redirect(BASE_URL_LOG);
  }
});
router.get("/logout", ensureAuthenticated, (ctx) => {
  ctx.session = null;
  ctx.redirect(BASE_URL_LOG);
});

module.exports = router;
module.exports.ensureAuthenticated = ensureAuthenticated;