import { expect } from 'chai';
import {
  insuranceInformationUiSchema,
  insuranceInformationSchema,
} from './insuranceInformation';

describe('insuranceInformation page', () => {
  it('exports uiSchema and schema', () => {
    expect(insuranceInformationUiSchema).to.be.an('object');
    expect(insuranceInformationSchema).to.be.an('object');
  });

  it('hasCurrentInsurance is required', () => {
    const required =
      insuranceInformationUiSchema.hasCurrentInsurance['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('insuranceDocumentGuids is required when hasCurrentInsurance is true', () => {
    const required =
      insuranceInformationUiSchema.insuranceDocumentGuids['ui:required'];
    expect(required).to.be.a('function');
    expect(required({ hasCurrentInsurance: true })).to.be.true;
    expect(required({ hasCurrentInsurance: false })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('medicareDocumentGuid is not required', () => {
    const required =
      insuranceInformationUiSchema.medicareDocumentGuid['ui:required'];
    expect(required).to.be.false;
  });

  it('schema requires hasCurrentInsurance', () => {
    expect(insuranceInformationSchema.required).to.include('hasCurrentInsurance');
  });
});