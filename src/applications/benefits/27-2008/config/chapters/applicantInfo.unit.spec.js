import { expect } from 'chai';
import { applicantInfoUiSchema, applicantInfoSchema } from './applicantInfo';

describe('applicantInfo page', () => {
  it('uiSchema has applicant group', () => {
    expect(applicantInfoUiSchema).to.have.property('applicant');
  });

  it('uiSchema has name and address fields', () => {
    const ap = applicantInfoUiSchema.applicant;
    expect(ap).to.have.property('firstName');
    expect(ap).to.have.property('lastName');
    expect(ap).to.have.property('addressLine1');
    expect(ap).to.have.property('city');
    expect(ap).to.have.property('state');
    expect(ap).to.have.property('zip');
    expect(ap).to.have.property('relationshipToVeteran');
  });

  it('schema requires firstName, lastName, addressLine1, city, state, zip, relationshipToVeteran', () => {
    const ap = applicantInfoSchema.properties.applicant;
    expect(ap.required).to.include('firstName');
    expect(ap.required).to.include('lastName');
    expect(ap.required).to.include('addressLine1');
    expect(ap.required).to.include('city');
    expect(ap.required).to.include('state');
    expect(ap.required).to.include('zip');
    expect(ap.required).to.include('relationshipToVeteran');
  });

  it('relationshipToVeteran enum includes funeralDirector', () => {
    const props = applicantInfoSchema.properties.applicant.properties;
    expect(props.relationshipToVeteran.enum).to.include('funeralDirector');
  });

  it('zip has correct pattern', () => {
    const props = applicantInfoSchema.properties.applicant.properties;
    expect(props.zip.pattern).to.equal('^[0-9]{5}(-[0-9]{4})?$');
  });
});