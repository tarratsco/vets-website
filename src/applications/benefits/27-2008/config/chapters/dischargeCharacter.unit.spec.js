import { expect } from 'chai';
import {
  dischargeCharacterUiSchema,
  dischargeCharacterSchema,
} from './dischargeCharacter';

describe('dischargeCharacter page', () => {
  describe('uiSchema', () => {
    it('has eligibility.dischargeCharacter field', () => {
      expect(
        dischargeCharacterUiSchema.eligibility.dischargeCharacter,
      ).to.be.an('object');
    });

    it('has a title', () => {
      const field =
        dischargeCharacterUiSchema.eligibility.dischargeCharacter;
      expect(field['ui:title']).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('requires dischargeCharacter', () => {
      const required =
        dischargeCharacterSchema.properties.eligibility.required;
      expect(required).to.include('dischargeCharacter');
    });

    it('has honorable, dishonorable, unknown enum values', () => {
      const enumValues =
        dischargeCharacterSchema.properties.eligibility.properties
          .dischargeCharacter.enum;
      expect(enumValues).to.include('honorable');
      expect(enumValues).to.include('dishonorable');
      expect(enumValues).to.include('unknown');
    });
  });
});