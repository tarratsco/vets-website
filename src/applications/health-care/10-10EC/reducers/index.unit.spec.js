import { expect } from 'chai';
import reducers from './index';

describe('reducers/index', () => {
  it('exports a default object', () => {
    expect(reducers).to.be.an('object');
  });

  it('has a form slice', () => {
    expect(reducers).to.have.property('form');
  });

  it('form slice is a function (reducer)', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns a non-null initial state', () => {
    const state = reducers.form(undefined, { type: '@@INIT' });
    expect(state).to.not.be.null;
    expect(state).to.be.an('object');
  });
});