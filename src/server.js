const fs = require("fs");
const path = require("path");
const https = require("https");

const { mongoConnect } = require("./services/mongodb.js");

const PORT = process.env.PORT || 8080;

const app = require("./app");

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "keys", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "keys", "cert.pem")),
};

const server = https.createServer(httpsOptions, app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
  });
}

startServer();
