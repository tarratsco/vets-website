import { expect } from 'chai';
import {
  eligibilityDocumentationUiSchema,
  eligibilityDocumentationSchema,
} from './eligibilityDocumentation';

describe('eligibilityDocumentation page', () => {
  it('uiSchema has eligibility.documentationAvailable', () => {
    expect(eligibilityDocumentationUiSchema.eligibility).to.have.property(
      'documentationAvailable',
    );
  });

  it('schema requires documentationAvailable', () => {
    const elg = eligibilityDocumentationSchema.properties.eligibility;
    expect(elg.required).to.include('documentationAvailable');
  });

  it('schema has yes/no enum values', () => {
    const props = eligibilityDocumentationSchema.properties.eligibility.properties;
    expect(props.documentationAvailable.enum).to.include('yes');
    expect(props.documentationAvailable.enum).to.include('no');
  });
});