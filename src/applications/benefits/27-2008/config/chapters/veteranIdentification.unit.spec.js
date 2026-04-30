import { expect } from 'chai';
import {
  veteranIdentificationUiSchema,
  veteranIdentificationSchema,
} from './veteranIdentification';

describe('veteranIdentification page', () => {
  it('uiSchema has veteranInformation group', () => {
    expect(veteranIdentificationUiSchema).to.have.property('veteranInformation');
  });

  it('uiSchema has vaFileNumber, socialSecurityNumber, militaryServiceNumber', () => {
    const vi = veteranIdentificationUiSchema.veteranInformation;
    expect(vi).to.have.property('vaFileNumber');
    expect(vi).to.have.property('socialSecurityNumber');
    expect(vi).to.have.property('militaryServiceNumber');
  });

  it('schema has no required fields (all optional)', () => {
    const vi = veteranIdentificationSchema.properties.veteranInformation;
    expect(vi.required || []).to.deep.equal([]);
  });

  it('schema has correct pattern for vaFileNumber', () => {
    const props = veteranIdentificationSchema.properties.veteranInformation.properties;
    expect(props.vaFileNumber.pattern).to.equal('^[0-9]{7,9}$');
  });

  it('schema has correct pattern for socialSecurityNumber', () => {
    const props = veteranIdentificationSchema.properties.veteranInformation.properties;
    expect(props.socialSecurityNumber.pattern).to.equal('^[0-9]{9}$');
  });
});