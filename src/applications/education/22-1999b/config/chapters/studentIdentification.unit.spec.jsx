import { expect } from 'chai';

import {
  studentIdentificationUiSchema,
  studentIdentificationSchema,
  BENEFIT_CHAPTER_KEYS,
} from '../chapters/studentIdentification';

describe('studentIdentification page', () => {
  describe('uiSchema', () => {
    it('has studentFirstName field', () => {
      expect(studentIdentificationUiSchema.studentFirstName).to.exist;
    });

    it('studentFirstName has correct title', () => {
      expect(
        studentIdentificationUiSchema.studentFirstName['ui:title'],
      ).to.equal("Student's first name");
    });

    it('has ssnOrFileNumberIndicator radio field', () => {
      expect(
        studentIdentificationUiSchema.ssnOrFileNumberIndicator,
      ).to.exist;
    });

    it('ssnOrFileNumberIndicator uses VaRadioField', () => {
      expect(
        studentIdentificationUiSchema.ssnOrFileNumberIndicator[
          'ui:webComponentField'
        ],
      ).to.exist;
    });

    it('has benefitChapter select field', () => {
      expect(studentIdentificationUiSchema.benefitChapter).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(studentIdentificationSchema.type).to.equal('object');
    });

    it('requires studentFirstName', () => {
      expect(studentIdentificationSchema.required).to.include(
        'studentFirstName',
      );
    });

    it('requires ssnOrFileNumberIndicator', () => {
      expect(studentIdentificationSchema.required).to.include(
        'ssnOrFileNumberIndicator',
      );
    });

    it('requires benefitChapter', () => {
      expect(studentIdentificationSchema.required).to.include(
        'benefitChapter',
      );
    });

    it('ssnOrFileNumberIndicator schema has enum', () => {
      expect(
        studentIdentificationSchema.properties.ssnOrFileNumberIndicator.enum,
      ).to.deep.equal(['ssn', 'va_file_number']);
    });

    it('BENEFIT_CHAPTER_KEYS has expected chapters', () => {
      expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_33');
      expect(BENEFIT_CHAPTER_KEYS).to.include('chapter_30');
    });
  });
});