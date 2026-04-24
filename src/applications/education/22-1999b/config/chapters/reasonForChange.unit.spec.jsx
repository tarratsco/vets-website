import { expect } from 'chai';

import {
  reasonForChangeUiSchema,
  reasonForChangeSchema,
} from './reasonForChange';
import { REASON_FOR_CHANGE_KEYS } from '../../constants';

describe('reasonForChange page', () => {
  it('uiSchema has reasonForChange field', () => {
    expect(reasonForChangeUiSchema.reasonForChange).to.be.an('object');
  });

  it('uiSchema has correct title', () => {
    expect(reasonForChangeUiSchema.reasonForChange['ui:title']).to.equal(
      'Primary reason for this enrollment change',
    );
  });

  it('schema requires reasonForChange', () => {
    expect(reasonForChangeSchema.required).to.include('reasonForChange');
  });

  it('schema reasonForChange enum matches REASON_FOR_CHANGE_KEYS', () => {
    expect(reasonForChangeSchema.properties.reasonForChange.enum).to.deep.equal(
      REASON_FOR_CHANGE_KEYS,
    );
  });

  it('schema has 11 reason options', () => {
    expect(
      reasonForChangeSchema.properties.reasonForChange.enum,
    ).to.have.lengthOf(11);
  });
});