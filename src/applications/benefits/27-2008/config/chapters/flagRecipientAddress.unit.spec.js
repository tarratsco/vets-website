import { expect } from 'chai';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './flagRecipientAddress';

describe('flagRecipientAddress page', () => {
  describe('uiSchema', () => {
    it('has flagRecipient group', () => {
      expect(flagRecipientAddressUiSchema.flagRecipient).to.be.an('object');
    });

    it('has recipientAddressLine1 field', () => {
      expect(
        flagRecipientAddressUiSchema.flagRecipient.recipientAddressLine1,
      ).to.be.an('object');
    });

    it('has recipientCity field', () => {
      expect(
        flagRecipientAddressUiSchema.flagRecipient.recipientCity,
      ).to.be.an('object');
    });

    it('has recipientState field', () => {
      expect(
        flagRecipientAddressUiSchema.flagRecipient.recipientState,
      ).to.be.an('object');
    });

    it('has recipientZip field', () => {
      expect(
        flagRecipientAddressUiSchema.flagRecipient.recipientZip,
      ).to.be.an('object');
    });

    it('has recipientPhone field (optional)', () => {
      expect(
        flagRecipientAddressUiSchema.flagRecipient.recipientPhone,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires address line 1, city, state, zip', () => {
      const required =
        flagRecipientAddressSchema.properties.flagRecipient.required;
      expect(required).to.include('recipientAddressLine1');
      expect(required).to.include('recipientCity');
      expect(required).to.include('recipientState');
      expect(required).to.include('recipientZip');
    });

    it('does not require recipientPhone', () => {
      const required =
        flagRecipientAddressSchema.properties.flagRecipient.required;
      expect(required).to.not.include('recipientPhone');
    });
  });

  describe('validateZip', () => {
    let zipMessages;
    const makeErrors = () => {
      zipMessages = [];
      return {
        flagRecipient: {
          recipientZip: {
            addError: msg => zipMessages.push(msg || ''),
          },
          recipientPhone: {
            addError: () => {},
          },
        },
      };
    };

    it('does not add error for valid 5-digit ZIP', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: '22001',
            recipientPhone: '',
          },
        });
      });
      expect(zipMessages).to.have.lengthOf(0);
    });

    it('does not add error for valid ZIP+4', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: '22001-1234',
            recipientPhone: '',
          },
        });
      });
      expect(zipMessages).to.have.lengthOf(0);
    });

    it('adds error for invalid ZIP', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: 'BADZIP',
            recipientPhone: '',
          },
        });
      });
      expect(zipMessages).to.have.lengthOf(1);
    });
  });

  describe('validatePhone', () => {
    let phoneMessages;
    const makeErrors = () => {
      phoneMessages = [];
      return {
        flagRecipient: {
          recipientZip: { addError: () => {} },
          recipientPhone: {
            addError: msg => phoneMessages.push(msg || ''),
          },
        },
      };
    };

    it('does not add error for valid 10-digit phone', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: '22001',
            recipientPhone: '5555551234',
          },
        });
      });
      expect(phoneMessages).to.have.lengthOf(0);
    });

    it('adds error for invalid phone number', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: '22001',
            recipientPhone: '123',
          },
        });
      });
      expect(phoneMessages).to.have.lengthOf(1);
    });

    it('does not add error when phone is empty (optional)', () => {
      const errors = makeErrors();
      const validations = flagRecipientAddressUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          flagRecipient: {
            recipientZip: '22001',
          },
        });
      });
      expect(phoneMessages).to.have.lengthOf(0);
    });
  });
});