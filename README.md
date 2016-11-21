# React Declarative Head

React component to handle `<head>` side effects on client and server side.

Inspired in [React Side Effect](https://github.com/gaearon/react-side-effect).

## Installation

```sh
npm install react-declarative-head --save
```

## Use Cases
* Keep `<head>` stuff in your app structure
* Add/remove `<head>` tags along your application

## Usage

```js
import React, { Component } from 'react';
import Head from 'react-declarative-head';

const Foo = props =>
  <div>
    <Head>
      <title>A New Hello World!</title>
      <link rel="preconnect" href="https://www.to.a.new.preconnect.com/" />
    </Head>
  </div>

const MyApp = props =>
  <div>
    <Head>
      <title>Hello World!</title>
      <link rel="preconnect" href="https://www.google.com/" />
    </Head>
    <Foo />
  </div>

```

On the server you can call `Head.rewind()` to get the current state as a HTML string to inject in your response.

```js
app.get('*', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <MyApp />
  );

  res.send(`<!DOCTYPE><html>
  <head>${Head.rewind()}</head>
  <body><div id="app-root">${app}</div>
  <script src="myapp-bundle.js"></script>
  </body></html>`)
});
```

If you are server rendering and forget to call `Head.rewind()` you'll get a memory leak.
