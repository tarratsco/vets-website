import { expect } from 'chai';

import { TITLE, SUBTITLE, EMBLEM_OPTIONS } from './index';

describe('constants', () => {
  it('TITLE is a non-empty string', () => {
    expect(TITLE).to.be.a('string').that.is.not.empty;
  });

  it('SUBTITLE is a non-empty string', () => {
    expect(SUBTITLE).to.be.a('string').that.is.not.empty;
  });

  it('SUBTITLE includes the form number', () => {
    expect(SUBTITLE).to.include('40-1330M');
  });

  it('EMBLEM_OPTIONS is an object with at least one entry', () => {
    expect(EMBLEM_OPTIONS).to.be.an('object');
    expect(Object.keys(EMBLEM_OPTIONS).length).to.be.greaterThan(0);
  });

  it('EMBLEM_OPTIONS includes a "no emblem" option (empty string key)', () => {
    expect(EMBLEM_OPTIONS).to.have.property('');
  });

  it('EMBLEM_OPTIONS includes common emblems', () => {
    expect(EMBLEM_OPTIONS).to.have.property('latinCross');
    expect(EMBLEM_OPTIONS).to.have.property('starOfDavid');
  });
});