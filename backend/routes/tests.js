const Router = require("koa-router");
const query = require("../db/queries/tests.js");
const router = new Router();

const BASE_URL = "/main";

router.get(BASE_URL, async (ctx) => {
  try {
    const test = await query.getTest(ctx.query.mode, ctx.query.size);
    ctx.status = 200;
    ctx.body = test;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
