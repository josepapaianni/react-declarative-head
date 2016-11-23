const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: [
    './server.js'
  ],
  externals: [
    nodeExternals(
      // {whitelist: ['react', 'react-dom']} For Production test
    )
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
    //For Production test
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   debug: false,
    //   minimize: true,
    //   sourcemap: false,
    //   output: {
    //     comments: false
    //   }
    // }),
    new WebpackShellPlugin({
      onBuildEnd: ['./node_modules/.bin/nodemon ./build/bundle.js --watch ./server.js']
    })
  ],
  output: {
    path: path.resolve() + '/build',
    filename: 'bundle.js'
  }
};
