import { expect } from 'chai';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './dischargeCharacter';

describe('chapters/dischargeCharacter', () => {
  it('exports uiSchema and schema', () => {
    expect(dischargeCharacterUiSchema).to.be.an('object');
    expect(dischargeCharacterSchema).to.be.an('object');
  });

  it('has dischargeCharacter field in uiSchema', () => {
    expect(dischargeCharacterUiSchema.eligibility.dischargeCharacter).to.exist;
  });

  it('schema requires dischargeCharacter', () => {
    const required = dischargeCharacterSchema.properties.eligibility.required;
    expect(required).to.include('dischargeCharacter');
  });

  it('schema enum has honorable, dishonorable, unknown', () => {
    const enumValues =
      dischargeCharacterSchema.properties.eligibility.properties
        .dischargeCharacter.enum;
    expect(enumValues).to.include('honorable');
    expect(enumValues).to.include('dishonorable');
    expect(enumValues).to.include('unknown');
  });
});