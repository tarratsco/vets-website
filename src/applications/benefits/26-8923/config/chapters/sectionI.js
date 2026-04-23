/**
 * Section I — Initial Computation (Lines 1–3)
 * Screen 3 of VA Form 26-8923
 * This page uses a CustomPage component (SectionIPage) for real-time computation.
 * The uiSchema and schema here serve as metadata for the review page fallback.
 */

export const sectionIUiSchema = {
  sectionI: {
    'ui:title': 'Section I \u2014 Initial computation',
    line1ExistingLoanBalance: {
      'ui:title':
        'Line 1: Existing VA loan balance (plus cost of energy efficient improvements)',
      'ui:options': {
        hint:
          'Enter the outstanding balance of the existing VA-guaranteed loan being refinanced, from the servicer payoff statement. If energy efficient improvements are being financed into the new loan, add those costs to this amount.',
      },
      'ui:errorMessages': {
        required:
          'Line 1 is required. Enter the existing VA loan balance in dollars and cents.',
        minimum: 'Enter a dollar amount greater than zero.',
        maximum: 'Enter an amount no greater than $9,999,999.99.',
      },
    },
    line2CashPaymentFromVeteran: {
      'ui:title': 'Line 2: Cash payment from Veteran (amount to subtract)',
      'ui:options': {
        hint:
          'If the Veteran is making a cash payment toward the loan, enter that amount here. Enter 0 if no cash payment is being made.',
      },
      'ui:errorMessages': {
        required:
          'Enter a dollar amount for Line 2. Enter 0 if no cash payment is being made.',
      },
    },
  },
};

export const sectionISchema = {
  type: 'object',
  properties: {
    sectionI: {
      type: 'object',
      required: ['line1ExistingLoanBalance', 'line2CashPaymentFromVeteran'],
      properties: {
        line1ExistingLoanBalance: {
          type: 'number',
          minimum: 0.01,
          maximum: 9999999.99,
        },
        line2CashPaymentFromVeteran: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line3Total: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
      },
    },
  },
};