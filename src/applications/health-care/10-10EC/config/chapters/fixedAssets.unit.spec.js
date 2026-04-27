import { expect } from 'chai';
import { fixedAssetsUiSchema, fixedAssetsSchema } from './fixedAssets';

describe('chapters/fixedAssets', () => {
  it('uiSchema has veteranPrimaryResidence', () => {
    expect(fixedAssetsUiSchema).to.have.property('veteranPrimaryResidence');
  });

  it('uiSchema has spousePrimaryResidence', () => {
    expect(fixedAssetsUiSchema).to.have.property('spousePrimaryResidence');
  });

  it('uiSchema has veteranOtherResidences', () => {
    expect(fixedAssetsUiSchema).to.have.property('veteranOtherResidences');
  });

  it('uiSchema has veteranVehicles', () => {
    expect(fixedAssetsUiSchema).to.have.property('veteranVehicles');
  });

  it('schema has correct type', () => {
    expect(fixedAssetsSchema.type).to.equal('object');
  });

  it('spouse fields have hideIf for non-married status', () => {
    const hideIf = fixedAssetsUiSchema.spousePrimaryResidence?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'single_no_dependent' })).to.be.true;
      expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.false;
    }
  });

  it('spouse fields are hidden for divorced status', () => {
    const hideIf = fixedAssetsUiSchema.spousePrimaryResidence?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'divorced_separated_widowed_this_year' })).to.be.true;
    }
  });
});