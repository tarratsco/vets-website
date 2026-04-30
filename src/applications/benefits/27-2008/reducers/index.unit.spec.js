import { expect } from 'chai';
import reducers from './index';

describe('reducers/index', () => {
  it('should export a non-null object', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.not.be.null;
  });

  it('should have a form slice', () => {
    expect(reducers).to.have.property('form');
  });

  it('form slice should be a function (reducer)', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer should return a state object on @@INIT', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object');
    expect(result).to.not.be.null;
  });
});