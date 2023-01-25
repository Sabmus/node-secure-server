const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

require("./middlewares/auth");

const apiRouter = require("./routes/api.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

/** Middlewares */
// Secure by setting various HTTP Headers
app.use(helmet());
// CORS
app.use(cors());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// HTTP request logger
app.use(morgan("combined"));
// static files
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/v1", apiRouter);

app.get("/", (req, res) => {
  return res.render("index", {
    title: "Home",
    user: req.user,
  });
});

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      secret: 42,
    });
  }
);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
