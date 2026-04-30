import { expect } from 'chai';
import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './veteranIdentification';

describe('chapters/veteranIdentification', () => {
  it('should export uiSchema and schema', () => {
    expect(veteranIdentificationUiSchema).to.be.an('object');
    expect(veteranIdentificationSchema).to.be.an('object');
  });

  it('uiSchema should have veteranInformation with identification fields', () => {
    const { veteranInformation } = veteranIdentificationUiSchema;
    expect(veteranInformation).to.have.property('vaFileNumber');
    expect(veteranInformation).to.have.property('socialSecurityNumber');
    expect(veteranInformation).to.have.property('militaryServiceNumber');
  });

  it('schema vaFileNumber should have correct pattern', () => {
    const { vaFileNumber } = veteranIdentificationSchema.properties.veteranInformation.properties;
    expect(vaFileNumber.pattern).to.equal('^[0-9]{7,9}$');
  });

  it('schema should not require identification fields', () => {
    const { required } = veteranIdentificationSchema.properties.veteranInformation || {};
    if (required) {
      expect(required).to.not.include('socialSecurityNumber');
      expect(required).to.not.include('vaFileNumber');
    }
  });
});