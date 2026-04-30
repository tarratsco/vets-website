import { expect } from 'chai';
import { applicantTypeUiSchema, applicantTypeSchema } from './applicantType';

describe('applicantType page', () => {
  it('uiSchema has applicantType field', () => {
    expect(applicantTypeUiSchema).to.have.property('applicantType');
  });

  it('schema requires applicantType', () => {
    expect(applicantTypeSchema.properties.applicantType).to.be.an('object');
    expect(applicantTypeSchema.required).to.include('applicantType');
  });

  it('schema includes all applicant type enum values', () => {
    const enumValues = applicantTypeSchema.properties.applicantType.enum;
    expect(enumValues).to.include('nextOfKin');
    expect(enumValues).to.include('funeralDirector');
    expect(enumValues).to.include('vsoRepresentative');
    expect(enumValues).to.include('closeFriend');
  });

  it('uiSchema has error message', () => {
    expect(applicantTypeUiSchema.applicantType['ui:errorMessages']).to.be.an('object');
  });
});