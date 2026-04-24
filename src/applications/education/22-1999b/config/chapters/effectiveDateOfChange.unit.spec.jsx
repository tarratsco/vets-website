import { expect } from 'chai';

import {
  effectiveDateOfChangeUiSchema,
  effectiveDateOfChangeSchema,
} from './effectiveDateOfChange';

describe('effectiveDateOfChange page', () => {
  it('uiSchema has effectiveDateOfChange field', () => {
    expect(effectiveDateOfChangeUiSchema.effectiveDateOfChange).to.be.an(
      'object',
    );
  });

  it('uiSchema has correct title', () => {
    expect(
      effectiveDateOfChangeUiSchema.effectiveDateOfChange['ui:title'],
    ).to.equal('Effective date of enrollment change');
  });

  it('uiSchema has validations array', () => {
    expect(
      effectiveDateOfChangeUiSchema.effectiveDateOfChange['ui:validations'],
    ).to.be.an('array');
  });

  it('schema requires effectiveDateOfChange', () => {
    expect(effectiveDateOfChangeSchema.required).to.include(
      'effectiveDateOfChange',
    );
  });

  it('schema effectiveDateOfChange has correct type', () => {
    expect(
      effectiveDateOfChangeSchema.properties.effectiveDateOfChange.type,
    ).to.equal('string');
  });
});