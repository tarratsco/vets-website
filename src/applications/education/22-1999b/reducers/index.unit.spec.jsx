import { expect } from 'chai';

import reducers from '../reducers/index';

describe('reducers', () => {
  it('returns a non-null object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.key('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns state when called with @@INIT', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object');
  });
});