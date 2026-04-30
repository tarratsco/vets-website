import { expect } from 'chai';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './dischargeCharacter';

describe('dischargeCharacter page', () => {
  it('uiSchema has eligibility.dischargeCharacter', () => {
    expect(dischargeCharacterUiSchema.eligibility).to.have.property(
      'dischargeCharacter',
    );
  });

  it('schema requires dischargeCharacter', () => {
    const elg = dischargeCharacterSchema.properties.eligibility;
    expect(elg.required).to.include('dischargeCharacter');
  });

  it('schema enum includes honorable, dishonorable, unknown', () => {
    const props = dischargeCharacterSchema.properties.eligibility.properties;
    expect(props.dischargeCharacter.enum).to.include('honorable');
    expect(props.dischargeCharacter.enum).to.include('dishonorable');
    expect(props.dischargeCharacter.enum).to.include('unknown');
  });
});