import { expect } from 'chai';
import {
  documentationCheckUiSchema,
  documentationCheckSchema,
} from './documentationCheck';

describe('chapters/documentationCheck', () => {
  it('exports uiSchema and schema', () => {
    expect(documentationCheckUiSchema).to.be.an('object');
    expect(documentationCheckSchema).to.be.an('object');
  });

  it('has documentationAvailable in uiSchema', () => {
    expect(
      documentationCheckUiSchema.eligibility.documentationAvailable,
    ).to.exist;
  });

  it('schema requires documentationAvailable', () => {
    const required = documentationCheckSchema.properties.eligibility.required;
    expect(required).to.include('documentationAvailable');
  });

  it('schema enum has Y and N values', () => {
    const enumValues =
      documentationCheckSchema.properties.eligibility.properties
        .documentationAvailable.enum;
    expect(enumValues).to.include('Y');
    expect(enumValues).to.include('N');
  });
});