/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: __dirname + '/demo/src/demo.js',
  output: {
    path: __dirname + '/demo/dist',
    filename: 'demo.js',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.json', '.js']
  },
  plugins: [
    // use html-webpack-plugin to create index.html
    new HtmlWebpackPlugin({
      template: __dirname + '/demo/src/demo.html',
    }),
  ],
  devServer: {
    disableHostCheck: true,
  }
};

module.exports = config;
