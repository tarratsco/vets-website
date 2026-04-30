import { expect } from 'chai';
import {
  reserveGuardEligibilityUiSchema,
  reserveGuardEligibilitySchema,
} from './reserveGuardEligibility';

describe('reserveGuardEligibility page', () => {
  it('uiSchema has eligibility.reserveGuardCriteria', () => {
    expect(reserveGuardEligibilityUiSchema.eligibility).to.have.property(
      'reserveGuardCriteria',
    );
  });

  it('schema has reserveGuardCriteria property', () => {
    const elg = reserveGuardEligibilitySchema.properties.eligibility;
    expect(elg.properties).to.have.property('reserveGuardCriteria');
  });

  it('reserveGuardCriteria validations adds error when empty array', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const validations =
      reserveGuardEligibilityUiSchema.eligibility.reserveGuardCriteria['ui:validations'];
    expect(validations).to.be.an('array');
    validations[0](errors, []);
    expect(messages.length).to.equal(1);
  });

  it('reserveGuardCriteria validations passes when criteria selected', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const validations =
      reserveGuardEligibilityUiSchema.eligibility.reserveGuardCriteria['ui:validations'];
    validations[0](errors, ['retiredPayEligible']);
    expect(messages.length).to.equal(0);
  });

  it('reserveGuardCriteria validations adds error when null', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const validations =
      reserveGuardEligibilityUiSchema.eligibility.reserveGuardCriteria['ui:validations'];
    validations[0](errors, null);
    expect(messages.length).to.equal(1);
  });
});