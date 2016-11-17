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
        <link rel="text/css" href="pasdsdapasdasdasdappa" />
        <link rel="text/css" href="papappa" />
        { !this.state.is ? <link rel="stylesheet" type="text/css" href="#" /> : null}
        { !this.state.is ? <link rel="stylesheet" type="text/css" href="asdasdasdsd" /> : null}
        <title>Heasdasdasdjopjle!</title>
      </Head>
    )
  }
}