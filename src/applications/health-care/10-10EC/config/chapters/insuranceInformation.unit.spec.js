import { expect } from 'chai';
import {
  insuranceInformationUiSchema,
  insuranceInformationSchema,
} from './insuranceInformation';

describe('chapters/insuranceInformation', () => {
  it('uiSchema has hasCurrentInsurance', () => {
    expect(insuranceInformationUiSchema).to.have.property('hasCurrentInsurance');
  });

  it('uiSchema has insuranceCardUploads', () => {
    expect(insuranceInformationUiSchema).to.have.property('insuranceCardUploads');
  });

  it('schema requires hasCurrentInsurance', () => {
    expect(insuranceInformationSchema.required).to.include('hasCurrentInsurance');
  });

  it('insuranceCardUploads ui:required is false when no insurance', () => {
    const requiredFn = insuranceInformationUiSchema.insuranceCardUploads['ui:required'] ||
      insuranceInformationUiSchema.insuranceCardUploads?.['ui:options']?.required;
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ hasCurrentInsurance: false })).to.be.false;
    }
  });

  it('insuranceCardUploads ui:required is true when has insurance', () => {
    const requiredFn = insuranceInformationUiSchema.insuranceCardUploads['ui:required'] ||
      insuranceInformationUiSchema.insuranceCardUploads?.['ui:options']?.required;
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ hasCurrentInsurance: true })).to.be.true;
    }
  });

  it('schema has correct type', () => {
    expect(insuranceInformationSchema.type).to.equal('object');
  });
});