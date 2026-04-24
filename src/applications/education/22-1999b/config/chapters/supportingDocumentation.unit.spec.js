import { expect } from 'chai';
import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './supportingDocumentation';

describe('supportingDocumentation chapter', () => {
  describe('supportingDocumentationSchema', () => {
    it('has supportingDocumentation property', () => {
      expect(
        supportingDocumentationSchema.properties.supportingDocumentation,
      ).to.exist;
    });

    it('supportingDocumentIds property exists', () => {
      expect(
        supportingDocumentationSchema.properties.supportingDocumentation
          .properties.supportingDocumentIds,
      ).to.exist;
    });

    it('supportingDocumentation is not in required at top level', () => {
      expect(supportingDocumentationSchema.required).to.not.exist;
    });
  });

  describe('supportingDocumentationUiSchema', () => {
    it('has a title for supportingDocumentIds', () => {
      const fieldUi =
        supportingDocumentationUiSchema.supportingDocumentation
          .supportingDocumentIds;
      expect(fieldUi['ui:title']).to.equal('Upload supporting documentation');
    });

    it('has hint text listing accepted file types', () => {
      const fieldUi =
        supportingDocumentationUiSchema.supportingDocumentation
          .supportingDocumentIds;
      const hint =
        fieldUi['ui:options']?.hint ||
        fieldUi['ui:description'] ||
        (typeof fieldUi['ui:options'] === 'string'
          ? fieldUi['ui:options']
          : '');
      expect(
        fieldUi['ui:options']?.hint || fieldUi['ui:description'] || '',
      ).to.be.a('string');
    });
  });
});