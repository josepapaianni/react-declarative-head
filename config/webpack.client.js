const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    './example/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
      },
    ]
  },
  publicPath: "/build",
  output: {
    path: path.resolve() + '/build',
    filename: 'client-bundle.js'
  }
};
