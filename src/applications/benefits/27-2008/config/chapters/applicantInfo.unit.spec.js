import { expect } from 'chai';
import { applicantInfoUiSchema, applicantInfoSchema } from './applicantInfo';

describe('chapters/applicantInfo', () => {
  it('exports uiSchema and schema', () => {
    expect(applicantInfoUiSchema).to.be.an('object');
    expect(applicantInfoSchema).to.be.an('object');
  });

  it('has name fields in uiSchema', () => {
    const fields = applicantInfoUiSchema.applicant;
    expect(fields.firstName).to.exist;
    expect(fields.middleName).to.exist;
    expect(fields.lastName).to.exist;
  });

  it('has address fields in uiSchema', () => {
    const fields = applicantInfoUiSchema.applicant;
    expect(fields.addressLine1).to.exist;
    expect(fields.city).to.exist;
    expect(fields.state).to.exist;
    expect(fields.zip).to.exist;
  });

  it('has relationshipToVeteran in uiSchema', () => {
    expect(applicantInfoUiSchema.applicant.relationshipToVeteran).to.exist;
  });

  it('schema requires first name, last name, address, and relationship', () => {
    const required = applicantInfoSchema.properties.applicant.required;
    expect(required).to.include('firstName');
    expect(required).to.include('lastName');
    expect(required).to.include('addressLine1');
    expect(required).to.include('city');
    expect(required).to.include('state');
    expect(required).to.include('zip');
    expect(required).to.include('relationshipToVeteran');
  });

  it('schema does not require middleName', () => {
    const required = applicantInfoSchema.properties.applicant.required;
    expect(required).to.not.include('middleName');
  });

  it('relationshipToVeteran schema includes funeralDirector', () => {
    const enumValues =
      applicantInfoSchema.properties.applicant.properties
        .relationshipToVeteran.enum;
    expect(enumValues).to.include('funeralDirector');
    expect(enumValues).to.include('survivingSpouse');
    expect(enumValues).to.include('vsoRepresentative');
  });
});