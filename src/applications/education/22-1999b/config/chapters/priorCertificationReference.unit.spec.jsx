import { expect } from 'chai';

import {
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './priorCertificationReference';

describe('priorCertificationReference page', () => {
  it('uiSchema has originalCertBeginDate field', () => {
    expect(
      priorCertificationReferenceUiSchema.studentAndPriorCertification
        .originalCertBeginDate,
    ).to.be.an('object');
  });

  it('uiSchema has originalCertEndDate field', () => {
    expect(
      priorCertificationReferenceUiSchema.studentAndPriorCertification
        .originalCertEndDate,
    ).to.be.an('object');
  });

  it('uiSchema has originalCreditHours field', () => {
    expect(
      priorCertificationReferenceUiSchema.studentAndPriorCertification
        .originalCreditHours,
    ).to.be.an('object');
  });

  it('uiSchema has originalEnrollmentType field', () => {
    expect(
      priorCertificationReferenceUiSchema.studentAndPriorCertification
        .originalEnrollmentType,
    ).to.be.an('object');
  });

  it('schema requires all four fields', () => {
    const required =
      priorCertificationReferenceSchema.properties.studentAndPriorCertification
        .required;
    expect(required).to.include('originalCertBeginDate');
    expect(required).to.include('originalCertEndDate');
    expect(required).to.include('originalCreditHours');
    expect(required).to.include('originalEnrollmentType');
  });

  it('originalCreditHours schema has minimum of 1', () => {
    expect(
      priorCertificationReferenceSchema.properties.studentAndPriorCertification
        .properties.originalCreditHours.minimum,
    ).to.equal(1);
  });

  describe('validateCreditHours via ui:validations', () => {
    const validations =
      priorCertificationReferenceUiSchema.studentAndPriorCertification
        .originalCreditHours['ui:validations'];

    it('has validations array', () => {
      expect(validations).to.be.an('array').with.lengthOf(1);
    });

    it('does not add error for a valid credit hour value', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 12);
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error for zero credit hours', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 0);
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error for credit hours over 99', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 100);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when value is undefined', () => {
      const messages = [];
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, undefined);
      expect(messages).to.have.lengthOf(0);
    });
  });
});