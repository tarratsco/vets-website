import { expect } from 'chai';

import {
  updatedEnrollmentDetailsUiSchema,
  updatedEnrollmentDetailsSchema,
} from '../chapters/updatedEnrollmentDetails';

describe('updatedEnrollmentDetails page', () => {
  describe('uiSchema', () => {
    it('has newCreditHours field', () => {
      expect(updatedEnrollmentDetailsUiSchema.newCreditHours).to.exist;
    });

    it('newCreditHours has correct title', () => {
      expect(updatedEnrollmentDetailsUiSchema.newCreditHours['ui:title']).to.equal(
        'Credit hours after this change',
      );
    });

    it('has newEnrollmentType field', () => {
      expect(updatedEnrollmentDetailsUiSchema.newEnrollmentType).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(updatedEnrollmentDetailsSchema.type).to.equal('object');
    });

    it('requires newCreditHours', () => {
      expect(updatedEnrollmentDetailsSchema.required).to.include(
        'newCreditHours',
      );
    });

    it('requires newEnrollmentType', () => {
      expect(updatedEnrollmentDetailsSchema.required).to.include(
        'newEnrollmentType',
      );
    });

    it('newCreditHours has minimum of 1', () => {
      expect(
        updatedEnrollmentDetailsSchema.properties.newCreditHours.minimum,
      ).to.equal(1);
    });

    it('newCreditHours has maximum of 98', () => {
      expect(
        updatedEnrollmentDetailsSchema.properties.newCreditHours.maximum,
      ).to.equal(98);
    });
  });
});