import { expect } from 'chai';

import reducers from './index';

describe('reducers', () => {
  it('exports an object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.key('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer initializes without crashing', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object');
  });

  it('form reducer returns expected shape on init', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.not.be.null;
  });
});