const dev = require("./config/dev.js");
const product = require("./config/prod.js");

const config = {
  host: "127.0.0.1",
  port: "8088",
  proxy: {
    "/cts": "http://82.156.254.84:8080",
  },
};

module.exports =
  process.env.NODE_ENV == "production"
    ? product(__dirname)
    : dev(__dirname, config);
