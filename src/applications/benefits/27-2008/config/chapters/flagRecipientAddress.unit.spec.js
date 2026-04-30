import { expect } from 'chai';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './flagRecipientAddress';

describe('flagRecipientAddress page', () => {
  it('uiSchema has flagRecipient group with address fields', () => {
    const fr = flagRecipientAddressUiSchema.flagRecipient;
    expect(fr).to.have.property('recipientAddressLine1');
    expect(fr).to.have.property('recipientCity');
    expect(fr).to.have.property('recipientState');
    expect(fr).to.have.property('recipientZip');
  });

  it('schema requires address fields', () => {
    const fr = flagRecipientAddressSchema.properties.flagRecipient;
    expect(fr.required).to.include('recipientAddressLine1');
    expect(fr.required).to.include('recipientCity');
    expect(fr.required).to.include('recipientState');
    expect(fr.required).to.include('recipientZip');
  });

  it('recipientZip has correct pattern', () => {
    const props = flagRecipientAddressSchema.properties.flagRecipient.properties;
    expect(props.recipientZip.pattern).to.equal('^[0-9]{5}(-[0-9]{4})?$');
  });

  it('recipientPhone is optional', () => {
    const fr = flagRecipientAddressSchema.properties.flagRecipient;
    expect((fr.required || [])).to.not.include('recipientPhone');
  });

  it('recipientPhone has correct pattern', () => {
    const props = flagRecipientAddressSchema.properties.flagRecipient.properties;
    expect(props.recipientPhone.pattern).to.equal('^[0-9]{10}$');
  });
});