import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware"
import express from 'express';
import Head from './src/head-sync';
import App from './example/app';

const compiler = webpack({
  entry: [
    'webpack-hot-middleware/client',
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
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  publicPath: "/build",
  output: {
    path: path.resolve() + '/build',
    filename: 'client-bundle.js'
  },
});

const app = express();
app.use(webpackMiddleware(compiler, { serverSideRender: true }));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

  const reactHTML = ReactDOMServer.renderToString(
    <App />
  );

  const scriptTag = assetsByChunkName.main;

  res.send(`<!DOCTYPE><html>
  <head>${Head.rewind()}</head>
  <body>
  <div id="app-root">${reactHTML}</div>
  <script src="${scriptTag}"></script>
  </body></html>`)
});

app.listen(3000, () => {
  console.log('Server listening on: 3000');
});

