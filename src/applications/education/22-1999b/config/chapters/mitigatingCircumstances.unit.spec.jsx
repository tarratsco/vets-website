import { expect } from 'chai';

import {
  mitigatingCircumstancesUiSchema,
  mitigatingCircumstancesSchema,
} from './mitigatingCircumstances';

describe('mitigatingCircumstances page', () => {
  it('uiSchema has mitigatingCircumstancesKnown radio', () => {
    expect(
      mitigatingCircumstancesUiSchema.mitigatingCircumstancesKnown,
    ).to.be.an('object');
  });

  it('uiSchema mitigatingCircumstancesKnown has 3 label options', () => {
    const labels =
      mitigatingCircumstancesUiSchema.mitigatingCircumstancesKnown['ui:options']
        .labels;
    expect(Object.keys(labels)).to.have.lengthOf(3);
  });

  it('uiSchema has mitigatingCircumstancesNarrative textarea', () => {
    expect(
      mitigatingCircumstancesUiSchema.mitigatingCircumstancesNarrative,
    ).to.be.an('object');
  });

  it('schema requires mitigatingCircumstancesKnown', () => {
    expect(mitigatingCircumstancesSchema.required).to.include(
      'mitigatingCircumstancesKnown',
    );
  });

  it('schema mitigatingCircumstancesKnown has correct enum', () => {
    expect(
      mitigatingCircumstancesSchema.properties.mitigatingCircumstancesKnown
        .enum,
    ).to.deep.equal(['yes', 'no', 'unknown']);
  });

  it('schema narrative has maxLength of 2000', () => {
    expect(
      mitigatingCircumstancesSchema.properties.mitigatingCircumstancesNarrative
        .maxLength,
    ).to.equal(2000);
  });

  describe('narrative validation via ui:validations', () => {
    const validations =
      mitigatingCircumstancesUiSchema.mitigatingCircumstancesNarrative[
        'ui:validations'
      ];

    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('has at least one validation', () => {
      expect(validations).to.be.an('array').with.length.greaterThan(0);
    });

    it('does not add error when known is no', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, '', { mitigatingCircumstancesKnown: 'no' });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when known is yes and narrative is too short', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 'short', {
        mitigatingCircumstancesKnown: 'yes',
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when known is yes and narrative meets minimum', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](
        errors,
        'This is a sufficiently long description of the circumstances.',
        { mitigatingCircumstancesKnown: 'yes' },
      );
      expect(messages).to.have.lengthOf(0);
    });

    it('does not add error when known is unknown', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, '', { mitigatingCircumstancesKnown: 'unknown' });
      expect(messages).to.have.lengthOf(0);
    });
  });
});