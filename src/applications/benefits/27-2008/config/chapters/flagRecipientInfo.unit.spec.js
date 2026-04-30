import { expect } from 'chai';
import {
  flagRecipientInfoUiSchema,
  flagRecipientInfoSchema,
} from './flagRecipientInfo';

describe('chapters/flagRecipientInfo', () => {
  it('should export uiSchema and schema', () => {
    expect(flagRecipientInfoUiSchema).to.be.an('object');
    expect(flagRecipientInfoSchema).to.be.an('object');
  });

  it('uiSchema should have recipientFullName and recipientRelationship', () => {
    const { flagRecipient } = flagRecipientInfoUiSchema;
    expect(flagRecipient).to.have.property('recipientFullName');
    expect(flagRecipient).to.have.property('recipientRelationship');
  });

  it('schema should require recipientFullName and recipientRelationship', () => {
    const { required } = flagRecipientInfoSchema.properties.flagRecipient;
    expect(required).to.include('recipientFullName');
    expect(required).to.include('recipientRelationship');
  });

  it('recipientRelationship enum should include survivingSpouse and friend', () => {
    const { recipientRelationship } = flagRecipientInfoSchema.properties.flagRecipient.properties;
    expect(recipientRelationship.enum).to.include('survivingSpouse');
    expect(recipientRelationship.enum).to.include('friend');
  });

  it('recipientFullName maxLength should be 80', () => {
    const { recipientFullName } = flagRecipientInfoSchema.properties.flagRecipient.properties;
    expect(recipientFullName.maxLength).to.equal(80);
  });
});