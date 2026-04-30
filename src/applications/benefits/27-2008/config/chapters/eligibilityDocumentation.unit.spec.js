import { expect } from 'chai';
import {
  eligibilityDocumentationUiSchema,
  eligibilityDocumentationSchema,
} from './eligibilityDocumentation';

describe('eligibilityDocumentation page', () => {
  describe('uiSchema', () => {
    it('has eligibility group with documentationAvailable field', () => {
      expect(
        eligibilityDocumentationUiSchema.eligibility.documentationAvailable,
      ).to.be.an('object');
    });

    it('has a title for the radio field', () => {
      const field =
        eligibilityDocumentationUiSchema.eligibility.documentationAvailable;
      expect(field['ui:title']).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('requires documentationAvailable', () => {
      const required =
        eligibilityDocumentationSchema.properties.eligibility.required;
      expect(required).to.include('documentationAvailable');
    });

    it('has yes and no enum values', () => {
      const enumValues =
        eligibilityDocumentationSchema.properties.eligibility.properties
          .documentationAvailable.enum;
      expect(enumValues).to.include('yes');
      expect(enumValues).to.include('no');
    });
  });
});