const dev = require("./config/dev.js");
const product = require("./config/prod.js");

const config = {
  host: "127.0.0.1",
  port: "8089",
};

module.exports =
  process.env.NODE_ENV == "production"
    ? product(__dirname)
    : dev(__dirname, config);
