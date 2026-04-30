import { expect } from 'chai';
import {
  applicantInfoUiSchema,
  applicantInfoSchema,
} from './applicantInfo';

describe('applicantInfo page', () => {
  describe('uiSchema', () => {
    it('has applicant group', () => {
      expect(applicantInfoUiSchema.applicant).to.be.an('object');
    });

    it('has firstName field', () => {
      expect(applicantInfoUiSchema.applicant.firstName).to.be.an('object');
    });

    it('has lastName field', () => {
      expect(applicantInfoUiSchema.applicant.lastName).to.be.an('object');
    });

    it('has addressLine1 field', () => {
      expect(applicantInfoUiSchema.applicant.addressLine1).to.be.an('object');
    });

    it('has state field', () => {
      expect(applicantInfoUiSchema.applicant.state).to.be.an('object');
    });

    it('has relationshipToVeteran field', () => {
      expect(
        applicantInfoUiSchema.applicant.relationshipToVeteran,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires firstName, lastName, address fields, and relationship', () => {
      const required = applicantInfoSchema.properties.applicant.required;
      expect(required).to.include('firstName');
      expect(required).to.include('lastName');
      expect(required).to.include('addressLine1');
      expect(required).to.include('city');
      expect(required).to.include('state');
      expect(required).to.include('zip');
      expect(required).to.include('relationshipToVeteran');
    });

    it('does not require middleName', () => {
      const required = applicantInfoSchema.properties.applicant.required;
      expect(required).to.not.include('middleName');
    });
  });

  describe('validateApplicantOtherRelationship', () => {
    let messages;
    const makeErrors = () => {
      messages = [];
      return {
        applicant: {
          relationshipToVeteranOther: {
            addError: msg => messages.push(msg || ''),
          },
        },
      };
    };

    it('does not add error when relationship is not otherAuthorizedRepresentative', () => {
      const errors = makeErrors();
      const validations = applicantInfoUiSchema['ui:validations'];
      expect(validations).to.be.an('array');
      validations.forEach(fn => {
        fn(errors, {
          applicant: {
            relationshipToVeteran: 'survivingSpouse',
            relationshipToVeteranOther: '',
          },
        });
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when relationship is otherAuthorizedRepresentative and no description', () => {
      const errors = makeErrors();
      const validations = applicantInfoUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          applicant: {
            relationshipToVeteran: 'otherAuthorizedRepresentative',
            relationshipToVeteranOther: '',
          },
        });
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when relationship is other and description provided', () => {
      const errors = makeErrors();
      const validations = applicantInfoUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          applicant: {
            relationshipToVeteran: 'otherAuthorizedRepresentative',
            relationshipToVeteranOther: 'Legal guardian',
          },
        });
      });
      expect(messages).to.have.lengthOf(0);
    });
  });
});