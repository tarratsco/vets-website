import { expect } from 'chai';
import { applicantTypeUiSchema, applicantTypeSchema } from './applicantType';

describe('chapters/applicantType', () => {
  it('exports applicantTypeUiSchema', () => {
    expect(applicantTypeUiSchema).to.be.an('object');
    expect(applicantTypeUiSchema).to.have.property('applicantType');
  });

  it('has required radio options in schema', () => {
    expect(applicantTypeSchema.properties.applicantType.enum).to.include(
      'nextOfKin',
    );
    expect(applicantTypeSchema.properties.applicantType.enum).to.include(
      'funeralDirector',
    );
    expect(applicantTypeSchema.properties.applicantType.enum).to.include(
      'vsoRepresentative',
    );
    expect(applicantTypeSchema.properties.applicantType.enum).to.include(
      'closeFriend',
    );
  });

  it('has applicantType in required array', () => {
    expect(applicantTypeSchema.required).to.include('applicantType');
  });

  it('uiSchema applicantType has a ui:title', () => {
    expect(applicantTypeUiSchema.applicantType['ui:title']).to.be.a('string');
  });
});