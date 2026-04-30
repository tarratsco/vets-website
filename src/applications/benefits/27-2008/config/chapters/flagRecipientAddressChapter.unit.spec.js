import { expect } from 'chai';
import {
  flagRecipientAddressUiSchema,
  flagRecipientAddressSchema,
} from './flagRecipientAddressChapter';

describe('flagRecipientAddressChapter', () => {
  it('uiSchema has flagRecipient group', () => {
    expect(flagRecipientAddressUiSchema.flagRecipient).to.exist;
  });

  it('uiSchema has address fields', () => {
    expect(
      flagRecipientAddressUiSchema.flagRecipient.recipientAddressLine1,
    ).to.exist;
    expect(
      flagRecipientAddressUiSchema.flagRecipient.recipientCity,
    ).to.exist;
    expect(
      flagRecipientAddressUiSchema.flagRecipient.recipientState,
    ).to.exist;
    expect(
      flagRecipientAddressUiSchema.flagRecipient.recipientZip,
    ).to.exist;
  });

  it('schema requires address fields', () => {
    const rec = flagRecipientAddressSchema.properties.flagRecipient;
    expect(rec.required).to.include('recipientAddressLine1');
    expect(rec.required).to.include('recipientCity');
    expect(rec.required).to.include('recipientState');
    expect(rec.required).to.include('recipientZip');
  });

  it('recipientPhone is not required', () => {
    const rec = flagRecipientAddressSchema.properties.flagRecipient;
    expect(rec.required).to.not.include('recipientPhone');
  });
});