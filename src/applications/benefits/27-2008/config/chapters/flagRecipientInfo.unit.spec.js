import { expect } from 'chai';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './flagRecipientInfo';

describe('chapters/flagRecipientInfo', () => {
  it('exports uiSchema and schema', () => {
    expect(flagRecipientInfoUiSchema).to.be.an('object');
    expect(flagRecipientInfoSchema).to.be.an('object');
  });

  it('has recipientFullName and recipientRelationship in uiSchema', () => {
    const fields = flagRecipientInfoUiSchema.flagRecipient;
    expect(fields.recipientFullName).to.exist;
    expect(fields.recipientRelationship).to.exist;
  });

  it('schema requires recipientFullName and recipientRelationship', () => {
    const required =
      flagRecipientInfoSchema.properties.flagRecipient.required;
    expect(required).to.include('recipientFullName');
    expect(required).to.include('recipientRelationship');
  });

  it('schema has friend in recipientRelationship enum', () => {
    const enumValues =
      flagRecipientInfoSchema.properties.flagRecipient.properties
        .recipientRelationship.enum;
    expect(enumValues).to.include('friend');
    expect(enumValues).to.include('survivingSpouse');
    expect(enumValues).to.include('other');
  });
});