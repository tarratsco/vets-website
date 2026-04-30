import { expect } from 'chai';
import { remarksUiSchema, remarksSchema } from './remarks';

describe('remarks page', () => {
  it('uiSchema has remarks field', () => {
    expect(remarksUiSchema).to.have.property('remarks');
  });

  it('schema has remarks property with maxLength 1500', () => {
    expect(remarksSchema.properties.remarks.maxLength).to.equal(1500);
  });

  it('remarks is required when documentationAvailable is no', () => {
    const requiredFn = remarksUiSchema.remarks['ui:required'];
    expect(requiredFn).to.be.a('function');
    expect(
      requiredFn({ eligibility: { documentationAvailable: 'no' } }),
    ).to.equal(true);
  });

  it('remarks is required when recipientRelationship is friend', () => {
    const requiredFn = remarksUiSchema.remarks['ui:required'];
    expect(
      requiredFn({ flagRecipient: { recipientRelationship: 'friend' } }),
    ).to.equal(true);
  });

  it('remarks is required when applicantType is closeFriend', () => {
    const requiredFn = remarksUiSchema.remarks['ui:required'];
    expect(requiredFn({ applicantType: 'closeFriend' })).to.equal(true);
  });

  it('remarks is not required when no trigger conditions are met', () => {
    const requiredFn = remarksUiSchema.remarks['ui:required'];
    expect(
      requiredFn({
        eligibility: { documentationAvailable: 'yes', dischargeCharacter: 'honorable' },
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        applicantType: 'nextOfKin',
        serviceInformation: { branchOfService: ['army'] },
      }),
    ).to.equal(false);
  });

  it('remarks validation adds error when required but empty', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = remarksUiSchema.remarks['ui:validations'];
    validate(
      errors,
      '',
      { eligibility: { documentationAvailable: 'no' } },
    );
    expect(messages.length).to.equal(1);
  });

  it('remarks validation passes when required and value provided', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = remarksUiSchema.remarks['ui:validations'];
    validate(
      errors,
      'This is a valid remark explaining eligibility.',
      { eligibility: { documentationAvailable: 'no' } },
    );
    expect(messages.length).to.equal(0);
  });

  it('remarks validation passes when not required and empty', () => {
    const messages = [];
    const errors = { addError: msg => messages.push(msg || '') };
    const [validate] = remarksUiSchema.remarks['ui:validations'];
    validate(
      errors,
      '',
      {
        eligibility: { documentationAvailable: 'yes' },
        applicantType: 'nextOfKin',
        flagRecipient: { recipientRelationship: 'survivingSpouse' },
        serviceInformation: { branchOfService: ['army'] },
      },
    );
    expect(messages.length).to.equal(0);
  });

  it('remarks is required when branchOfService includes other', () => {
    const requiredFn = remarksUiSchema.remarks['ui:required'];
    expect(
      requiredFn({ serviceInformation: { branchOfService: ['army', 'other'] } }),
    ).to.equal(true);
  });
});