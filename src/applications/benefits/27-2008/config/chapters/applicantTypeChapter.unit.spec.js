import { expect } from 'chai';
import {
  applicantTypeUiSchema,
  applicantTypeSchema,
} from './applicantTypeChapter';

describe('applicantTypeChapter', () => {
  it('uiSchema has applicantType field', () => {
    expect(applicantTypeUiSchema.applicantType).to.exist;
  });

  it('schema requires applicantType', () => {
    expect(applicantTypeSchema.properties.applicantType).to.exist;
    expect(applicantTypeSchema.required).to.include('applicantType');
  });

  it('schema enum includes all applicant type values', () => {
    const enumValues =
      applicantTypeSchema.properties.applicantType.enum;
    expect(enumValues).to.include('nextOfKin');
    expect(enumValues).to.include('funeralDirector');
    expect(enumValues).to.include('vsoRepresentative');
    expect(enumValues).to.include('closeFriend');
  });
});