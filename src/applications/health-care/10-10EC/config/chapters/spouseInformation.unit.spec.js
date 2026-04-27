import { expect } from 'chai';
import {
  spouseInformationUiSchema,
  spouseInformationSchema,
} from './spouseInformation';

describe('chapters/spouseInformation', () => {
  it('uiSchema has spouseFullName', () => {
    expect(spouseInformationUiSchema).to.have.property('spouseFullName');
  });

  it('uiSchema has spouseSocialSecurityNumber', () => {
    expect(spouseInformationUiSchema).to.have.property('spouseSocialSecurityNumber');
  });

  it('uiSchema has spouseDateOfBirth', () => {
    expect(spouseInformationUiSchema).to.have.property('spouseDateOfBirth');
  });

  it('uiSchema has dateOfMarriage', () => {
    expect(spouseInformationUiSchema).to.have.property('dateOfMarriage');
  });

  it('uiSchema has dateOfLegalSeparationOrDivorce', () => {
    expect(spouseInformationUiSchema).to.have.property('dateOfLegalSeparationOrDivorce');
  });

  it('uiSchema has dateOfSpouseDeath', () => {
    expect(spouseInformationUiSchema).to.have.property('dateOfSpouseDeath');
  });

  it('schema has correct type', () => {
    expect(spouseInformationSchema.type).to.equal('object');
  });

  it('dateOfLegalSeparationOrDivorce hideIf hides for married status', () => {
    const hideIf = spouseInformationUiSchema.dateOfLegalSeparationOrDivorce?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'married_living_with' })).to.be.true;
    }
  });

  it('dateOfLegalSeparationOrDivorce hideIf shows for divorced status', () => {
    const hideIf = spouseInformationUiSchema.dateOfLegalSeparationOrDivorce?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ maritalStatus: 'divorced_separated_widowed_this_year' })).to.be.false;
    }
  });
});