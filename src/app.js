const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookierParser = require("cookie-parser");
require("dotenv").config({ path: path.join(__dirname, ".env") });

require("./middlewares/auth");

const apiRouter = require("./routes/api.router");
const secretRouter = require("./routes/secret.router");

const app = express();

/** Middlewares */
// Secure by setting various HTTP Headers
app.use(helmet());
// CORS
app.use(cors());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// for store cookies
app.use(cookierParser("secret"));
// HTTP request logger
app.use(morgan("combined"));
// static files
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/v1", apiRouter);
app.use("/secret", secretRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World!",
  });
});

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
