import { expect } from 'chai';

import {
  supportingDocumentationUiSchema,
  supportingDocumentationSchema,
} from './supportingDocumentation';

describe('supportingDocumentation page', () => {
  it('uiSchema has supportingDocumentIds field', () => {
    expect(
      supportingDocumentationUiSchema.supportingDocumentation
        .supportingDocumentIds,
    ).to.be.an('object');
  });

  it('uiSchema supportingDocumentIds has a title', () => {
    expect(
      supportingDocumentationUiSchema.supportingDocumentation
        .supportingDocumentIds['ui:title'],
    ).to.equal('Upload supporting documentation');
  });

  it('schema is a valid object', () => {
    expect(supportingDocumentationSchema).to.be.an('object');
    expect(supportingDocumentationSchema.type).to.equal('object');
  });

  it('schema has supportingDocumentation property', () => {
    expect(
      supportingDocumentationSchema.properties.supportingDocumentation,
    ).to.be.an('object');
  });

  it('schema does not require supportingDocumentation at top level', () => {
    expect(supportingDocumentationSchema.required).to.be.undefined;
  });
});