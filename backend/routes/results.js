const Router = require("koa-router");
const query = require("../db/queries/results.js");
const router = new Router();

const BASE_URL_RESULTS = "/results";
const BASE_URL_STATS = "/stats";

router
  .get(BASE_URL_RESULTS+"/:id", async (ctx) => {
    try {
      const result = await query.getResults(ctx.params.id);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  })
  .get(BASE_URL_STATS+"/:id", async (ctx) => {
    try {
      const stats = await query.getStats(ctx.params.id);
      ctx.status = 200;
      ctx.body = stats;
    }
    catch (error) {
      ctx.status = 400;
      ctx.body = error;

    }
  })
  .post(BASE_URL_RESULTS, async (ctx) => {
    try {
      const {user_id,wpm,raw,accuracy,mode,complited}=ctx.request.body;
      await query.addResult(user_id,wpm,raw,accuracy,mode,complited);
      ctx.status = 200;
      ctx.body = "added";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  });

module.exports = router;
