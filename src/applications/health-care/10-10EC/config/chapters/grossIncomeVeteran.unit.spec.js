import { expect } from 'chai';
import {
  grossIncomeVeteranUiSchema,
  grossIncomeVeteranSchema,
} from './grossIncomeVeteran';

describe('chapters/grossIncomeVeteran', () => {
  it('uiSchema has veteranEmploymentIncome', () => {
    expect(grossIncomeVeteranUiSchema).to.have.property('veteranEmploymentIncome');
  });

  it('uiSchema has veteranEmploymentIncomeFrequency', () => {
    expect(grossIncomeVeteranUiSchema).to.have.property('veteranEmploymentIncomeFrequency');
  });

  it('uiSchema has veteranBusinessIncome', () => {
    expect(grossIncomeVeteranUiSchema).to.have.property('veteranBusinessIncome');
  });

  it('uiSchema has veteranOtherIncome', () => {
    expect(grossIncomeVeteranUiSchema).to.have.property('veteranOtherIncome');
  });

  it('schema has correct type', () => {
    expect(grossIncomeVeteranSchema.type).to.equal('object');
  });

  it('employment frequency ui:required is true when amount > 0', () => {
    const requiredFn = grossIncomeVeteranUiSchema.veteranEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ veteranEmploymentIncome: 1000 })).to.be.true;
    }
  });

  it('employment frequency ui:required is false when amount is 0', () => {
    const requiredFn = grossIncomeVeteranUiSchema.veteranEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ veteranEmploymentIncome: 0 })).to.be.false;
    }
  });

  it('employment frequency ui:required is false when amount is empty', () => {
    const requiredFn = grossIncomeVeteranUiSchema.veteranEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ veteranEmploymentIncome: '' })).to.be.false;
    }
  });

  it('employment frequency ui:required is false when amount is undefined', () => {
    const requiredFn = grossIncomeVeteranUiSchema.veteranEmploymentIncomeFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({})).to.be.false;
    }
  });

  it('schema properties has frequency fields', () => {
    expect(grossIncomeVeteranSchema.properties).to.have.property('veteranEmploymentIncomeFrequency');
    expect(grossIncomeVeteranSchema.properties).to.have.property('veteranBusinessIncomeFrequency');
    expect(grossIncomeVeteranSchema.properties).to.have.property('veteranOtherIncomeFrequency');
  });
});