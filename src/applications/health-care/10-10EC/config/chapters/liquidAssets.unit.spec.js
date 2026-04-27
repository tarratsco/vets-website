import { expect } from 'chai';
import { liquidAssetsUiSchema, liquidAssetsSchema } from './liquidAssets';

describe('chapters/liquidAssets', () => {
  it('uiSchema has veteranCashAndInvestments', () => {
    expect(liquidAssetsUiSchema).to.have.property('veteranCashAndInvestments');
  });

  it('uiSchema has veteranOtherLiquidAssets', () => {
    expect(liquidAssetsUiSchema).to.have.property('veteranOtherLiquidAssets');
  });

  it('uiSchema has veteranHouseholdEffects', () => {
    expect(liquidAssetsUiSchema).to.have.property('veteranHouseholdEffects');
  });

  it('schema has correct type', () => {
    expect(liquidAssetsSchema.type).to.equal('object');
  });

  it('householdEffects shows for single_no_dependent', () => {
    const hideIf = liquidAssetsUiSchema.veteranHouseholdEffects?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'single_no_dependent' })).to.be.false;
    }
  });

  it('householdEffects hidden for single_with_dependent', () => {
    const hideIf = liquidAssetsUiSchema.veteranHouseholdEffects?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'single_with_dependent' })).to.be.true;
    }
  });

  it('householdEffects shows for married_separate_institutionalized', () => {
    const hideIf = liquidAssetsUiSchema.veteranHouseholdEffects?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'married_separate_institutionalized' })).to.be.false;
    }
  });

  it('householdEffects hidden for married_living_with', () => {
    const hideIf = liquidAssetsUiSchema.veteranHouseholdEffects?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.true;
    }
  });
});