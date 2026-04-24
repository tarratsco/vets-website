import { expect } from 'chai';
import reducers from './index';

describe('reducers', () => {
  it('exports an object with a form key', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.have.property('form');
  });

  it('form reducer is a function', () => {
    expect(reducers.form).to.be.a('function');
  });

  it('form reducer returns a non-null object for @@INIT', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object');
    expect(result).not.to.be.null;
  });

  it('form reducer result has expected state shape', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.have.property('data');
    expect(result).to.have.property('formId');
  });
});