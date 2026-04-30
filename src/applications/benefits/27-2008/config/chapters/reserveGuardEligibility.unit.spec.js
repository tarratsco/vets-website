import { expect } from 'chai';
import {
  reserveGuardEligibilityUiSchema,
  reserveGuardEligibilitySchema,
} from './reserveGuardEligibility';

describe('chapters/reserveGuardEligibility', () => {
  it('should export uiSchema and schema', () => {
    expect(reserveGuardEligibilityUiSchema).to.be.an('object');
    expect(reserveGuardEligibilitySchema).to.be.an('object');
  });

  it('uiSchema should have reserveGuardCriteria field', () => {
    const { eligibility } = reserveGuardEligibilityUiSchema;
    expect(eligibility).to.have.property('reserveGuardCriteria');
  });

  it('schema eligibility properties should include reserveGuardCriteria', () => {
    const { properties } = reserveGuardEligibilitySchema.properties.eligibility;
    expect(properties).to.have.property('reserveGuardCriteria');
  });

  it('reserveGuardCriteria schema should be an object', () => {
    const { reserveGuardCriteria } = reserveGuardEligibilitySchema.properties.eligibility.properties;
    expect(reserveGuardCriteria).to.be.an('object');
  });
});