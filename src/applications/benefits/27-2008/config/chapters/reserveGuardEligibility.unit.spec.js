import { expect } from 'chai';
import {
  reserveGuardEligibilityUiSchema,
  reserveGuardEligibilitySchema,
} from './reserveGuardEligibility';

describe('reserveGuardEligibility page', () => {
  describe('uiSchema', () => {
    it('has eligibility.reserveGuardCriteria field', () => {
      expect(
        reserveGuardEligibilityUiSchema.eligibility.reserveGuardCriteria,
      ).to.be.an('object');
    });

    it('has a title', () => {
      const field =
        reserveGuardEligibilityUiSchema.eligibility.reserveGuardCriteria;
      expect(field['ui:title']).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has reserveGuardCriteria as array type', () => {
      const schema =
        reserveGuardEligibilitySchema.properties.eligibility.properties
          .reserveGuardCriteria;
      expect(schema.type).to.equal('array');
    });
  });
});