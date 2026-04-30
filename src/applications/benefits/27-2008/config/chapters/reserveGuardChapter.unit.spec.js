import { expect } from 'chai';
import {
  reserveGuardUiSchema,
  reserveGuardSchema,
} from './reserveGuardChapter';

describe('reserveGuardChapter', () => {
  it('uiSchema has eligibility group', () => {
    expect(reserveGuardUiSchema.eligibility).to.exist;
  });

  it('uiSchema has reserveGuardCriteria checkbox group', () => {
    expect(
      reserveGuardUiSchema.eligibility.reserveGuardCriteria,
    ).to.exist;
  });

  it('schema has reserveGuardCriteria property', () => {
    expect(
      reserveGuardSchema.properties.eligibility.properties
        .reserveGuardCriteria,
    ).to.exist;
  });

  it('reserveGuardCriteria is an array type in schema', () => {
    const criteria =
      reserveGuardSchema.properties.eligibility.properties
        .reserveGuardCriteria;
    expect(criteria.type).to.equal('array');
  });
});