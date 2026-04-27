import { expect } from 'chai';
import reducers from './index';

describe('10-10EC reducers', () => {
  it('should return a non-null object with form slice', () => {
    const result = reducers;
    expect(result).to.be.an('object');
    expect(result).to.have.key('form');
  });

  it('should initialize form slice without throwing', () => {
    const formReducer = reducers.form;
    expect(formReducer).to.be.a('function');
    const state = formReducer(undefined, { type: '@@INIT' });
    expect(state).to.be.an('object');
  });
});