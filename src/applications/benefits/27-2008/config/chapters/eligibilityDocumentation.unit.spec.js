import { expect } from 'chai';
import {
  eligibilityDocumentationUiSchema,
  eligibilityDocumentationSchema,
} from './eligibilityDocumentation';

describe('chapters/eligibilityDocumentation', () => {
  it('should export uiSchema and schema', () => {
    expect(eligibilityDocumentationUiSchema).to.be.an('object');
    expect(eligibilityDocumentationSchema).to.be.an('object');
  });

  it('uiSchema should have documentationAvailable field', () => {
    const { eligibility } = eligibilityDocumentationUiSchema;
    expect(eligibility).to.have.property('documentationAvailable');
  });

  it('schema should require documentationAvailable', () => {
    const { required } = eligibilityDocumentationSchema.properties.eligibility;
    expect(required).to.include('documentationAvailable');
  });

  it('documentationAvailable schema type should be boolean', () => {
    const { documentationAvailable } = eligibilityDocumentationSchema.properties.eligibility.properties;
    expect(documentationAvailable.type).to.equal('boolean');
  });
});