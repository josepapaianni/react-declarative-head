const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    './src/head-sync.js'
  ],
  externals: [
    nodeExternals()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
      },
    ]
  },
  output: {
    path: path.resolve() + '/lib',
    filename: 'react-declarative-head.js',
    library: 'ReactDeclarativeHead',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};
