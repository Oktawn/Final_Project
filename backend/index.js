const express = require("express");
const userRouter = require("./routes/userRouter");
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use("/api", userRouter);

app.listen(port, () => console.log(`server active ${port}`));
