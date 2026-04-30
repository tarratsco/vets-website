import { expect } from 'chai';
import reducers from './index';

describe('reducers/index', () => {
  it('exports an object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.property('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer initializes without throwing', () => {
    let result;
    expect(() => {
      result = reducers.form(undefined, { type: '@@INIT' });
    }).to.not.throw();
    expect(result).to.be.an('object');
  });

  it('form reducer returns non-null state on @@INIT', () => {
    const state = reducers.form(undefined, { type: '@@INIT' });
    expect(state).to.not.be.null;
    expect(state).to.not.be.undefined;
  });
});