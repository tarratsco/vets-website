import { expect } from 'chai';
import { burialFlagTransform } from './transform';
import formConfig from './form';

describe('config/transform', () => {
  it('is a function', () => {
    expect(burialFlagTransform).to.be.a('function');
  });

  it('returns a JSON string', () => {
    const mockForm = {
      data: {
        applicantType: 'nextOfKin',
        veteranInformation: {
          firstName: 'John',
          lastName: 'Smith',
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
          dateReleasedFromActiveDuty: '1965-01-01',
        },
        eligibility: {
          documentationAvailable: 'Y',
          dischargeCharacter: 'honorable',
        },
        flagRecipient: {
          recipientFullName: 'Jane Smith',
          recipientRelationship: 'survivingSpouse',
          recipientAddressLine1: '123 Main St',
          recipientCity: 'Richmond',
          recipientState: 'VA',
          recipientZip: '23220',
        },
        applicant: {
          firstName: 'Jane',
          lastName: 'Smith',
          addressLine1: '123 Main St',
          city: 'Richmond',
          state: 'VA',
          zip: '23220',
          relationshipToVeteran: 'survivingSpouse',
        },
        dateSigned: '2024-01-15',
        certificationChecked: true,
      },
      pages: {},
    };

    const result = burialFlagTransform(formConfig, mockForm);
    expect(result).to.be.a('string');

    const parsed = JSON.parse(result);
    expect(parsed).to.have.property('burialFlagApplication');
  });

  it('maps veteranInformation fields correctly', () => {
    const mockForm = {
      data: {
        veteranInformation: {
          firstName: 'John',
          lastName: 'Smith',
          dateOfBirth: '1940-01-01',
          dateOfDeath: '2024-01-01',
          dateOfBurial: '2024-01-10',
          placeOfBurialCemeteryName: 'Arlington',
          placeOfBurialCity: 'Arlington',
          placeOfBurialState: 'VA',
        },
        serviceInformation: { branchOfService: ['army'] },
        eligibility: {},
        flagRecipient: {},
        applicant: {},
      },
      pages: {},
    };

    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.veteranFirstName).to.equal('John');
    expect(result.burialFlagApplication.veteranLastName).to.equal('Smith');
    expect(result.burialFlagApplication.placeOfBurialState).to.equal('VA');
  });

  it('maps serviceInformation branchOfService correctly', () => {
    const mockForm = {
      data: {
        veteranInformation: {},
        serviceInformation: { branchOfService: ['army', 'navy'] },
        eligibility: {},
        flagRecipient: {},
        applicant: {},
      },
      pages: {},
    };

    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.branchOfService).to.deep.equal([
      'army',
      'navy',
    ]);
  });

  it('maps remarks correctly', () => {
    const mockForm = {
      data: {
        veteranInformation: {},
        serviceInformation: {},
        eligibility: {},
        flagRecipient: {},
        applicant: {},
        remarks: 'Some remarks text',
      },
      pages: {},
    };

    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.remarks).to.equal('Some remarks text');
  });
});