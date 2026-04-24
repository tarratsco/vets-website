import { expect } from 'chai';

import {
  correctionDetailsUiSchema,
  correctionDetailsSchema,
} from './correctionDetails';
import { CORRECTION_ITEM_KEYS } from '../../constants';

describe('correctionDetails page', () => {
  it('uiSchema has correctionItems checkboxGroup', () => {
    expect(
      correctionDetailsUiSchema.correctionDetails.correctionItems,
    ).to.be.an('object');
  });

  it('uiSchema correctionItems has required flag at top level', () => {
    const field = correctionDetailsUiSchema.correctionDetails.correctionItems;
    expect(field['ui:required']).to.not.be.undefined;
  });

  it('uiSchema has correctedCreditHours field', () => {
    expect(
      correctionDetailsUiSchema.correctionDetails.correctedCreditHours,
    ).to.be.an('object');
  });

  it('uiSchema has correctionOtherDescription textarea', () => {
    expect(
      correctionDetailsUiSchema.correctionDetails.correctionOtherDescription,
    ).to.be.an('object');
  });

  it('schema requires correctionItems', () => {
    expect(
      correctionDetailsSchema.properties.correctionDetails.required,
    ).to.include('correctionItems');
  });

  it('schema correctionItems is an array type', () => {
    expect(
      correctionDetailsSchema.properties.correctionDetails.properties
        .correctionItems.type,
    ).to.equal('array');
  });

  it('schema correctionOtherDescription has maxLength of 1000', () => {
    expect(
      correctionDetailsSchema.properties.correctionDetails.properties
        .correctionOtherDescription.maxLength,
    ).to.equal(1000);
  });

  describe('validateCorrectionItems via ui:validations', () => {
    const validations =
      correctionDetailsUiSchema.correctionDetails.correctionItems[
        'ui:validations'
      ];

    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('has at least one validation', () => {
      expect(validations).to.be.an('array').with.length.greaterThan(0);
    });

    it('adds error when no items selected', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, []);
      expect(messages).to.have.lengthOf(1);
    });

    it('adds error when value is null', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, null);
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when at least one item is selected', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, ['credit_hours']);
      expect(messages).to.have.lengthOf(0);
    });
  });

  describe('validateOtherDescription via ui:validations', () => {
    const validations =
      correctionDetailsUiSchema.correctionDetails.correctionOtherDescription[
        'ui:validations'
      ];

    let messages;

    beforeEach(() => {
      messages = [];
    });

    it('has validations array', () => {
      expect(validations).to.be.an('array').with.length.greaterThan(0);
    });

    it('adds error when other is selected and description is too short', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, 'short', {
        correctionDetails: { correctionItems: ['other'] },
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when other is not selected', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](errors, '', {
        correctionDetails: { correctionItems: ['credit_hours'] },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('does not add error when other is selected and description is sufficient', () => {
      const errors = { addError: msg => messages.push(msg || '') };
      validations[0](
        errors,
        'This is a sufficient description of the other correction.',
        { correctionDetails: { correctionItems: ['other'] } },
      );
      expect(messages).to.have.lengthOf(0);
    });
  });
});