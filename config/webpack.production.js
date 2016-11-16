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
      // {
      //   test: /\.(css)$/,
      //   loader: 'style-loader!css-loader'
      //
      // },
      // {
      //   test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
      //   loader: 'file-loader'
      //
      // }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      debug: false,
      minimize: true,
      sourcemap: false,
      output: {
        comments: false
      }
    }),
  ],
  output: {
    libraryTarget: 'umd',
    library: 'head-sync',
    path: path.resolve() + '/lib',
    filename: 'head-sync.js'
  }
};
