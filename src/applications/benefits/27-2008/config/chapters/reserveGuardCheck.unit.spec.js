import { expect } from 'chai';
import {
  reserveGuardCheckUiSchema,
  reserveGuardCheckSchema,
} from './reserveGuardCheck';

describe('chapters/reserveGuardCheck', () => {
  it('exports uiSchema and schema', () => {
    expect(reserveGuardCheckUiSchema).to.be.an('object');
    expect(reserveGuardCheckSchema).to.be.an('object');
  });

  it('has reserveGuardCriteria field in uiSchema', () => {
    expect(
      reserveGuardCheckUiSchema.eligibility.reserveGuardCriteria,
    ).to.exist;
  });

  it('schema requires reserveGuardCriteria', () => {
    const required =
      reserveGuardCheckSchema.properties.eligibility.required;
    expect(required).to.include('reserveGuardCriteria');
  });

  it('schema has all four criteria keys', () => {
    const criteriaSchema =
      reserveGuardCheckSchema.properties.eligibility.properties
        .reserveGuardCriteria;
    expect(criteriaSchema).to.exist;
  });
});