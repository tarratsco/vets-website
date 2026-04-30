import { expect } from 'chai';
import {
  applicantInfoUiSchema,
  applicantInfoSchema,
} from './applicantInfo';

describe('chapters/applicantInfo', () => {
  it('should export uiSchema and schema', () => {
    expect(applicantInfoUiSchema).to.be.an('object');
    expect(applicantInfoSchema).to.be.an('object');
  });

  it('uiSchema should have name and address fields', () => {
    const { applicant } = applicantInfoUiSchema;
    expect(applicant).to.have.property('firstName');
    expect(applicant).to.have.property('lastName');
    expect(applicant).to.have.property('addressLine1');
    expect(applicant).to.have.property('city');
    expect(applicant).to.have.property('state');
    expect(applicant).to.have.property('zip');
    expect(applicant).to.have.property('relationshipToVeteran');
  });

  it('schema should require core fields', () => {
    const { required } = applicantInfoSchema.properties.applicant;
    expect(required).to.include('firstName');
    expect(required).to.include('lastName');
    expect(required).to.include('addressLine1');
    expect(required).to.include('city');
    expect(required).to.include('state');
    expect(required).to.include('zip');
    expect(required).to.include('relationshipToVeteran');
    expect(required).to.not.include('middleName');
  });

  it('relationshipToVeteran enum should include funeralDirector', () => {
    const { relationshipToVeteran } = applicantInfoSchema.properties.applicant.properties;
    expect(relationshipToVeteran.enum).to.include('funeralDirector');
  });
});