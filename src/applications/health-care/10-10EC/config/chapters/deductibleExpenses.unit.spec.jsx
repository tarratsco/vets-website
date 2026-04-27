import { expect } from 'chai';
import {
  deductibleExpensesUiSchema,
  deductibleExpensesSchema,
} from './deductibleExpenses';

describe('deductibleExpenses page', () => {
  it('exports uiSchema and schema', () => {
    expect(deductibleExpensesUiSchema).to.be.an('object');
    expect(deductibleExpensesSchema).to.be.an('object');
  });

  it('schema has all 10 deductible expense categories plus rent frequency', () => {
    const { properties } = deductibleExpensesSchema;
    expect(properties).to.have.key('educationalExpenses');
    expect(properties).to.have.key(
      'funeralBurialExpenses',
    );
    expect(properties).to.have.key('rentMortgageAmount');
    expect(properties).to.have.key('rentMortgageFrequency');
    expect(properties).to.have.key('utilities');
    expect(properties).to.have.key('carPayment');
    expect(properties).to.have.key('food');
    expect(properties).to.have.key('nonReimbursedMedical');
    expect(properties).to.have.key('courtOrderedPayments');
    expect(properties).to.have.key('insurancePremiums');
    expect(properties).to.have.key('taxesPaid');
  });

  it('rentMortgageFrequency is required when rent amount > 0', () => {
    const required =
      deductibleExpensesUiSchema.rentMortgageFrequency['ui:required'];
    expect(required).to.be.a('function');
    expect(required({ rentMortgageAmount: '1500' })).to.be.true;
    expect(required({ rentMortgageAmount: '0' })).to.be.false;
    expect(required({ rentMortgageAmount: '' })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('rentMortgageFrequency schema includes monthly and annually', () => {
    const { enum: values } =
      deductibleExpensesSchema.properties.rentMortgageFrequency;
    expect(values).to.include('monthly');
    expect(values).to.include('annually');
  });

  it('all expense amounts are not required', () => {
    const expenseFields = [
      'educationalExpenses',
      'funeralBurialExpenses',
      'rentMortgageAmount',
      'utilities',
      'carPayment',
      'food',
      'nonReimbursedMedical',
      'courtOrderedPayments',
      'insurancePremiums',
      'taxesPaid',
    ];
    expenseFields.forEach(field => {
      const required = deductibleExpensesUiSchema[field]['ui:required'];
      expect(required).to.be.a('function');
      expect(required({})).to.be.false;
    });
  });
});