import {
  currencyUI,
  currencySchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const rentMortgageFrequencyRequired = formData => {
  const amount = formData.rentMortgageAmount;
  return (
    amount !== null &&
    amount !== undefined &&
    amount !== '' &&
    parseFloat(amount) > 0
  );
};

export const deductibleExpensesUiSchema = {
  educationalExpenses: currencyUI({
    title: 'Educational expenses',
    hint:
      'Include tuition, books, fees, and materials for you, your spouse, or dependents. Enter the monthly average over the past 12 months.',
    required: () => false,
  }),
  funeralBurialExpenses: currencyUI({
    title: 'Funeral and burial expenses',
    hint:
      'Include expenses for a spouse or child, including prepaid funeral or burial arrangements. Enter the monthly average.',
    required: () => false,
  }),
  rentMortgageAmount: currencyUI({
    title: 'Rent or mortgage payment — primary residence',
    hint: 'Enter the rent or mortgage payment for your primary residence only.',
    required: () => false,
  }),
  rentMortgageFrequency: radioUI({
    title: 'How often do you make this payment?',
    required: rentMortgageFrequencyRequired,
    labels: {
      monthly: 'Monthly',
      annually: 'Annually',
    },
    errorMessages: {
      required: 'Please select how often you make this rent or mortgage payment',
    },
  }),
  utilities: currencyUI({
    title: 'Utilities — primary residence',
    hint:
      'Include electricity, gas, water, phone, and internet costs paid over the past year. Enter the monthly average.',
    required: () => false,
  }),
  carPayment: currencyUI({
    title: 'Car payment',
    hint: 'Enter the monthly payment for one vehicle only.',
    required: () => false,
  }),
  food: currencyUI({
    title: 'Food expenses',
    hint:
      'Enter the monthly average spent on food for you, your spouse, and dependents.',
    required: () => false,
  }),
  nonReimbursedMedical: currencyUI({
    title: 'Non-reimbursed medical expenses',
    hint:
      'Enter the monthly average. Include copayments for physicians and dentists, medications, Medicare premiums, health insurance premiums, hospital expenses, and nursing home expenses.',
    required: () => false,
  }),
  courtOrderedPayments: currencyUI({
    title: 'Court-ordered payments',
    hint: 'Include alimony and child support. Enter the monthly average.',
    required: () => false,
  }),
  insurancePremiums: currencyUI({
    title: 'Insurance premiums',
    hint:
      'Include automobile and homeowners insurance premiums. Do not include life insurance premiums.',
    required: () => false,
  }),
  taxesPaid: currencyUI({
    title: 'Taxes paid over the past 12 months',
    hint:
      'Include personal property taxes, home taxes, automobile taxes, and income taxes paid over the past 12 months.',
    required: () => false,
  }),
};

export const deductibleExpensesSchema = {
  type: 'object',
  properties: {
    educationalExpenses: currencySchema,
    funeralBurialExpenses: currencySchema,
    rentMortgageAmount: currencySchema,
    rentMortgageFrequency: radioSchema(['monthly', 'annually']),
    utilities: currencySchema,
    carPayment: currencySchema,
    food: currencySchema,
    nonReimbursedMedical: currencySchema,
    courtOrderedPayments: currencySchema,
    insurancePremiums: currencySchema,
    taxesPaid: currencySchema,
  },
};