import { expect } from 'chai';
import { burialFlagTransform } from './transform';

const mockFormConfig = { formId: '27-2008' };

const buildMockForm = (dataOverrides = {}) => ({
  data: {
    applicantType: 'nextOfKin',
    veteranInformation: {
      firstName: 'John',
      middleName: 'A',
      lastName: 'Smith',
      dateOfBirth: '1940-05-01',
      dateOfDeath: '2024-01-01',
      dateOfBurial: '2024-01-15',
      placeOfBurialCemeteryName: 'Arlington National Cemetery',
      placeOfBurialCity: 'Arlington',
      placeOfBurialState: 'VA',
    },
    serviceInformation: {
      branchOfService: ['army'],
      dateEnteredActiveDuty: '1960-01-01',
      dateReleasedFromActiveDuty: '1965-01-01',
    },
    eligibility: {
      documentationAvailable: true,
      dischargeCharacter: 'honorable',
    },
    flagRecipient: {
      recipientFullName: 'Jane Smith',
      recipientRelationship: 'survivingSpouse',
      recipientAddressLine1: '123 Main St',
      recipientCity: 'Springfield',
      recipientState: 'VA',
      recipientZip: '22301',
    },
    applicant: {
      firstName: 'Jane',
      lastName: 'Smith',
      addressLine1: '123 Main St',
      city: 'Springfield',
      state: 'VA',
      zip: '22301',
      relationshipToVeteran: 'survivingSpouse',
    },
    dateSigned: '2024-01-10',
    certificationChecked: true,
    ...dataOverrides,
  },
});

describe('config/transform', () => {
  it('returns a JSON string', () => {
    const result = burialFlagTransform(
      mockFormConfig,
      buildMockForm(),
    );
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('wraps output in burialFlagApplication key', () => {
    const result = JSON.parse(
      burialFlagTransform(mockFormConfig, buildMockForm()),
    );
    expect(result.burialFlagApplication).to.be.an('object');
  });

  it('maps veteran name fields correctly', () => {
    const result = JSON.parse(
      burialFlagTransform(mockFormConfig, buildMockForm()),
    );
    const app = result.burialFlagApplication;
    expect(app.veteranFirstName).to.equal('John');
    expect(app.veteranLastName).to.equal('Smith');
  });

  it('maps applicantType to payload', () => {
    const result = JSON.parse(
      burialFlagTransform(mockFormConfig, buildMockForm()),
    );
    expect(result.burialFlagApplication.applicantType).to.equal(
      'nextOfKin',
    );
  });

  it('maps branchOfService array', () => {
    const result = JSON.parse(
      burialFlagTransform(mockFormConfig, buildMockForm()),
    );
    expect(result.burialFlagApplication.branchOfService).to.deep.equal(
      ['army'],
    );
  });

  it('maps flagRecipient fields', () => {
    const result = JSON.parse(
      burialFlagTransform(mockFormConfig, buildMockForm()),
    );
    const app = result.burialFlagApplication;
    expect(app.flagRecipientFullName).to.equal('Jane Smith');
    expect(app.flagRecipientRelationship).to.equal('survivingSpouse');
  });

  it('handles missing optional fields gracefully', () => {
    const form = buildMockForm();
    delete form.data.veteranInformation.middleName;
    expect(() =>
      burialFlagTransform(mockFormConfig, form),
    ).to.not.throw();
  });
});