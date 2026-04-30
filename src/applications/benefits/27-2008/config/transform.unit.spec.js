import { expect } from 'chai';
import { burialFlagTransform } from './transform';
import formConfig from './form';

describe('config/transform', () => {
  it('should export burialFlagTransform as a function', () => {
    expect(burialFlagTransform).to.be.a('function');
  });

  it('should return a JSON string', () => {
    const mockForm = {
      data: {
        veteranInformation: { firstName: 'John', lastName: 'Doe' },
        serviceInformation: { branchOfService: ['army'] },
        eligibility: { documentationAvailable: true, dischargeCharacter: 'honorable' },
        flagRecipient: { recipientFullName: 'Jane Doe', recipientRelationship: 'survivingSpouse' },
        applicant: { firstName: 'Jane', lastName: 'Doe', relationshipToVeteran: 'survivingSpouse' },
        dateSigned: '2024-01-15',
        certificationChecked: true,
      },
      pages: {},
    };

    const result = burialFlagTransform(formConfig, mockForm);
    expect(result).to.be.a('string');
    expect(() => JSON.parse(result)).to.not.throw();
  });

  it('should include burialFlagApplication key in output', () => {
    const mockForm = {
      data: {},
      pages: {},
    };

    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result).to.have.property('burialFlagApplication');
  });

  it('should map veteranInformation fields correctly', () => {
    const mockForm = {
      data: {
        veteranInformation: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1940-01-15',
          dateOfDeath: '2024-01-01',
        },
      },
      pages: {},
    };

    const result = JSON.parse(burialFlagTransform(formConfig, mockForm));
    expect(result.burialFlagApplication.veteranFirstName).to.equal('John');
    expect(result.burialFlagApplication.veteranLastName).to.equal('Doe');
  });
});