import { expect } from 'chai';

import { typeOfChangeUiSchema, typeOfChangeSchema } from './typeOfChange';
import { CHANGE_TYPE_KEYS } from '../../constants';

describe('typeOfChange page', () => {
  it('uiSchema has typeOfChange field', () => {
    expect(typeOfChangeUiSchema.typeOfChange).to.be.an('object');
  });

  it('uiSchema typeOfChange has correct title', () => {
    expect(typeOfChangeUiSchema.typeOfChange['ui:title']).to.equal(
      'What type of enrollment change are you reporting?',
    );
  });

  it('schema has typeOfChange as required', () => {
    expect(typeOfChangeSchema.required).to.include('typeOfChange');
  });

  it('schema typeOfChange enum matches CHANGE_TYPE_KEYS', () => {
    expect(typeOfChangeSchema.properties.typeOfChange.enum).to.deep.equal(
      CHANGE_TYPE_KEYS,
    );
  });

  it('schema typeOfChange has 4 enum values', () => {
    expect(typeOfChangeSchema.properties.typeOfChange.enum).to.have.lengthOf(4);
  });
});