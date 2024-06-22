const Router = require("koa-router");
const query = require("../db/queries/results.js");
const router = new Router();

const BASE_URL = "/results";

router
  .get(BASE_URL, async (ctx) => {
    const result = await query.getResults(ctx.query.id);
    try {
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  })
  .post(BASE_URL, async (ctx) => {
    const result = await query.addResult(ctx.request.body);
    try {
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  });

module.exports = router;
