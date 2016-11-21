import React, { Component } from 'react';
import Head from '../src/head-sync';

export default class Other extends Component {
  constructor(){
    super();
    this.state = {
      is: false,
    };
  }
  componentWillMount(){
    if(typeof window !== 'undefined') {
      setTimeout(this.setState.bind(this, {is: true}), 1500)
    }
  }

  render(){
    console.log(this.state.is);
    return(
      <Head>
        <title>Hello New Title!</title>
        <link rel="preconnect" href="https://www.google.com"/>
        { this.state.is ? <link rel="stylesheet" type="text/css" href="#" /> : null}
        { this.state.is ? <link rel="stylesheet" type="text/css" href="my-link" /> : null}
        { !this.state.is ? <link rel="preconnect" href="https://www.google-analytics.com"/> : null}
      </Head>
    )
  }
}