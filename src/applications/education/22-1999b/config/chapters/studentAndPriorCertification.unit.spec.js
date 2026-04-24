import { expect } from 'chai';
import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './studentAndPriorCertification';

describe('chapters/studentAndPriorCertification', () => {
  describe('studentIdentificationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(studentIdentificationUiSchema).to.be.an('object');
    });

    it('has studentFirstName field', () => {
      expect(
        studentIdentificationUiSchema.studentAndPriorCertification
          .studentFirstName,
      ).to.exist;
    });

    it('has ssnOrFileNumberIndicator radio field', () => {
      const field =
        studentIdentificationUiSchema.studentAndPriorCertification
          .ssnOrFileNumberIndicator;
      expect(field).to.exist;
      expect(field['ui:options']).to.have.property('labels');
    });

    it('studentSsn ui:required returns true when indicator is ssn', () => {
      const requiredFn =
        studentIdentificationUiSchema.studentAndPriorCertification.studentSsn[
          'ui:required'
        ];
      expect(requiredFn).to.be.a('function');
      expect(
        requiredFn({
          studentAndPriorCertification: { ssnOrFileNumberIndicator: 'ssn' },
        }),
      ).to.be.true;
    });

    it('studentSsn ui:required returns false when indicator is va_file_number', () => {
      const requiredFn =
        studentIdentificationUiSchema.studentAndPriorCertification.studentSsn[
          'ui:required'
        ];
      expect(
        requiredFn({
          studentAndPriorCertification: {
            ssnOrFileNumberIndicator: 'va_file_number',
          },
        }),
      ).to.be.false;
    });

    it('benefitChapter has correct labels', () => {
      const field =
        studentIdentificationUiSchema.studentAndPriorCertification
          .benefitChapter;
      expect(field).to.exist;
      expect(field['ui:options']).to.have.property('labels');
    });
  });

  describe('studentIdentificationSchema', () => {
    it('exports a schema object', () => {
      expect(studentIdentificationSchema).to.be.an('object');
    });

    it('requires ssnOrFileNumberIndicator', () => {
      const { required } = studentIdentificationSchema.properties.studentAndPriorCertification;
      expect(required).to.include('ssnOrFileNumberIndicator');
    });

    it('studentSsn has correct pattern', () => {
      const { studentSsn } = studentIdentificationSchema.properties.studentAndPriorCertification.properties;
      expect(studentSsn.pattern).to.equal('^\\d{9}$');
    });
  });

  describe('priorCertificationReferenceUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(priorCertificationReferenceUiSchema).to.be.an('object');
    });

    it('has originalCertBeginDate field', () => {
      expect(
        priorCertificationReferenceUiSchema.studentAndPriorCertification
          .originalCertBeginDate,
      ).to.exist;
    });

    it('has originalCreditHours field', () => {
      expect(
        priorCertificationReferenceUiSchema.studentAndPriorCertification
          .originalCreditHours,
      ).to.exist;
    });

    it('has originalEnrollmentType field', () => {
      expect(
        priorCertificationReferenceUiSchema.studentAndPriorCertification
          .originalEnrollmentType,
      ).to.exist;
    });
  });

  describe('priorCertificationReferenceSchema', () => {
    it('exports a schema object', () => {
      expect(priorCertificationReferenceSchema).to.be.an('object');
    });

    it('requires originalCreditHours', () => {
      const { required } = priorCertificationReferenceSchema.properties.studentAndPriorCertification;
      expect(required).to.include('originalCreditHours');
    });

    it('originalCreditHours has minimum of 1 and maximum of 99', () => {
      const { originalCreditHours } = priorCertificationReferenceSchema.properties.studentAndPriorCertification.properties;
      expect(originalCreditHours.minimum).to.equal(1);
      expect(originalCreditHours.maximum).to.equal(99);
    });
  });
});