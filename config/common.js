const { resolve } = require("path");
const { DefinePlugin } = require("webpack");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";
module.exports = (dirname) => {
  return {
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", "css"],
      alias: {
        "@": resolve(dirname, "./src"),
        styles: resolve(dirname, "./src/styles"),
      },
    },
    context: resolve(dirname),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader", "source-map-loader"],
          exclude: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "awesome-typescript-loader"],
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            {
              loader: "postcss-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: false,
                name: "assets/[name].[hash:8].[ext]",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            "@svgr/webpack",
            {
              loader: "file-loader",
              options: {
                esModule: false,
                name: "assets/[name].[hash:8].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: { esModule: false, name: "assets/[name].[hash:8].[ext]" },
            },
          ],
        },
      ],
    },
    optimization: {
      chunkIds: "named",
      moduleIds: "named",
      splitChunks: {
        chunks: "all",
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          echarts: {
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: -1,
            name: "vendor/echarts.js",
          },
          mapbox_gl: {
            test: /[\\/]node_modules[\\/]mapbox-gl[\\/]/,
            priority: -2,
            name: "vendor/mapbox-gl.js",
          },
          antv: {
            test: /[\\/]node_modules[\\/]@antv[\\/]/,
            priority: -3,
            name: "vendor/antv.js",
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor/vendors",
            priority: -10,
          },
          default: {
            name: "vendor/default",
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "template/spa.html",
        minify: false,
        publicPath: process.env.SNOWPACK_PUBLIC_BASE_PATH
          ? process.env.SNOWPACK_PUBLIC_BASE_PATH + "/"
          : "/",
        favicon: "./src/assets/favicon.ico",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./_redirects",
            to: "./",
          },
          {
            from: "./public/javascript",
            to: "./vendor",
          },
          {
            from: "./public/color.less",
            to: "./",
          },
        ],
      }),
      new DefinePlugin({
        SNOWPACK_PUBLIC_PAGE_PATH: JSON.stringify(
          process.env.SNOWPACK_PUBLIC_PAGE_PATH || ""
        ),
        SNOWPACK_PUBLIC_GRAPHQL_URI: JSON.stringify(
          process.env.SNOWPACK_PUBLIC_GRAPHQL_URI
        ),
      }),
    ],
    externals: {},
    performance: {
      hints: false,
    },
  };
};
