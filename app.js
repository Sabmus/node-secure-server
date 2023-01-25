const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

require("./middlewares/auth");

const apiRouter = require("./routes/api.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

/** Middlewares */
// Secure by setting various HTTP Headers
app.use(helmet());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// CORS
app.use(cors());
// HTTP request logger
app.use(morgan("combined"));
// static files
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.render("index", {
    title: "Home",
    user: req.user,
  });
});

app.use("/v1", apiRouter);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
