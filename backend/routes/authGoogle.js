const Router = require("koa-router");
const passport = require("koa-passport");
const router = new Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (ctx) => {
    ctx.session.isAuthenticated = true;
    ctx.session.user = ctx.state.user;
    ctx.redirect("/");
  }
);

module.exports = router;
