import { expect } from 'chai';
import { fixedAssetsUiSchema, fixedAssetsSchema } from './fixedAssets';

describe('fixedAssets page', () => {
  it('exports uiSchema and schema', () => {
    expect(fixedAssetsUiSchema).to.be.an('object');
    expect(fixedAssetsSchema).to.be.an('object');
  });

  it('schema has all expected properties', () => {
    const { properties } = fixedAssetsSchema;
    expect(properties).to.have.key('fixedAssetsVeteranPrimaryResidence');
    expect(properties).to.have.key('fixedAssetsSpousePrimaryResidence');
    expect(properties).to.have.key('fixedAssetsVeteranOtherResidences');
    expect(properties).to.have.key('fixedAssetsSpouseOtherResidences');
    expect(properties).to.have.key('fixedAssetsVeteranVehicles');
    expect(properties).to.have.key('fixedAssetsSpouseVehicles');
  });

  it('spouse primary residence hides when marital status is single', () => {
    const hideIf =
      fixedAssetsUiSchema.fixedAssetsSpousePrimaryResidence['ui:options']
        .hideIf;
    expect(hideIf).to.be.a('function');
    expect(hideIf({ maritalStatus: 'single_no_dependent' })).to.be.true;
    expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.false;
  });

  it('spouse vehicles hides when marital status is divorced this year', () => {
    const hideIf =
      fixedAssetsUiSchema.fixedAssetsSpouseVehicles['ui:options'].hideIf;
    expect(hideIf({ maritalStatus: 'divorced_separated_widowed_this_year' }))
      .to.be.true;
  });

  it('veteran primary residence does not have hideIf', () => {
    const options =
      fixedAssetsUiSchema.fixedAssetsVeteranPrimaryResidence['ui:options'];
    expect(options?.hideIf).to.be.undefined;
  });
});