import { expect } from 'chai';

import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from '../chapters/supportingDocumentation';

describe('supportingDocumentation page', () => {
  describe('uiSchema', () => {
    it('has supportingDocumentIds field', () => {
      expect(supportingDocumentationUiSchema.supportingDocumentIds).to.exist;
    });

    it('supportingDocumentIds has correct title', () => {
      expect(
        supportingDocumentationUiSchema.supportingDocumentIds['ui:title'],
      ).to.equal('Upload supporting documentation');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(supportingDocumentationSchema.type).to.equal('object');
    });

    it('has supportingDocumentIds property', () => {
      expect(
        supportingDocumentationSchema.properties.supportingDocumentIds,
      ).to.exist;
    });
  });
});