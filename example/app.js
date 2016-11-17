import React, { Component } from 'react';
import Head from '../src/head-sync';
import OtherComponent from './other'

export default class App extends Component {
  render(){
    return(
      <div>
        <Head>
          <title>Hello Old Title!</title>
          <link rel="preconnect" href="//analytics.mlstatic.com"/>
          <link rel="preconnect" href="//resources.mlstatic.com"/>
          <link rel="preconnect" href="//static.mlstatic.com"/>
          <link rel="preconnect" href="https://www.google.com"/>
          <link rel="preconnect" href="https://https.mlstatic.com"/>
        </Head>
        <OtherComponent/>
      </div>
    )
  }
}