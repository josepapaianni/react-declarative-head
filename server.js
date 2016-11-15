
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const Head = require('./src/head-sync');
const Client = require('./client/client');

const app = express();

app.use(express.static('./client'));

app.get('*', (req, res) => {
  req.platform = {
    id: 'ML',
    countryId: 'BR',
    siteId: 'MLB',
    locale: 'ar_ES',
    domain: 'mercadolibre.com.ar'
  };

  const initDate = new Date();

  const reactHTML = ReactDOMServer.renderToString(
    <Client />
  );

  const diffDate =  new Date() - initDate;
  console.log(diffDate);
  res.send(`<!DOCTYPE><html><head>${Head.rewind().toStatic()}</head><body><div id="app">${reactHTML}</div>
  <script src="bundle.js"></script>
  </body></html>`)
});

app.listen(3000, () => {
  console.log('Server listening on: 3000');
});

