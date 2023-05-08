"use strict";

var CopyPlugin = require("copy-webpack-plugin");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var path = require("path");

module.exports = {
  entry: {
    popup: "./src/popup.jsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/popup.html",
    filename: "popup.html"
  }), new CopyPlugin({
    patterns: [{
      from: "public"
    }]
  })]
};