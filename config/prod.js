const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./common");

module.exports = (dirname) => {
  return merge(commonConfig(dirname), {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
      path: path.join(dirname, "dist"),
      filename: "[name].js",
      sourceMapFilename: "[name].[hash:8].map",
      chunkFilename: "[name].[hash:8].js",
    },
    devtool: "eval-source-map",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          exclude: /node_modules/,
          extractComments: true,
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.join(dirname, "dist"),
      }),
    ],
  });
};
