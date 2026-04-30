import { expect } from 'chai';
import {
  applicantInfoUiSchema,
  applicantInfoSchema,
} from './applicantInfoChapter';

describe('applicantInfoChapter', () => {
  it('uiSchema has applicant group', () => {
    expect(applicantInfoUiSchema.applicant).to.exist;
  });

  it('uiSchema has name fields', () => {
    expect(applicantInfoUiSchema.applicant.firstName).to.exist;
    expect(applicantInfoUiSchema.applicant.lastName).to.exist;
  });

  it('uiSchema has address fields', () => {
    expect(applicantInfoUiSchema.applicant.addressLine1).to.exist;
    expect(applicantInfoUiSchema.applicant.city).to.exist;
    expect(applicantInfoUiSchema.applicant.state).to.exist;
    expect(applicantInfoUiSchema.applicant.zip).to.exist;
  });

  it('uiSchema has relationshipToVeteran field', () => {
    expect(applicantInfoUiSchema.applicant.relationshipToVeteran).to
      .exist;
  });

  it('schema requires firstName, lastName, address, and relationship', () => {
    const app = applicantInfoSchema.properties.applicant;
    expect(app.required).to.include('firstName');
    expect(app.required).to.include('lastName');
    expect(app.required).to.include('addressLine1');
    expect(app.required).to.include('city');
    expect(app.required).to.include('state');
    expect(app.required).to.include('zip');
    expect(app.required).to.include('relationshipToVeteran');
  });
});