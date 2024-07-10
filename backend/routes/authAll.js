const Router = require("koa-router");
const query = require("../db/queries/users");
const router = new Router();

const BASE_URL_LOG = "/login";
const BASE_URL_REG = "/register";

//router local registration
router.post(BASE_URL_REG, async (ctx) => {
  try {
    const { username, email, password } = ctx.request.body;
    if (!username || !email || !password) {
      ctx.throw(400, "no full info");
    }
    const ans = await query.checkNewUser(username, email);
    ans.forEach((row) => {
      if (row.username === username && row.email === email)
        ctx.throw(409, "username and email already exists");
      if (row.username === username) ctx.throw(409, "username already exists");
      if (row.email === email) ctx.throw(409, "Email already exists");
    });
    const user = await query.addUserLocal(username, email, password);
    const newUser = await query.getUser(user[0].email);
    ctx.cookies.set("user", JSON.stringify(newUser[0]), { maxAge: 86400000 });
    ctx.status = 201;
  } catch (error) {
    ctx.status = error.status || 400;
    ctx.body = error;
  }
});

//router local login and logout

router.post(BASE_URL_LOG, async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const ans = await query.checkUser(username, password);
    if (!ans.status) {
      ctx.throw(401, ans.mes);
    }

    if (ctx.cookies.get("user")) {
      console.log("already");
      return;
    }

    const user = ans.user;
    console.log("user", user);
    ctx.cookies.set("user", JSON.stringify(user),{ 
      maxAge: 360000000000, 
      httpOnly: false, 
    });
    console.log("User cookie:", ctx.cookies.get("user"));
    ctx.status = 200;
  } catch (error) {
    console.error('Ошибка входа:', error);
  }
});

router.get("/logout", (ctx) => {
  ctx.cookies.set("user", null, { expires: new Date(0) })
  ctx.redirect(BASE_URL_LOG);
});

module.exports = router;
