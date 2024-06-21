const Router = require("koa-router");
const query = require("../db/queries/tests");
const router = new Router();

const BASE_URL = "/main";

router.get(BASE_URL, async (ctx) => {
  const test = await query.getTest(id);
  ctx.body = {
    status: "success",
    test: test,
  };
});

module.exports = router;
