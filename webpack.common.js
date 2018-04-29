const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.ts"
  },
  resolve: {
    extensions: [".ts", ".js"]     // 自动补全，很重要
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }   // 使用了ts-loader
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ]
};