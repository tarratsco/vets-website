import { expect } from 'chai';
import { documentUploadUiSchema, documentUploadSchema } from './documentUpload';

describe('documentUpload page', () => {
  it('uiSchema has documents group with dd214Upload', () => {
    expect(documentUploadUiSchema.documents).to.have.property('dd214Upload');
  });

  it('schema has documents.dd214Upload property', () => {
    expect(documentUploadSchema.properties.documents.properties).to.have.property(
      'dd214Upload',
    );
  });

  it('dd214Upload uiSchema has required function', () => {
    const dd214UI = documentUploadUiSchema.documents.dd214Upload;
    const requiredFn = dd214UI['ui:required'] || dd214UI['ui:options']?.required;
    expect(requiredFn).to.be.a('function');
  });

  it('dd214Upload required returns true when documentationAvailable is yes', () => {
    const dd214UI = documentUploadUiSchema.documents.dd214Upload;
    const requiredFn = dd214UI['ui:required'] || dd214UI['ui:options']?.required;
    const result = requiredFn({ eligibility: { documentationAvailable: 'yes' } });
    expect(result).to.equal(true);
  });

  it('dd214Upload required returns false when documentationAvailable is no', () => {
    const dd214UI = documentUploadUiSchema.documents.dd214Upload;
    const requiredFn = dd214UI['ui:required'] || dd214UI['ui:options']?.required;
    const result = requiredFn({ eligibility: { documentationAvailable: 'no' } });
    expect(result).to.equal(false);
  });
});