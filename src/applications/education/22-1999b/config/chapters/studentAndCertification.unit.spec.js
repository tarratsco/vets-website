import { expect } from 'chai';
import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
  priorCertificationReferenceUiSchema,
  priorCertificationReferenceSchema,
} from './studentAndCertification';

describe('studentAndCertification chapter', () => {
  describe('studentIdentificationSchema', () => {
    it('requires studentFirstName and studentLastName', () => {
      expect(studentIdentificationSchema.required).to.include('studentFirstName');
      expect(studentIdentificationSchema.required).to.include('studentLastName');
    });

    it('requires ssnOrFileNumberIndicator', () => {
      expect(studentIdentificationSchema.required).to.include(
        'ssnOrFileNumberIndicator',
      );
    });

    it('requires benefitChapter', () => {
      expect(studentIdentificationSchema.required).to.include('benefitChapter');
    });

    it('studentSsn has 9-digit pattern', () => {
      const { studentSsn } = studentIdentificationSchema.properties;
      expect(studentSsn.pattern).to.equal('^\\d{9}$');
    });

    it('benefitChapter schema has enum values', () => {
      const { benefitChapter } = studentIdentificationSchema.properties;
      expect(benefitChapter.enum).to.include('chapter_33');
      expect(benefitChapter.enum).to.include('chapter_30');
    });

    it('ssnOrFileNumberIndicator schema has correct enum', () => {
      const { ssnOrFileNumberIndicator } = studentIdentificationSchema.properties;
      expect(ssnOrFileNumberIndicator.enum).to.deep.equal(['ssn', 'va_file_number']);
    });
  });

  describe('studentIdentificationUiSchema', () => {
    it('has studentFirstName ui config', () => {
      expect(studentIdentificationUiSchema.studentFirstName).to.be.an('object');
    });

    it('has ssnOrFileNumberIndicator ui config', () => {
      expect(studentIdentificationUiSchema.ssnOrFileNumberIndicator).to.be.an(
        'object',
      );
    });

    it('studentSsn has expandUnder option', () => {
      expect(
        studentIdentificationUiSchema.studentSsn['ui:options'],
      ).to.have.property('expandUnder', 'ssnOrFileNumberIndicator');
    });
  });

  describe('priorCertificationReferenceSchema', () => {
    it('requires originalCertBeginDate and originalCertEndDate', () => {
      expect(priorCertificationReferenceSchema.required).to.include(
        'originalCertBeginDate',
      );
      expect(priorCertificationReferenceSchema.required).to.include(
        'originalCertEndDate',
      );
    });

    it('requires originalCreditHours', () => {
      expect(priorCertificationReferenceSchema.required).to.include(
        'originalCreditHours',
      );
    });

    it('originalCreditHours has correct min and max', () => {
      const { originalCreditHours } =
        priorCertificationReferenceSchema.properties;
      expect(originalCreditHours.minimum).to.equal(1);
      expect(originalCreditHours.maximum).to.equal(99);
    });

    it('originalEnrollmentType has enum values', () => {
      const { originalEnrollmentType } =
        priorCertificationReferenceSchema.properties;
      expect(originalEnrollmentType.enum).to.include('full_time');
      expect(originalEnrollmentType.enum).to.include('half_time');
    });
  });

  describe('priorCertificationReferenceUiSchema', () => {
    it('has originalCertBeginDate ui config', () => {
      expect(priorCertificationReferenceUiSchema.originalCertBeginDate).to.be.an(
        'object',
      );
    });

    it('originalCertBeginDate has ui:validations', () => {
      expect(
        priorCertificationReferenceUiSchema.originalCertBeginDate[
          'ui:validations'
        ],
      ).to.be.an('array');
    });
  });
});