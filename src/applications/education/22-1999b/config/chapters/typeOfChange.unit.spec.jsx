import { expect } from 'chai';

import {
  typeOfChangeUiSchema,
  typeOfChangeSchema,
  TYPE_OF_CHANGE_KEYS,
} from '../chapters/typeOfChange';

describe('typeOfChange page', () => {
  describe('uiSchema', () => {
    it('has typeOfChange field', () => {
      expect(typeOfChangeUiSchema.typeOfChange).to.exist;
    });

    it('typeOfChange has correct title', () => {
      expect(typeOfChangeUiSchema.typeOfChange['ui:title']).to.equal(
        'What type of enrollment change are you reporting?',
      );
    });

    it('uses VaRadioField', () => {
      expect(typeOfChangeUiSchema.typeOfChange['ui:webComponentField']).to.exist;
    });

    it('has required error message', () => {
      expect(
        typeOfChangeUiSchema.typeOfChange['ui:errorMessages'].required,
      ).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(typeOfChangeSchema.type).to.equal('object');
    });

    it('requires typeOfChange', () => {
      expect(typeOfChangeSchema.required).to.include('typeOfChange');
    });

    it('typeOfChange enum includes all four values', () => {
      const { enum: enumVals } = typeOfChangeSchema.properties.typeOfChange;
      expect(enumVals).to.include('full_termination');
      expect(enumVals).to.include('partial_withdrawal');
      expect(enumVals).to.include('credit_hour_reduction');
      expect(enumVals).to.include('correction');
    });

    it('TYPE_OF_CHANGE_KEYS has 4 values', () => {
      expect(TYPE_OF_CHANGE_KEYS).to.have.lengthOf(4);
    });
  });
});