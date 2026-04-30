import { expect } from 'chai';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './dischargeCharacter';

describe('chapters/dischargeCharacter', () => {
  it('should export uiSchema and schema', () => {
    expect(dischargeCharacterUiSchema).to.be.an('object');
    expect(dischargeCharacterSchema).to.be.an('object');
  });

  it('uiSchema should have dischargeCharacter field', () => {
    const { eligibility } = dischargeCharacterUiSchema;
    expect(eligibility).to.have.property('dischargeCharacter');
  });

  it('schema should require dischargeCharacter', () => {
    const { required } = dischargeCharacterSchema.properties.eligibility;
    expect(required).to.include('dischargeCharacter');
  });

  it('dischargeCharacter enum should include honorable, dishonorable, unknown', () => {
    const { dischargeCharacter } = dischargeCharacterSchema.properties.eligibility.properties;
    expect(dischargeCharacter.enum).to.include('honorable');
    expect(dischargeCharacter.enum).to.include('dishonorable');
    expect(dischargeCharacter.enum).to.include('unknown');
  });
});