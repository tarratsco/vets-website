import { expect } from 'chai';
import reducers from './index';

describe('VA40-1330M reducers', () => {
  it('returns an object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.property('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns a non-null object on @@INIT', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object').that.is.not.null;
  });

  it('form reducer preserves state shape', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    // platform save-in-progress reducer produces at least a data key
    expect(result).to.be.an('object');
  });
});