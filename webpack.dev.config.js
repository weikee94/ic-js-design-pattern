const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./release/bundle.js",
  },
  module: {
    rules: [
      // 用babel transform es6
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    // 生成模版
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "./release"), // 根目录
    open: true,
    port: 9000,
  },
};
