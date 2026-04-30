import { expect } from 'chai';
import {
  remarksUiSchema,
  remarksSchema,
  isRemarksRequired,
} from './remarksChapter';

describe('remarksChapter', () => {
  it('uiSchema has remarks field', () => {
    expect(remarksUiSchema.remarks).to.exist;
  });

  it('schema has remarks string property with maxLength', () => {
    expect(remarksSchema.properties.remarks.type).to.equal('string');
    expect(remarksSchema.properties.remarks.maxLength).to.equal(1500);
  });

  describe('isRemarksRequired', () => {
    it('returns true when documentationAvailable is false', () => {
      expect(
        isRemarksRequired({
          eligibility: { documentationAvailable: false },
        }),
      ).to.be.true;
    });

    it('returns true when recipientRelationship is friend', () => {
      expect(
        isRemarksRequired({
          flagRecipient: { recipientRelationship: 'friend' },
        }),
      ).to.be.true;
    });

    it('returns true when recipientRelationship is other', () => {
      expect(
        isRemarksRequired({
          flagRecipient: { recipientRelationship: 'other' },
        }),
      ).to.be.true;
    });

    it('returns true when applicantType is closeFriend', () => {
      expect(
        isRemarksRequired({ applicantType: 'closeFriend' }),
      ).to.be.true;
    });

    it('returns true when branchOfService includes other', () => {
      expect(
        isRemarksRequired({
          serviceInformation: {
            branchOfService: ['army', 'other'],
          },
        }),
      ).to.be.true;
    });

    it('returns false when none of the conditions apply', () => {
      expect(
        isRemarksRequired({
          eligibility: { documentationAvailable: true },
          flagRecipient: { recipientRelationship: 'survivingSpouse' },
          applicantType: 'nextOfKin',
          serviceInformation: { branchOfService: ['army'] },
        }),
      ).to.be.false;
    });

    it('returns false for empty formData', () => {
      expect(isRemarksRequired({})).to.be.false;
    });

    it('returns false for null formData', () => {
      expect(isRemarksRequired(null)).to.be.false;
    });
  });

  describe('remarks validation', () => {
    const validate = remarksUiSchema.remarks['ui:validations'][0];
    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        remarks: { addError: msg => messages.push(msg || '') },
      };
    });

    it('adds error when remarks required but empty', () => {
      validate(errors, {
        eligibility: { documentationAvailable: false },
        remarks: '',
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not error when remarks not required and empty', () => {
      validate(errors, {
        eligibility: { documentationAvailable: true },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
        remarks: '',
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('does not error when remarks required and filled in', () => {
      validate(errors, {
        eligibility: { documentationAvailable: false },
        remarks: 'I personally knew this Veteran for many years.',
      });
      expect(messages).to.have.lengthOf(0);
    });
  });
});