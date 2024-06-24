const Koa = require("koa");
require("dotenv").config();
require("./auth/authLocal.js");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const pass = require("koa-passport");

const mainRouter = require("./routes/routes.js");
const testsRouter = require("./routes/tests.js");
const resultsRouter = require("./routes/results.js");
const authLocalRouter = require("./routes/authLocal.js");

const app = new Koa();
const PORT = process.env.PORT;

app.keys = [process.env.SECRET_KEY];
app.use(session(app));
app.use(bodyParser());

app.use(pass.initialize());
app.use(pass.session());

app.use(mainRouter.routes());
app.use(testsRouter.routes());
app.use(resultsRouter.routes());
app.use(authLocalRouter.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
