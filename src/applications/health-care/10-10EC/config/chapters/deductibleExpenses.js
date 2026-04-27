import {
  currencyUI,
  currencySchema,
  radioUI,
  radioSchema,
  titleUI,
  titleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const rentFrequencyRequired = formData =>
  formData.rentMortgageAmount !== undefined &&
  formData.rentMortgageAmount !== null &&
  formData.rentMortgageAmount !== '' &&
  parseFloat(formData.rentMortgageAmount) > 0;

export const deductibleExpensesUiSchema = {
  'view:deductibleExpensesTitle': titleUI('Deductible expenses (Section VIII)'),
  educationalExpenses: currencyUI({
    title: 'Educational expenses',
    hint:
      'Include tuition, books, fees, and materials for you, your spouse, or dependents. Enter the monthly average over the past 12 months.',
  }),
  funeralBurialExpenses: currencyUI({
    title: 'Funeral and burial expenses',
    hint:
      'Include expenses for a spouse or child, including prepaid funeral or burial arrangements. Enter the monthly average.',
  }),
  rentMortgageAmount: currencyUI({
    title: 'Rent or mortgage payment \u2014 primary residence',
    hint: 'Enter the rent or mortgage payment for your primary residence only.',
  }),
  rentMortgageFrequency: radioUI({
    title: 'How often do you make this payment?',
    required: rentFrequencyRequired,
    labels: {
      monthly: 'Monthly',
      annually: 'Annually',
    },
    errorMessages: {
      required: 'Please select how often you make this payment',
    },
    hideIf: formData => !rentFrequencyRequired(formData),
  }),
  utilities: currencyUI({
    title: 'Utilities \u2014 primary residence',
    hint:
      'Include electricity, gas, water, phone, and internet costs paid over the past year. Enter the monthly average.',
  }),
  carPayment: currencyUI({
    title: 'Car payment',
    hint: 'Enter the monthly payment for one vehicle only.',
  }),
  food: currencyUI({
    title: 'Food expenses',
    hint:
      'Enter the monthly average spent on food for you, your spouse, and dependents.',
  }),
  nonReimbursedMedical: currencyUI({
    title: 'Non-reimbursed medical expenses',
    hint:
      'Enter the monthly average. Include copayments for physicians and dentists, medications, Medicare premiums, health insurance premiums, hospital expenses, and nursing home expenses.',
  }),
  courtOrderedPayments: currencyUI({
    title: 'Court-ordered payments',
    hint: 'Include alimony and child support. Enter the monthly average.',
  }),
  insurancePremiums: currencyUI({
    title: 'Insurance premiums',
    hint:
      'Include automobile and homeowners insurance premiums. Do not include life insurance premiums.',
  }),
  taxesPaid: currencyUI({
    title: 'Taxes paid over the past 12 months',
    hint:
      'Include personal property taxes, home taxes, automobile taxes, and income taxes paid over the past 12 months.',
  }),
};

export const deductibleExpensesSchema = {
  type: 'object',
  properties: {
    'view:deductibleExpensesTitle': titleSchema,
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