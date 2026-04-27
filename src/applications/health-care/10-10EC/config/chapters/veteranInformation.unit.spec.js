import { expect } from 'chai';
import {
  veteranInformationUiSchema,
  veteranInformationSchema,
} from './veteranInformation';

describe('chapters/veteranInformation', () => {
  it('uiSchema has veteranFullName', () => {
    expect(veteranInformationUiSchema).to.have.property('veteranFullName');
  });

  it('uiSchema has veteranSocialSecurityNumber', () => {
    expect(veteranInformationUiSchema).to.have.property('veteranSocialSecurityNumber');
  });

  it('schema requires veteranFullName', () => {
    expect(veteranInformationSchema.required).to.include('veteranFullName');
  });

  it('schema requires veteranSocialSecurityNumber', () => {
    expect(veteranInformationSchema.required).to.include('veteranSocialSecurityNumber');
  });

  it('schema has correct type', () => {
    expect(veteranInformationSchema.type).to.equal('object');
  });

  it('schema properties includes veteranFullName', () => {
    expect(veteranInformationSchema.properties).to.have.property('veteranFullName');
  });
});