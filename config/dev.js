const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const commonConfig = require("./common");

module.exports = (dirname, config) => {
  const { host, port } = config;
  return merge(commonConfig(dirname), {
    mode: "development",
    entry: [
      "react-hot-loader/patch", // activate HMR for React
      `webpack-dev-server/client?http://${host}:${port}`, // bundle the client for webpack-dev-server and connect to the provided endpoint
      "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
      "./src/index.tsx", // the entry point of our app
    ],
    output: {
      path: path.resolve(dirname, "dist"),
      filename: "[name].js",
      sourceMapFilename: "[name].[hash:8].map",
      chunkFilename: "[name].[hash:8].js",
    },
    stats: {
      errorDetails: true,
    },
    devServer: {
      contentBase: path.join(dirname, "dist"),
      historyApiFallback: true,
      port: port,
      host: host,
      hot: true, // enable HMR on the server
      open: "Google Chrome",
    },
    devtool: "eval-source-map",
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    ],
  });
};
