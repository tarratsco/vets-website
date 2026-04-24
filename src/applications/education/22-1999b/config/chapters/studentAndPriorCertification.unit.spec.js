import { expect } from 'chai';
import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './studentAndPriorCertification';

describe('studentAndPriorCertification chapter', () => {
  describe('studentIdentificationSchema', () => {
    it('requires studentFirstName and studentLastName', () => {
      const required =
        studentIdentificationSchema.properties.studentAndPriorCertification.required;
      expect(required).to.include('studentFirstName');
      expect(required).to.include('studentLastName');
    });

    it('requires ssnOrFileNumberIndicator and benefitChapter', () => {
      const required =
        studentIdentificationSchema.properties.studentAndPriorCertification.required;
      expect(required).to.include('ssnOrFileNumberIndicator');
      expect(required).to.include('benefitChapter');
    });

    it('studentSsn has 9-digit pattern', () => {
      const { studentSsn } =
        studentIdentificationSchema.properties.studentAndPriorCertification.properties;
      expect(studentSsn.pattern).to.equal('^\\d{9}$');
    });

    it('benefitChapter enum includes chapter_33', () => {
      const { benefitChapter } =
        studentIdentificationSchema.properties.studentAndPriorCertification.properties;
      expect(benefitChapter.enum).to.include('chapter_33');
    });
  });

  describe('studentIdentificationUiSchema', () => {
    it('ssnOrFileNumberIndicator has radio ui:title', () => {
      const fieldUi =
        studentIdentificationUiSchema.studentAndPriorCertification
          .ssnOrFileNumberIndicator;
      expect(fieldUi['ui:title']).to.be.a('string');
    });

    it('studentSsn ui:required returns true when ssnOrFileNumberIndicator is ssn', () => {
      const fieldUi =
        studentIdentificationUiSchema.studentAndPriorCertification.studentSsn;
      const requiredFn = fieldUi['ui:required'];
      expect(
        requiredFn({
          studentAndPriorCertification: { ssnOrFileNumberIndicator: 'ssn' },
        }),
      ).to.be.true;
    });

    it('studentSsn ui:required returns false when ssnOrFileNumberIndicator is va_file_number', () => {
      const fieldUi =
        studentIdentificationUiSchema.studentAndPriorCertification.studentSsn;
      const requiredFn = fieldUi['ui:required'];
      expect(
        requiredFn({
          studentAndPriorCertification: {
            ssnOrFileNumberIndicator: 'va_file_number',
          },
        }),
      ).to.be.false;
    });
  });

  describe('priorCertificationReferenceSchema', () => {
    it('requires originalCertBeginDate, originalCertEndDate', () => {
      const required =
        priorCertificationReferenceSchema.properties.studentAndPriorCertification
          .required;
      expect(required).to.include('originalCertBeginDate');
      expect(required).to.include('originalCertEndDate');
    });

    it('requires originalCreditHours and originalEnrollmentType', () => {
      const required =
        priorCertificationReferenceSchema.properties.studentAndPriorCertification
          .required;
      expect(required).to.include('originalCreditHours');
      expect(required).to.include('originalEnrollmentType');
    });

    it('originalCreditHours has minimum 1 and maximum 99', () => {
      const { originalCreditHours } =
        priorCertificationReferenceSchema.properties.studentAndPriorCertification.properties;
      expect(originalCreditHours.minimum).to.equal(1);
      expect(originalCreditHours.maximum).to.equal(99);
    });

    it('vaonceCertId is optional (not in required array)', () => {
      const required =
        priorCertificationReferenceSchema.properties.studentAndPriorCertification
          .required;
      expect(required).not.to.include('vaonceCertId');
    });
  });

  describe('priorCertificationReferenceUiSchema', () => {
    it('originalCertBeginDate has a title', () => {
      const fieldUi =
        priorCertificationReferenceUiSchema.studentAndPriorCertification
          .originalCertBeginDate;
      expect(fieldUi['ui:title']).to.equal('Original certification begin date');
    });
  });
});