import { expect } from 'chai';
import {
  dependentInformationUiSchema,
  dependentInformationSchema,
} from './dependentInformation';

describe('chapters/dependentInformation', () => {
  it('uiSchema has dependentFullName', () => {
    expect(dependentInformationUiSchema).to.have.property('dependentFullName');
  });

  it('uiSchema has dependentSocialSecurityNumber', () => {
    expect(dependentInformationUiSchema).to.have.property('dependentSocialSecurityNumber');
  });

  it('uiSchema has dependentDateOfBirth', () => {
    expect(dependentInformationUiSchema).to.have.property('dependentDateOfBirth');
  });

  it('schema requires dependentFullName', () => {
    expect(dependentInformationSchema.required).to.include('dependentFullName');
  });

  it('schema requires dependentSocialSecurityNumber', () => {
    expect(dependentInformationSchema.required).to.include('dependentSocialSecurityNumber');
  });

  it('schema requires dependentDateOfBirth', () => {
    expect(dependentInformationSchema.required).to.include('dependentDateOfBirth');
  });
});