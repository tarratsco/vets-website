import { expect } from 'chai';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './dischargeCharacterChapter';

describe('dischargeCharacterChapter', () => {
  it('uiSchema has eligibility.dischargeCharacter field', () => {
    expect(
      dischargeCharacterUiSchema.eligibility.dischargeCharacter,
    ).to.exist;
  });

  it('schema requires dischargeCharacter', () => {
    const elig =
      dischargeCharacterSchema.properties.eligibility;
    expect(elig.required).to.include('dischargeCharacter');
  });

  it('schema enum includes honorable, dishonorable, unknown', () => {
    const enumVals =
      dischargeCharacterSchema.properties.eligibility.properties
        .dischargeCharacter.enum;
    expect(enumVals).to.include('honorable');
    expect(enumVals).to.include('dishonorable');
    expect(enumVals).to.include('unknown');
  });
});