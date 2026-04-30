import { expect } from 'chai';
import {
  documentUploadUiSchema,
  documentUploadSchema,
} from './documentUpload';

describe('documentUpload page', () => {
  describe('uiSchema', () => {
    it('has documents group', () => {
      expect(documentUploadUiSchema.documents).to.be.an('object');
    });

    it('has dd214Upload field', () => {
      expect(documentUploadUiSchema.documents.dd214Upload).to.be.an('object');
    });

    it('dd214Upload has a title', () => {
      const field = documentUploadUiSchema.documents.dd214Upload;
      expect(field['ui:title']).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has documents group with dd214Upload property', () => {
      expect(
        documentUploadSchema.properties.documents.properties.dd214Upload,
      ).to.be.an('object');
    });
  });
});