import { expect } from 'chai';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './flagRecipientInfo';

describe('flagRecipientInfo page', () => {
  it('uiSchema has flagRecipient group', () => {
    expect(flagRecipientInfoUiSchema).to.have.property('flagRecipient');
  });

  it('uiSchema has recipientFullName and recipientRelationship', () => {
    const fr = flagRecipientInfoUiSchema.flagRecipient;
    expect(fr).to.have.property('recipientFullName');
    expect(fr).to.have.property('recipientRelationship');
  });

  it('schema requires recipientFullName and recipientRelationship', () => {
    const fr = flagRecipientInfoSchema.properties.flagRecipient;
    expect(fr.required).to.include('recipientFullName');
    expect(fr.required).to.include('recipientRelationship');
  });

  it('schema has correct maxLength for recipientFullName', () => {
    const props = flagRecipientInfoSchema.properties.flagRecipient.properties;
    expect(props.recipientFullName.maxLength).to.equal(80);
  });

  it('recipientRelationship schema includes survivingSpouse and friend', () => {
    const props = flagRecipientInfoSchema.properties.flagRecipient.properties;
    expect(props.recipientRelationship.enum).to.include('survivingSpouse');
    expect(props.recipientRelationship.enum).to.include('friend');
    expect(props.recipientRelationship.enum).to.include('other');
  });
});