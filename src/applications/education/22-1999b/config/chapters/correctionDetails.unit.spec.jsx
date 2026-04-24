import { expect } from 'chai';

import {
  correctionDetailsUiSchema,
  correctionDetailsSchema,
  CORRECTION_ITEMS_KEYS,
} from '../chapters/correctionDetails';

describe('correctionDetails page', () => {
  describe('uiSchema', () => {
    it('has correctionItems checkboxGroup field', () => {
      expect(correctionDetailsUiSchema.correctionItems).to.exist;
    });

    it('correctionItems has correct title', () => {
      expect(correctionDetailsUiSchema.correctionItems['ui:title']).to.be.a(
        'string',
      );
    });

    it('has correctedCreditHours field', () => {
      expect(correctionDetailsUiSchema.correctedCreditHours).to.exist;
    });

    it('has correctedCertBeginDate field', () => {
      expect(correctionDetailsUiSchema.correctedCertBeginDate).to.exist;
    });

    it('has correctionOtherDescription textarea', () => {
      expect(correctionDetailsUiSchema.correctionOtherDescription).to.exist;
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(correctionDetailsSchema.type).to.equal('object');
    });

    it('requires correctionItems', () => {
      expect(correctionDetailsSchema.required).to.include('correctionItems');
    });

    it('CORRECTION_ITEMS_KEYS has 7 values', () => {
      expect(CORRECTION_ITEMS_KEYS).to.have.lengthOf(7);
    });

    it('CORRECTION_ITEMS_KEYS includes credit_hours', () => {
      expect(CORRECTION_ITEMS_KEYS).to.include('credit_hours');
    });

    it('CORRECTION_ITEMS_KEYS includes other', () => {
      expect(CORRECTION_ITEMS_KEYS).to.include('other');
    });
  });
});