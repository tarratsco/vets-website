import { expect } from 'chai';
import { careTypeUiSchema, careTypeSchema } from './careType';

describe('chapters/careType', () => {
  it('uiSchema has careType', () => {
    expect(careTypeUiSchema).to.have.property('careType');
  });

  it('schema requires careType', () => {
    expect(careTypeSchema.required).to.include('careType');
  });

  it('schema enum has institutional and non_institutional', () => {
    expect(careTypeSchema.properties.careType.enum).to.include('institutional');
    expect(careTypeSchema.properties.careType.enum).to.include('non_institutional');
  });

  it('ui:required returns true', () => {
    const requiredFn = careTypeUiSchema.careType['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({})).to.be.true;
    }
  });
});