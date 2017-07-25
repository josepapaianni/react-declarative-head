import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import Head from './src/head-sync';
import App from './example/app';

const app = express();
app.use(express.static('build'));

app.get('*', (req, res) => {
  const reactHTML = ReactDOMServer.renderToString(
    <App />
  );
  res.send(`<!DOCTYPE><html><head>${Head.rewind()}</head><body><div id="app-root">${reactHTML}</div>
  <script src="client-bundle.js"></script>
  </body></html>`)
});

app.listen(3000, () => {
  console.log('Server listening on: 3000');
});

