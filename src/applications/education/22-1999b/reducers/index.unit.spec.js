import { expect } from 'chai';
import reducers from './index';

describe('reducers', () => {
  it('is a non-null object', () => {
    expect(reducers).to.be.an('object');
  });

  it('has a form slice', () => {
    expect(reducers).to.have.property('form');
  });

  it('form slice is a function (reducer)', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns state for @@INIT action without throwing', () => {
    let state;
    expect(() => {
      state = reducers.form(undefined, { type: '@@INIT' });
    }).to.not.throw();
    expect(state).to.be.an('object');
  });
});