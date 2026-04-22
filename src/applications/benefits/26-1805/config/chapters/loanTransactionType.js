/**
 * Chapter 4 — Loan Transaction Type (Screen 5)
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

export const loanTransactionTypeUiSchema = {
  loanTransactionType: {
    'ui:title': 'Loan transaction type',
    transactionType: radioUI({
      title:
        'What is the VA loan transaction type for this appraisal request?',
      labels: {
        purchase: 'Purchase of a home',
        cash_out_refi: 'Cash-out refinance',
        irrrl:
          'Interest Rate Reduction Refinance Loan (IRRRL) — appraisal confirmed required',
        new_construction: 'New construction',
      },
      errorMessages: {
        required: 'Please select the transaction type.',
      },
    }),
    estimatedValue: {
      'ui:title': 'Estimated purchase price or property value',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        inputType: 'number',
        hint:
          'Enter the estimated purchase price or current estimated value of the property in US dollars.',
      },
      'ui:errorMessages': {
        required: 'Enter the estimated property value.',
        pattern: 'Enter a valid dollar amount.',
      },
    },
    loanFeatures: {
      'ui:title': 'Loan features (select all that apply)',
      energyEfficientMortgage: {
        'ui:title':
          'Energy Efficient Mortgage (EEM) — loan includes an EEM component',
      },
      jointLoan: {
        'ui:title':
          'Joint VA loan — this loan involves a non-Veteran co-borrower',
      },
      nativeAmericanDirectLoan: {
        'ui:title': 'Native American Direct Loan (NADL)',
      },
    },
  },
};

export const loanTransactionTypeSchema = {
  type: 'object',
  properties: {
    loanTransactionType: {
      type: 'object',
      required: ['transactionType', 'estimatedValue'],
      properties: {
        transactionType: radioSchema([
          'purchase',
          'cash_out_refi',
          'irrrl',
          'new_construction',
        ]),
        estimatedValue: {
          type: 'number',
          minimum: 1,
          maximum: 99999999,
        },
        loanFeatures: {
          type: 'object',
          properties: {
            energyEfficientMortgage: { type: 'boolean' },
            jointLoan: { type: 'boolean' },
            nativeAmericanDirectLoan: { type: 'boolean' },
          },
        },
      },
    },
  },
};