import { expect } from 'chai';
import { documentUploadUiSchema, documentUploadSchema } from './documentUpload';

describe('chapters/documentUpload', () => {
  it('exports uiSchema and schema', () => {
    expect(documentUploadUiSchema).to.be.an('object');
    expect(documentUploadSchema).to.be.an('object');
  });

  it('has documents.dd214Upload in uiSchema', () => {
    expect(documentUploadUiSchema.documents).to.exist;
    expect(documentUploadUiSchema.documents.dd214Upload).to.exist;
  });

  it('schema has documents.dd214Upload property', () => {
    expect(documentUploadSchema.properties.documents).to.exist;
    expect(documentUploadSchema.properties.documents.properties.dd214Upload).to
      .exist;
  });

  it('required function returns true when documentationAvailable is Y', () => {
    const requiredFn =
      documentUploadUiSchema.documents.dd214Upload['ui:required'] ||
      documentUploadUiSchema.documents.dd214Upload['ui:options']?.required;
    if (typeof requiredFn === 'function') {
      const result = requiredFn({
        eligibility: { documentationAvailable: 'Y' },
      });
      expect(result).to.equal(true);
    }
  });

  it('required function returns false when documentationAvailable is N', () => {
    const requiredFn =
      documentUploadUiSchema.documents.dd214Upload['ui:required'] ||
      documentUploadUiSchema.documents.dd214Upload['ui:options']?.required;
    if (typeof requiredFn === 'function') {
      const result = requiredFn({
        eligibility: { documentationAvailable: 'N' },
      });
      expect(result).to.equal(false);
    }
  });
});