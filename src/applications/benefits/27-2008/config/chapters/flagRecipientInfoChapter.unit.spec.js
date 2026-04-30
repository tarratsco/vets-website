import { expect } from 'chai';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './flagRecipientInfoChapter';

describe('flagRecipientInfoChapter', () => {
  it('uiSchema has flagRecipient group', () => {
    expect(flagRecipientInfoUiSchema.flagRecipient).to.exist;
  });

  it('uiSchema has recipientFullName field', () => {
    expect(
      flagRecipientInfoUiSchema.flagRecipient.recipientFullName,
    ).to.exist;
  });

  it('uiSchema has recipientRelationship field', () => {
    expect(
      flagRecipientInfoUiSchema.flagRecipient.recipientRelationship,
    ).to.exist;
  });

  it('schema requires recipientFullName and recipientRelationship', () => {
    const rec = flagRecipientInfoSchema.properties.flagRecipient;
    expect(rec.required).to.include('recipientFullName');
    expect(rec.required).to.include('recipientRelationship');
  });

  it('schema enum for recipientRelationship includes survivingSpouse and friend', () => {
    const enumVals =
      flagRecipientInfoSchema.properties.flagRecipient.properties
        .recipientRelationship.enum;
    expect(enumVals).to.include('survivingSpouse');
    expect(enumVals).to.include('friend');
    expect(enumVals).to.include('other');
  });
});