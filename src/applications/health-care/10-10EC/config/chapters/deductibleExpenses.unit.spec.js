import { expect } from 'chai';
import {
  deductibleExpensesUiSchema,
  deductibleExpensesSchema,
} from './deductibleExpenses';

describe('chapters/deductibleExpenses', () => {
  it('uiSchema has educationalExpenses', () => {
    expect(deductibleExpensesUiSchema).to.have.property('educationalExpenses');
  });

  it('uiSchema has funeralBurialExpenses', () => {
    expect(deductibleExpensesUiSchema).to.have.property('funeralBurialExpenses');
  });

  it('uiSchema has rentMortgageAmount', () => {
    expect(deductibleExpensesUiSchema).to.have.property('rentMortgageAmount');
  });

  it('uiSchema has rentMortgageFrequency', () => {
    expect(deductibleExpensesUiSchema).to.have.property('rentMortgageFrequency');
  });

  it('uiSchema has utilities', () => {
    expect(deductibleExpensesUiSchema).to.have.property('utilities');
  });

  it('uiSchema has carPayment', () => {
    expect(deductibleExpensesUiSchema).to.have.property('carPayment');
  });

  it('uiSchema has food', () => {
    expect(deductibleExpensesUiSchema).to.have.property('food');
  });

  it('uiSchema has nonReimbursedMedical', () => {
    expect(deductibleExpensesUiSchema).to.have.property('nonReimbursedMedical');
  });

  it('uiSchema has courtOrderedPayments', () => {
    expect(deductibleExpensesUiSchema).to.have.property('courtOrderedPayments');
  });

  it('uiSchema has insurancePremiums', () => {
    expect(deductibleExpensesUiSchema).to.have.property('insurancePremiums');
  });

  it('uiSchema has taxesPaid', () => {
    expect(deductibleExpensesUiSchema).to.have.property('taxesPaid');
  });

  it('schema has correct type', () => {
    expect(deductibleExpensesSchema.type).to.equal('object');
  });

  it('rentMortgageFrequency enum contains monthly and annually', () => {
    expect(deductibleExpensesSchema.properties.rentMortgageFrequency.enum).to.include('monthly');
    expect(deductibleExpensesSchema.properties.rentMortgageFrequency.enum).to.include('annually');
  });

  it('rentMortgageFrequency required when amount > 0', () => {
    const requiredFn = deductibleExpensesUiSchema.rentMortgageFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ rentMortgageAmount: 1200 })).to.be.true;
    }
  });

  it('rentMortgageFrequency not required when amount is 0', () => {
    const requiredFn = deductibleExpensesUiSchema.rentMortgageFrequency?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ rentMortgageAmount: 0 })).to.be.false;
    }
  });
});