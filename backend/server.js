const Koa = require("koa");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const cors = require("@koa/cors");

const mainRouter = require("./routes/routes.js");
const testsRouter = require("./routes/tests.js");
const resultsRouter = require("./routes/results.js");
const authRouter = require("./routes/authAll.js");

const app = new Koa();
const PORT = process.env.PORT;

app.keys = [process.env.SECRET_KEY];
app.use(session(app));
app.use(bodyParser());
app.use(
  cors({
    credentials: true,
  }),
)

app.use(authRouter.routes());
app.use(mainRouter.routes());
app.use(testsRouter.routes());
app.use(resultsRouter.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
