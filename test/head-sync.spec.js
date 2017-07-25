import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Head from '../src/head-sync';

describe('React Declarative Head', () => {
  it('has a displayName', function () {
    const el = <Head />;
    expect(el.type.displayName).to.be.a('string');
    expect(el.type.displayName).to.equal('SideEffect(Head)');
  });

  it("it doesn't create an element in React Virtual DOM", () => {
    const el = <div><Head><title>A Title</title></Head></div>;
    expect(ReactDOMServer.renderToStaticMarkup(el)).to.equal('<div></div>');
  })
});
