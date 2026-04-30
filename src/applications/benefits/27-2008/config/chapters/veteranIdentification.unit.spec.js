import { expect } from 'chai';
import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './veteranIdentification';

describe('chapters/veteranIdentification', () => {
  it('exports uiSchema', () => {
    expect(veteranIdentificationUiSchema).to.be.an('object');
    expect(veteranIdentificationUiSchema.veteranInformation).to.exist;
  });

  it('has vaFileNumber, socialSecurityNumber, militaryServiceNumber fields', () => {
    const fields = veteranIdentificationUiSchema.veteranInformation;
    expect(fields.vaFileNumber).to.exist;
    expect(fields.socialSecurityNumber).to.exist;
    expect(fields.militaryServiceNumber).to.exist;
  });

  it('schema does not require any identification fields', () => {
    const required =
      veteranIdentificationSchema.properties.veteranInformation.required;
    expect(required).to.be.undefined;
  });

  it('vaFileNumber schema has correct pattern', () => {
    const props =
      veteranIdentificationSchema.properties.veteranInformation.properties;
    expect(props.vaFileNumber.pattern).to.equal('^[0-9]{7,9}$');
  });

  it('socialSecurityNumber schema has correct pattern', () => {
    const props =
      veteranIdentificationSchema.properties.veteranInformation.properties;
    expect(props.socialSecurityNumber.pattern).to.equal('^[0-9]{9}$');
  });
});