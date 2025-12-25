const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/policy", require("./routes/policy.routes"));

const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
