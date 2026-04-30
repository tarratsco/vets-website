import { expect } from 'chai';
import reducers from './index';

describe('reducers/index', () => {
  it('exports an object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.key('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns non-null state on @@INIT', () => {
    const state = reducers.form(undefined, { type: '@@INIT' });
    expect(state).to.not.be.null;
    expect(state).to.be.an('object');
  });
});