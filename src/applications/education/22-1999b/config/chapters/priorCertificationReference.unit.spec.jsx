import { expect } from 'chai';

import {
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
  ENROLLMENT_TYPE_KEYS,
} from '../chapters/priorCertificationReference';

describe('priorCertificationReference page', () => {
  describe('uiSchema', () => {
    it('has originalCertBeginDate field', () => {
      expect(priorCertificationReferenceUiSchema.originalCertBeginDate).to.exist;
    });

    it('originalCertBeginDate has ui:title', () => {
      expect(
        priorCertificationReferenceUiSchema.originalCertBeginDate['ui:title'],
      ).to.equal('Original certification begin date');
    });

    it('has originalCertEndDate field', () => {
      expect(priorCertificationReferenceUiSchema.originalCertEndDate).to.exist;
    });

    it('has originalCreditHours field', () => {
      expect(priorCertificationReferenceUiSchema.originalCreditHours).to.exist;
    });

    it('has originalEnrollmentType select field', () => {
      expect(
        priorCertificationReferenceUiSchema.originalEnrollmentType,
      ).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(priorCertificationReferenceSchema.type).to.equal('object');
    });

    it('requires originalCertBeginDate', () => {
      expect(priorCertificationReferenceSchema.required).to.include(
        'originalCertBeginDate',
      );
    });

    it('requires originalCreditHours', () => {
      expect(priorCertificationReferenceSchema.required).to.include(
        'originalCreditHours',
      );
    });

    it('ENROLLMENT_TYPE_KEYS includes full_time', () => {
      expect(ENROLLMENT_TYPE_KEYS).to.include('full_time');
    });

    it('originalCreditHours has correct min/max', () => {
      expect(
        priorCertificationReferenceSchema.properties.originalCreditHours
          .minimum,
      ).to.equal(1);
      expect(
        priorCertificationReferenceSchema.properties.originalCreditHours
          .maximum,
      ).to.equal(99);
    });
  });
});