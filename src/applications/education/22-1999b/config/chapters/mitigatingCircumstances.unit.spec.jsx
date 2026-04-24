import { expect } from 'chai';

import {
  mitigatingCircumstancesUiSchema,
  mitigatingCircumstancesSchema,
  MITIGATING_KNOWN_KEYS,
} from '../chapters/mitigatingCircumstances';

describe('mitigatingCircumstances page', () => {
  describe('uiSchema', () => {
    it('has mitigatingCircumstancesKnown field', () => {
      expect(
        mitigatingCircumstancesUiSchema.mitigatingCircumstancesKnown,
      ).to.exist;
    });

    it('mitigatingCircumstancesKnown has correct title', () => {
      expect(
        mitigatingCircumstancesUiSchema.mitigatingCircumstancesKnown['ui:title'],
      ).to.be.a('string');
    });

    it('has mitigatingCircumstancesNarrative textarea field', () => {
      expect(
        mitigatingCircumstancesUiSchema.mitigatingCircumstancesNarrative,
      ).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(mitigatingCircumstancesSchema.type).to.equal('object');
    });

    it('requires mitigatingCircumstancesKnown', () => {
      expect(mitigatingCircumstancesSchema.required).to.include(
        'mitigatingCircumstancesKnown',
      );
    });

    it('mitigatingCircumstancesKnown has yes/no/unknown enum', () => {
      expect(
        mitigatingCircumstancesSchema.properties.mitigatingCircumstancesKnown
          .enum,
      ).to.deep.equal(['yes', 'no', 'unknown']);
    });

    it('narrative has maxLength of 2000', () => {
      expect(
        mitigatingCircumstancesSchema.properties
          .mitigatingCircumstancesNarrative.maxLength,
      ).to.equal(2000);
    });

    it('narrative has minLength of 20', () => {
      expect(
        mitigatingCircumstancesSchema.properties
          .mitigatingCircumstancesNarrative.minLength,
      ).to.equal(20);
    });

    it('MITIGATING_KNOWN_KEYS has 3 values', () => {
      expect(MITIGATING_KNOWN_KEYS).to.have.lengthOf(3);
    });
  });
});