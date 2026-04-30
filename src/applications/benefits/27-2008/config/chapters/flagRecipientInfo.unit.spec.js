import { expect } from 'chai';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './flagRecipientInfo';

describe('flagRecipientInfo page', () => {
  describe('uiSchema', () => {
    it('has flagRecipient group', () => {
      expect(flagRecipientInfoUiSchema.flagRecipient).to.be.an('object');
    });

    it('has recipientFullName field', () => {
      expect(
        flagRecipientInfoUiSchema.flagRecipient.recipientFullName,
      ).to.be.an('object');
    });

    it('has recipientRelationship field', () => {
      expect(
        flagRecipientInfoUiSchema.flagRecipient.recipientRelationship,
      ).to.be.an('object');
    });

    it('has recipientRelationshipOther field', () => {
      expect(
        flagRecipientInfoUiSchema.flagRecipient.recipientRelationshipOther,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires recipientFullName and recipientRelationship', () => {
      const required =
        flagRecipientInfoSchema.properties.flagRecipient.required;
      expect(required).to.include('recipientFullName');
      expect(required).to.include('recipientRelationship');
    });

    it('does not require recipientRelationshipOther', () => {
      const required =
        flagRecipientInfoSchema.properties.flagRecipient.required;
      expect(required).to.not.include('recipientRelationshipOther');
    });
  });

  describe('validateOtherRelationship', () => {
    let messages;
    const makeErrors = () => {
      messages = [];
      return {
        flagRecipient: {
          recipientRelationshipOther: {
            addError: msg => messages.push(msg || ''),
          },
        },
      };
    };

    it('does not add error when relationship is not other', () => {
      const errors = makeErrors();
      const validations = flagRecipientInfoUiSchema['ui:validations'];
      expect(validations).to.be.an('array');
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientRelationship: 'survivingSpouse',
            recipientRelationshipOther: '',
          },
        });
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when relationship is other and no description provided', () => {
      const errors = makeErrors();
      const validations = flagRecipientInfoUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientRelationship: 'other',
            recipientRelationshipOther: '',
          },
        });
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when relationship is other and description is provided', () => {
      const errors = makeErrors();
      const validations = flagRecipientInfoUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientRelationship: 'other',
            recipientRelationshipOther: 'Close companion',
          },
        });
      });
      expect(messages).to.have.lengthOf(0);
    });
  });
});