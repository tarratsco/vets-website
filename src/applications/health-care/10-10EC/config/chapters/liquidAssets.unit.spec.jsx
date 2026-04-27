import { expect } from 'chai';
import { liquidAssetsUiSchema, liquidAssetsSchema } from './liquidAssets';

describe('liquidAssets page', () => {
  it('exports uiSchema and schema', () => {
    expect(liquidAssetsUiSchema).to.be.an('object');
    expect(liquidAssetsSchema).to.be.an('object');
  });

  it('schema has all expected properties', () => {
    const { properties } = liquidAssetsSchema;
    expect(properties).to.have.key('liquidAssetsVeteranCashAndInvestments');
    expect(properties).to.have.key('liquidAssetsSpouseCashAndInvestments');
    expect(properties).to.have.key('liquidAssetsVeteranOtherLiquidAssets');
    expect(properties).to.have.key('liquidAssetsSpouseOtherLiquidAssets');
    expect(properties).to.have.key('liquidAssetsVeteranHouseholdEffects');
    expect(properties).to.have.key('liquidAssetsSpouseHouseholdEffects');
  });

  it('spouse cash hides when single_no_dependent', () => {
    const hideIf =
      liquidAssetsUiSchema.liquidAssetsSpouseCashAndInvestments['ui:options']
        .hideIf;
    expect(hideIf).to.be.a('function');
    expect(hideIf({ maritalStatus: 'single_no_dependent' })).to.be.true;
    expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.false;
  });

  it('household effects shows only for single_no_dependent', () => {
    const hideIf =
      liquidAssetsUiSchema.liquidAssetsVeteranHouseholdEffects['ui:options']
        .hideIf;
    expect(hideIf({ maritalStatus: 'single_no_dependent' })).to.be.false;
    expect(hideIf({ maritalStatus: 'single_with_dependent' })).to.be.true;
    expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.true;
  });

  it('household effects shows for married_separate_institutionalized', () => {
    const hideIf =
      liquidAssetsUiSchema.liquidAssetsVeteranHouseholdEffects['ui:options']
        .hideIf;
    expect(hideIf({ maritalStatus: 'married_separate_institutionalized' })).to
      .be.false;
  });
});