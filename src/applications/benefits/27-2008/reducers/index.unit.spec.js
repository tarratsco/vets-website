import { expect } from 'chai';
import reducers from './index';

describe('reducers', () => {
  it('is a non-null object', () => {
    expect(reducers).to.be.an('object');
    expect(reducers).to.not.be.null;
  });

  it('has a "form" slice', () => {
    expect(reducers).to.have.property('form');
    expect(reducers.form).to.be.a('function');
  });

  it('form slice returns state on @@INIT', () => {
    const result = reducers.form(undefined, { type: '@@INIT' });
    expect(result).to.be.an('object');
    expect(result).to.not.be.null;
  });
});