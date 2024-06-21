const Koa = require("koa");
const mainRouter = require("./routes/routes");
const testsRouter = require("./routes/tests");
require("dotenv").config();
const app = new Koa();
app.use(mainRouter.routes(), mainRouter.allowedMethods());
app.use(testsRouter.routes(), testsRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.body = {
    status: "success",
    message: "hello, world!",
  };
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = server;
