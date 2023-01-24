const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const usersRouter = require("./routes/users.router");

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
  });
});
app.use("/users", usersRouter);

module.exports = app;
