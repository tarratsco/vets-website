import { expect } from 'chai';

import {
  reasonForChangeUiSchema,
  reasonForChangeSchema,
  REASON_FOR_CHANGE_KEYS,
  MITIGATING_REASON_CODES,
} from '../chapters/reasonForChange';

describe('reasonForChange page', () => {
  describe('uiSchema', () => {
    it('has reasonForChange field', () => {
      expect(reasonForChangeUiSchema.reasonForChange).to.exist;
    });

    it('reasonForChange has correct title', () => {
      expect(reasonForChangeUiSchema.reasonForChange['ui:title']).to.equal(
        'Primary reason for this enrollment change',
      );
    });

    it('has required error message', () => {
      expect(
        reasonForChangeUiSchema.reasonForChange['ui:errorMessages'].required,
      ).to.be.a('string');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(reasonForChangeSchema.type).to.equal('object');
    });

    it('requires reasonForChange', () => {
      expect(reasonForChangeSchema.required).to.include('reasonForChange');
    });

    it('REASON_FOR_CHANGE_KEYS has 11 values', () => {
      expect(REASON_FOR_CHANGE_KEYS).to.have.lengthOf(11);
    });

    it('includes voluntary_withdrawal in mitigating codes', () => {
      expect(MITIGATING_REASON_CODES).to.include('voluntary_withdrawal');
    });

    it('includes medical in mitigating codes', () => {
      expect(MITIGATING_REASON_CODES).to.include('medical');
    });

    it('does not include military_deployment in mitigating codes', () => {
      expect(MITIGATING_REASON_CODES).to.not.include('military_deployment');
    });
  });
});