import { expect } from 'chai';

import {
  updatedEnrollmentDetailsUiSchema,
  updatedEnrollmentDetailsSchema,
} from './updatedEnrollmentDetails';

describe('updatedEnrollmentDetails page', () => {
  it('uiSchema has newCreditHours field', () => {
    expect(
      updatedEnrollmentDetailsUiSchema.updatedEnrollmentDetails.newCreditHours,
    ).to.be.an('object');
  });

  it('uiSchema has newEnrollmentType field', () => {
    expect(
      updatedEnrollmentDetailsUiSchema.updatedEnrollmentDetails
        .newEnrollmentType,
    ).to.be.an('object');
  });

  it('schema requires newCreditHours and newEnrollmentType', () => {
    const required =
      updatedEnrollmentDetailsSchema.properties.updatedEnrollmentDetails
        .required;
    expect(required).to.include('newCreditHours');
    expect(required).to.include('newEnrollmentType');
  });

  it('schema newCreditHours has minimum of 1 and maximum of 98', () => {
    const schema =
      updatedEnrollmentDetailsSchema.properties.updatedEnrollmentDetails
        .properties.newCreditHours;
    expect(schema.minimum).to.equal(1);
    expect(schema.maximum).to.equal(98);
  });

  describe('validateNewCreditHours via ui:validations', () => {
    const validations =
      updatedEnrollmentDetailsUiSchema.updatedEnrollmentDetails.newCreditHours[
        'ui:validations'
      ];

    it('has validations array', () => {
      expect(validations).to.be.an('array').with.lengthOf(1);
    });

    it('does not add error for valid value 6', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 6);
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error for value 0', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 0);
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error for value 99', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 99);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error for undefined', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, undefined);
      expect(messages).to.have.lengthOf(0);
    });
  });
});