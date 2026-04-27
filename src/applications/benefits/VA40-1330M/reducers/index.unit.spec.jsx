import { expect } from 'chai';

import reducers from './index';

describe('reducers', () => {
  it('returns a non-null object', () => {
    const result = reducers;
    expect(result).to.be.an('object');
    expect(result).to.not.be.null;
  });

  it('has a form slice', () => {
    expect(reducers).to.have.property('form');
  });

  it('form slice is a function (reducer)', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns state on INIT action', () => {
    const state = reducers.form(undefined, { type: '@@INIT' });
    expect(state).to.be.an('object');
    expect(state).to.not.be.null;
  });
});