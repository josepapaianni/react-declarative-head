import React, { Component } from 'react';
const Head = require('../lib/react-declarative-head');

export default class Other extends Component {
  constructor(){
    super();
    this.state = {
      is: false,
    };
  }
  componentDidMount(){
    setTimeout(this.setState.bind(this, {is: true}), 1500);
  }

  render(){
    return(
      <Head>
        <title>Hello New Title!</title>
        <link rel="preconnect" href="https://www.google.com"/>
        <link rel="preconnect" href="https://www.juanita.com"/>
        { this.state.is ? <link rel="stylesheet" type="text/css" href="#" /> : null}
        { this.state.is ? <link rel="stylesheet" type="text/css" href="my-link" /> : null}
        { !this.state.is ? <link rel="preconnect" href="https://www.google-analytics.com"/> : null}
      </Head>
    )
  }
}