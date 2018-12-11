const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.entry = './example/main.js';
config.output = {
  path: path.resolve(__dirname, './example/dist/'),
  publicPath: '',
  filename: '[name]_[hash].js',
};

config.devtool = 'eval';

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new HtmlWebpackPlugin({
    // filename: './example/index.html',
    template: './example/index.html',
    inject: true,
  }),
];

config.resolve = {
  alias: {
    vue$: 'vue/dist/vue.esm.js',
  },
};

module.exports = config;