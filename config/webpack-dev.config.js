var merge         = require('merge');
var path          = require('path');
var root          = require('./util').root;
var commonConfig  = require('./webpack-common.config');

var devConfig = {
  output: {
    path: path.resolve(root, '.tmp'),
    filename: '[name].bundle.js'
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: './.tmp',
    inline: true,
    host: '0.0.0.0',
    port: '9010',
    stats: { colors: true }
  }
};

module.exports = merge(commonConfig, devConfig);
