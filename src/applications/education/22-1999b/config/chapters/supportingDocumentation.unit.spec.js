import { expect } from 'chai';
import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './supportingDocumentation';

describe('chapters/supportingDocumentation', () => {
  describe('supportingDocumentationUiSchema', () => {
    it('exports a uiSchema object', () => {
      expect(supportingDocumentationUiSchema).to.be.an('object');
    });

    it('has supportingDocumentIds field', () => {
      expect(
        supportingDocumentationUiSchema.supportingDocumentation
          .supportingDocumentIds,
      ).to.exist;
    });

    it('supportingDocumentIds has a ui:title', () => {
      const field =
        supportingDocumentationUiSchema.supportingDocumentation
          .supportingDocumentIds;
      expect(field['ui:title']).to.equal('Upload supporting documentation');
    });
  });

  describe('supportingDocumentationSchema', () => {
    it('exports a schema object', () => {
      expect(supportingDocumentationSchema).to.be.an('object');
    });

    it('has supportingDocumentation property', () => {
      expect(supportingDocumentationSchema.properties).to.have.property(
        'supportingDocumentation',
      );
    });

    it('supportingDocumentation is not in required', () => {
      expect(supportingDocumentationSchema.required).to.not.exist;
    });
  });
});