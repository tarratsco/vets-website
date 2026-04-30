import { expect } from 'chai';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './flagRecipientAddress';

describe('chapters/flagRecipientAddress', () => {
  it('exports uiSchema and schema', () => {
    expect(flagRecipientAddressUiSchema).to.be.an('object');
    expect(flagRecipientAddressSchema).to.be.an('object');
  });

  it('has all required address fields in uiSchema', () => {
    const fields = flagRecipientAddressUiSchema.flagRecipient;
    expect(fields.recipientAddressLine1).to.exist;
    expect(fields.recipientCity).to.exist;
    expect(fields.recipientState).to.exist;
    expect(fields.recipientZip).to.exist;
    expect(fields.recipientPhone).to.exist;
  });

  it('schema requires address line 1, city, state, zip', () => {
    const required =
      flagRecipientAddressSchema.properties.flagRecipient.required;
    expect(required).to.include('recipientAddressLine1');
    expect(required).to.include('recipientCity');
    expect(required).to.include('recipientState');
    expect(required).to.include('recipientZip');
  });

  it('phone is not required', () => {
    const required =
      flagRecipientAddressSchema.properties.flagRecipient.required;
    expect(required).to.not.include('recipientPhone');
  });

  it('recipientZip has correct pattern', () => {
    const zipSchema =
      flagRecipientAddressSchema.properties.flagRecipient.properties
        .recipientZip;
    expect(zipSchema.pattern).to.equal('^[0-9]{5}(-[0-9]{4})?$');
  });

  it('recipientPhone has correct pattern', () => {
    const phoneSchema =
      flagRecipientAddressSchema.properties.flagRecipient.properties
        .recipientPhone;
    expect(phoneSchema.pattern).to.equal('^[0-9]{10}$');
  });
});