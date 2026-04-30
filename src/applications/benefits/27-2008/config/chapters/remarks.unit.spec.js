import { expect } from 'chai';
import { remarksUiSchema, remarksSchema, isRemarksRequired, validateRemarks } from './remarks';

describe('chapters/remarks', () => {
  let messages;

  beforeEach(() => {
    messages = [];
  });

  it('should export uiSchema and schema', () => {
    expect(remarksUiSchema).to.be.an('object');
    expect(remarksSchema).to.be.an('object');
  });

  it('uiSchema should have remarks field', () => {
    expect(remarksUiSchema).to.have.property('remarks');
  });

  it('schema remarks should have maxLength of 1500', () => {
    expect(remarksSchema.properties.remarks.maxLength).to.equal(1500);
  });

  describe('isRemarksRequired', () => {
    it('should return true when documentationAvailable is false', () => {
      const formData = { eligibility: { documentationAvailable: false } };
      expect(isRemarksRequired(formData)).to.be.true;
    });

    it('should return true when recipientRelationship is friend', () => {
      const formData = { flagRecipient: { recipientRelationship: 'friend' } };
      expect(isRemarksRequired(formData)).to.be.true;
    });

    it('should return true when applicantType is closeFriend', () => {
      const formData = { applicantType: 'closeFriend' };
      expect(isRemarksRequired(formData)).to.be.true;
    });

    it('should return true when branchOfService includes other', () => {
      const formData = {
        serviceInformation: { branchOfService: ['army', 'other'] },
      };
      expect(isRemarksRequired(formData)).to.be.true;
    });

    it('should return false when none of the conditions are met', () => {
      const formData = {
        eligibility: { documentationAvailable: true, dischargeCharacter: 'honorable' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      };
      expect(isRemarksRequired(formData)).to.be.false;
    });

    it('should return false with null formData', () => {
      expect(() => isRemarksRequired(null)).to.not.throw();
      expect(isRemarksRequired(null)).to.be.false;
    });

    it('should return false with empty formData', () => {
      expect(isRemarksRequired({})).to.be.false;
    });
  });

  describe('validateRemarks', () => {
    it('should add error when required and remarks is empty', () => {
      const errors = { remarks: { addError: msg => messages.push(msg) } };
      const formData = { eligibility: { documentationAvailable: false } };
      validateRemarks(errors, {}, formData);
      expect(messages).to.have.lengthOf(1);
    });

    it('should not add error when required and remarks is provided', () => {
      const errors = { remarks: { addError: msg => messages.push(msg) } };
      const formData = { eligibility: { documentationAvailable: false } };
      const pageData = { remarks: 'I personally knew this Veteran.' };
      validateRemarks(errors, pageData, formData);
      expect(messages).to.have.lengthOf(0);
    });

    it('should not add error when not required and remarks is empty', () => {
      const errors = { remarks: { addError: msg => messages.push(msg) } };
      const formData = {
        eligibility: { documentationAvailable: true },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      };
      validateRemarks(errors, {}, formData);
      expect(messages).to.have.lengthOf(0);
    });
  });
});