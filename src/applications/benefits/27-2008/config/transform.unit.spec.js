import { expect } from 'chai';
import { burialFlagTransform } from './transform';
import formConfig from './form';

describe('burialFlagTransform', () => {
  const mockForm = {
    data: {
      applicantType: 'nextOfKin',
      veteranInformation: {
        firstName: 'John',
        middleName: 'A',
        lastName: 'Doe',
        maidenOrOtherName: '',
        vaFileNumber: '123456789',
        socialSecurityNumber: '123456789',
        militaryServiceNumber: '',
        dateOfBirth: '1940-05-15',
        dateOfDeath: '2024-01-01',
        dateOfBurial: '2024-01-10',
        placeOfBurialCemeteryName: 'Arlington National Cemetery',
        placeOfBurialCity: 'Arlington',
        placeOfBurialState: 'VA',
      },
      serviceInformation: {
        branchOfService: ['army'],
        dateEnteredActiveDuty: '1960-01-01',
        dateReleasedFromActiveDuty: '1964-12-31',
      },
      eligibility: {
        documentationAvailable: 'yes',
        dischargeCharacter: 'honorable',
        reserveGuardCriteria: [],
      },
      flagRecipient: {
        recipientFullName: 'Jane Doe',
        recipientRelationship: 'survivingSpouse',
        recipientAddressLine1: '123 Main St',
        recipientCity: 'Springfield',
        recipientState: 'VA',
        recipientZip: '22001',
        recipientPhone: '5555551234',
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
      remarks: '',
      dateSigned: '2024-01-05',
    },
    pages: {},
  };

  it('returns a JSON string', () => {
    const result = burialFlagTransform(formConfig, mockForm);
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('wraps data in burialFlagApplication key', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result).to.have.property('burialFlagApplication');
  });

  it('maps veteran first name correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.veteranFirstName).to.equal('John');
  });

  it('maps veteran last name correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.veteranLastName).to.equal('Doe');
  });

  it('maps branchOfService array correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.branchOfService).to.deep.equal([
      'army',
    ]);
  });

  it('maps applicantType correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.applicantType).to.equal('nextOfKin');
  });

  it('maps flag recipient full name correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.flagRecipientFullName).to.equal(
      'Jane Doe',
    );
  });

  it('maps dateSigned correctly', () => {
    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.dateSigned).to.equal('2024-01-05');
  });
});