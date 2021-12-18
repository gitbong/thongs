const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputDirectory = "src/server/www";

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "index.bundle.js",
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    open: true,
    proxy: {
      "/": "http://localhost:3000",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, "src", "client/index.html"),
      template: "./src/client/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
