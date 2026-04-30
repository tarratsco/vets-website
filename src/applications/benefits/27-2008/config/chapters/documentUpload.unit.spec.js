import { expect } from 'chai';
import {
  documentUploadUiSchema,
  documentUploadSchema,
} from './documentUpload';

describe('chapters/documentUpload', () => {
  it('should export uiSchema and schema', () => {
    expect(documentUploadUiSchema).to.be.an('object');
    expect(documentUploadSchema).to.be.an('object');
  });

  it('uiSchema should have documents group with dd214Upload field', () => {
    const { documents } = documentUploadUiSchema;
    expect(documents).to.be.an('object');
    expect(documents).to.have.property('dd214Upload');
  });

  it('schema documents should have dd214Upload property', () => {
    const { documents } = documentUploadSchema.properties;
    expect(documents.properties).to.have.property('dd214Upload');
  });

  it('schema should not require documents (conditional)', () => {
    const topLevelRequired = documentUploadSchema.required;
    if (topLevelRequired) {
      expect(topLevelRequired).to.not.include('documents');
    }
  });
});