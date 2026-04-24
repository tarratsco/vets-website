import { expect } from 'chai';

import {
  effectiveDateOfChangeUiSchema,
  effectiveDateOfChangeSchema,
} from '../chapters/effectiveDateOfChange';

describe('effectiveDateOfChange page', () => {
  describe('uiSchema', () => {
    it('has effectiveDateOfChange field', () => {
      expect(effectiveDateOfChangeUiSchema.effectiveDateOfChange).to.exist;
    });

    it('effectiveDateOfChange has correct title', () => {
      expect(
        effectiveDateOfChangeUiSchema.effectiveDateOfChange['ui:title'],
      ).to.equal('Effective date of enrollment change');
    });

    it('has validations array', () => {
      expect(
        effectiveDateOfChangeUiSchema.effectiveDateOfChange['ui:validations'],
      ).to.be.an('array');
    });
  });

  describe('schema', () => {
    it('has type object', () => {
      expect(effectiveDateOfChangeSchema.type).to.equal('object');
    });

    it('requires effectiveDateOfChange', () => {
      expect(effectiveDateOfChangeSchema.required).to.include(
        'effectiveDateOfChange',
      );
    });

    it('effectiveDateOfChange schema is a string type', () => {
      expect(
        effectiveDateOfChangeSchema.properties.effectiveDateOfChange.type,
      ).to.equal('string');
    });
  });
});