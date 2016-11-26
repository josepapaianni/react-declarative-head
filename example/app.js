import React, { Component } from 'react';
const Head = require('../lib/react-declarative-head');
import OtherComponent from './other'

export default class App extends Component {
  render(){
    return(
      <div>
        <Head>
          <title>Hello Old Titles!</title>
          <link rel="preconnect" href="https://www.google.com"/>
        </Head>
        <OtherComponent/>
      </div>
    )
  }
}