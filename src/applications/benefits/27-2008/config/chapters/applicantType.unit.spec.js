import { expect } from 'chai';
import {
  applicantTypeUiSchema,
  applicantTypeSchema,
} from './applicantType';

describe('chapters/applicantType', () => {
  it('should export applicantTypeUiSchema as an object', () => {
    expect(applicantTypeUiSchema).to.be.an('object');
  });

  it('should export applicantTypeSchema as an object', () => {
    expect(applicantTypeSchema).to.be.an('object');
  });

  it('uiSchema should have applicantType field', () => {
    expect(applicantTypeUiSchema).to.have.property('applicantType');
  });

  it('schema should require applicantType', () => {
    expect(applicantTypeSchema.properties.applicantType).to.be.an('object');
    expect(applicantTypeSchema.required).to.include('applicantType');
  });

  it('schema applicantType enum should include all four roles', () => {
    const { enum: enumValues } = applicantTypeSchema.properties.applicantType;
    expect(enumValues).to.include('nextOfKin');
    expect(enumValues).to.include('funeralDirector');
    expect(enumValues).to.include('vsoRepresentative');
    expect(enumValues).to.include('closeFriend');
  });
});