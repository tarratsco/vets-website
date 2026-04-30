import { expect } from 'chai';
import { remarksUiSchema, remarksSchema } from './remarks';

describe('chapters/remarks', () => {
  it('exports uiSchema and schema', () => {
    expect(remarksUiSchema).to.be.an('object');
    expect(remarksSchema).to.be.an('object');
  });

  it('remarks schema has maxLength of 1500', () => {
    expect(remarksSchema.properties.remarks.maxLength).to.equal(1500);
  });

  it('has ui:validations array', () => {
    expect(remarksUiSchema['ui:validations']).to.be.an('array');
    expect(remarksUiSchema['ui:validations'].length).to.be.greaterThan(0);
  });

  describe('validateRemarks', () => {
    const validateFn = remarksUiSchema['ui:validations'][0];

    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        remarks: { addError: msg => messages.push(msg) },
      };
    });

    it('does not add error when documentation is available and remarks empty', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'Y' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when documentationAvailable is N and remarks is empty', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'N' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      });
      expect(messages.length).to.equal(1);
    });

    it('adds error when recipient relationship is friend and remarks is empty', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'Y' },
        flagRecipient: { recipientRelationship: 'friend' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      });
      expect(messages.length).to.equal(1);
    });

    it('adds error when applicantType is closeFriend and remarks is empty', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'Y' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'closeFriend',
        serviceInformation: { branchOfService: ['army'] },
      });
      expect(messages.length).to.equal(1);
    });

    it('does not add error when remarks is provided and required', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'N' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
        remarks: 'I know the Veteran personally and can attest to service.',
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('does not throw on empty formData', () => {
      expect(() => validateFn(errors, {})).to.not.throw();
    });

    it('adds error when branchOfService includes other and remarks is empty', () => {
      validateFn(errors, {
        eligibility: { documentationAvailable: 'Y' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['other'] },
      });
      expect(messages.length).to.equal(1);
    });
  });

  describe('isRemarksRequired function', () => {
    it('uiSchema remarks has a ui:required function', () => {
      expect(remarksUiSchema.remarks['ui:required']).to.be.a('function');
    });

    it('returns true when documentationAvailable is N', () => {
      const fn = remarksUiSchema.remarks['ui:required'];
      expect(
        fn({ eligibility: { documentationAvailable: 'N' } }),
      ).to.equal(true);
    });

    it('returns false when all conditions are false', () => {
      const fn = remarksUiSchema.remarks['ui:required'];
      expect(
        fn({
          eligibility: { documentationAvailable: 'Y' },
          flagRecipient: { recipientRelationship: 'survivingSpouse' },
          applicantType: 'nextOfKin',
          serviceInformation: { branchOfService: ['army'] },
        }),
      ).to.equal(false);
    });
  });
});