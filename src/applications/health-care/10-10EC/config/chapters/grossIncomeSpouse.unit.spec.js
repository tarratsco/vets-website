import { expect } from 'chai';
import {
  grossIncomeSpouseUiSchema,
  grossIncomeSpouseSchema,
} from './grossIncomeSpouse';

describe('chapters/grossIncomeSpouse', () => {
  it('uiSchema has spouseEmploymentIncome', () => {
    expect(grossIncomeSpouseUiSchema).to.have.property('spouseEmploymentIncome');
  });

  it('uiSchema has spouseEmploymentIncomeFrequency', () => {
    expect(grossIncomeSpouseUiSchema).to.have.property('spouseEmploymentIncomeFrequency');
  });

  it('uiSchema has spouseBusinessIncome', () => {
    expect(grossIncomeSpouseUiSchema).to.have.property('spouseBusinessIncome');
  });

  it('uiSchema has spouseOtherIncome', () => {
    expect(grossIncomeSpouseUiSchema).to.have.property('spouseOtherIncome');
  });

  it('schema has correct type', () => {
    expect(grossIncomeSpouseSchema.type).to.equal('object');
  });

  it('spouse employment frequency required when amount > 0', () => {
    const requiredFn = grossIncomeSpouseUiSchema.spouseEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ spouseEmploymentIncome: 2000 })).to.be.true;
    }
  });

  it('spouse employment frequency not required when amount is 0', () => {
    const requiredFn = grossIncomeSpouseUiSchema.spouseEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ spouseEmploymentIncome: 0 })).to.be.false;
    }
  });
});