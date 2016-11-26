import React, { Component } from 'react';
const Head = require('../src/head-sync');
import OtherComponent from './other'

export default class App extends Component {
  render(){
    return(
      <div>
        <Head>
          <title>Hello Old Title!</title>
          <link rel="preconnect" href="https://www.google.com"/>
        </Head>
        <OtherComponent/>
      </div>
    )
  }
}