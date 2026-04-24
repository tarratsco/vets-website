import { expect } from 'chai';
import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './supportingDocumentation';

describe('supportingDocumentation chapter', () => {
  describe('supportingDocumentationSchema', () => {
    it('has supportingDocumentIds property', () => {
      expect(supportingDocumentationSchema.properties).to.have.property(
        'supportingDocumentIds',
      );
    });

    it('supportingDocumentIds is an object schema', () => {
      expect(supportingDocumentationSchema.type).to.equal('object');
    });

    it('does not require supportingDocumentIds', () => {
      expect(supportingDocumentationSchema.required).to.be.undefined;
    });
  });

  describe('supportingDocumentationUiSchema', () => {
    it('has supportingDocumentIds ui config', () => {
      expect(supportingDocumentationUiSchema.supportingDocumentIds).to.be.an(
        'object',
      );
    });

    it('has ui:title', () => {
      expect(supportingDocumentationUiSchema['ui:title']).to.equal(
        'Supporting documentation',
      );
    });
  });
});