import { expect } from 'chai';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './flagRecipientAddress';

describe('chapters/flagRecipientAddress', () => {
  it('should export uiSchema and schema', () => {
    expect(flagRecipientAddressUiSchema).to.be.an('object');
    expect(flagRecipientAddressSchema).to.be.an('object');
  });

  it('uiSchema should have address and phone fields', () => {
    const { flagRecipient } = flagRecipientAddressUiSchema;
    expect(flagRecipient).to.have.property('recipientAddressLine1');
    expect(flagRecipient).to.have.property('recipientCity');
    expect(flagRecipient).to.have.property('recipientState');
    expect(flagRecipient).to.have.property('recipientZip');
    expect(flagRecipient).to.have.property('recipientPhone');
  });

  it('schema should require address fields but not phone', () => {
    const { required } = flagRecipientAddressSchema.properties.flagRecipient;
    expect(required).to.include('recipientAddressLine1');
    expect(required).to.include('recipientCity');
    expect(required).to.include('recipientState');
    expect(required).to.include('recipientZip');
    expect(required).to.not.include('recipientPhone');
  });

  it('recipientZip should have correct pattern', () => {
    const { recipientZip } = flagRecipientAddressSchema.properties.flagRecipient.properties;
    expect(recipientZip.pattern).to.equal('^[0-9]{5}(-[0-9]{4})?$');
  });

  it('recipientPhone should have 10-digit pattern', () => {
    const { recipientPhone } = flagRecipientAddressSchema.properties.flagRecipient.properties;
    expect(recipientPhone.pattern).to.equal('^[0-9]{10}$');
  });
});