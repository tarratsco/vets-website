import { expect } from 'chai';
import { burialFlagTransform } from './transform';

// Minimal formConfig stub
const mockFormConfig = { formId: '27-2008' };

const mockForm = {
  data: {
    applicantType: 'nextOfKin',
    veteranInformation: {
      firstName: 'John',
      middleName: 'A',
      lastName: 'Doe',
      dateOfBirth: '1940-01-01',
      dateOfDeath: '2024-01-01',
      dateOfBurial: '2024-01-10',
      placeOfBurialCemeteryName: 'Arlington',
      placeOfBurialCity: 'Arlington',
      placeOfBurialState: 'VA',
    },
    serviceInformation: {
      branchOfService: ['army'],
      dateEnteredActiveDuty: '1960-01-01',
      dateReleasedFromActiveDuty: '1964-01-01',
    },
    eligibility: {
      documentationAvailable: 'yes',
      dischargeCharacter: 'honorable',
    },
    flagRecipient: {
      recipientFullName: 'Jane Doe',
      recipientRelationship: 'survivingSpouse',
      recipientAddressLine1: '123 Main St',
      recipientCity: 'Springfield',
      recipientState: 'VA',
      recipientZip: '22001',
    },
    applicant: {
      firstName: 'Jane',
      lastName: 'Doe',
      addressLine1: '123 Main St',
      city: 'Springfield',
      state: 'VA',
      zip: '22001',
      relationshipToVeteran: 'survivingSpouse',
    },
    dateSigned: '2024-01-10',
    certificationChecked: true,
  },
  pages: {},
};

describe('burialFlagTransform', () => {
  it('returns a JSON string', () => {
    const result = burialFlagTransform(mockFormConfig, mockForm);
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('wraps data in burialFlagApplication key', () => {
    const result = JSON.parse(burialFlagTransform(mockFormConfig, mockForm));
    expect(result).to.have.property('burialFlagApplication');
  });

  it('maps veteran first and last name', () => {
    const result = JSON.parse(burialFlagTransform(mockFormConfig, mockForm));
    expect(result.burialFlagApplication.veteranFirstName).to.equal('John');
    expect(result.burialFlagApplication.veteranLastName).to.equal('Doe');
  });

  it('maps branchOfService array', () => {
    const result = JSON.parse(burialFlagTransform(mockFormConfig, mockForm));
    expect(result.burialFlagApplication.branchOfService).to.deep.equal(['army']);
  });

  it('maps applicantType', () => {
    const result = JSON.parse(burialFlagTransform(mockFormConfig, mockForm));
    expect(result.burialFlagApplication.applicantType).to.equal('nextOfKin');
  });

  it('maps flagRecipient fields', () => {
    const result = JSON.parse(burialFlagTransform(mockFormConfig, mockForm));
    expect(result.burialFlagApplication.flagRecipientFullName).to.equal('Jane Doe');
    expect(result.burialFlagApplication.flagRecipientRelationship).to.equal(
      'survivingSpouse',
    );
  });
});