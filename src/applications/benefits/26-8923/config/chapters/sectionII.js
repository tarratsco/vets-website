/**
 * Section II — Preliminary Loan Amount (Lines 4–9)
 * Screen 4 of VA Form 26-8923
 * Uses CustomPage (SectionIIPage) for real-time computation.
 */

export const sectionIIUiSchema = {
  sectionII: {
    'ui:title': 'Section II \u2014 Preliminary loan amount',
    line5DiscountPercent: {
      'ui:title': 'Line 5: Discount points \u2014 percentage',
      'ui:options': {
        hint:
          'Enter the discount points as a percentage of Line 4. For example, enter 1.5 for 1.5%. Discount points generally may not exceed 2 points without special justification per 38 CFR \u00a7 36.4313.',
      },
      'ui:errorMessages': {
        required:
          'Enter a percentage for discount points. Enter 0 if no discount points apply.',
      },
    },
    line6OriginationFeePercent: {
      'ui:title': 'Line 6: Origination fee \u2014 percentage',
      'ui:options': {
        hint:
          'Enter the origination fee as a percentage of Line 4. Per 38 CFR \u00a7 36.4313, the origination fee for an IRRRL may not exceed 1% of the loan amount.',
      },
      'ui:errorMessages': {
        required:
          'Enter a percentage for the origination fee. Enter 0 if no origination fee applies.',
        maximum:
          'The origination fee cannot exceed 1% of the loan amount per 38 CFR \u00a7 36.4313.',
      },
    },
    line7FundingFeePercent: {
      'ui:title': 'Line 7: VA funding fee \u2014 percentage',
      'ui:options': {
        hint:
          'The VA funding fee for an IRRRL is 0.5% per 38 CFR \u00a7 36.4312. This field is pre-filled with 0.5. Enter 0 only if the Veteran is exempt from the funding fee.',
      },
      'ui:errorMessages': {
        required: 'Enter a percentage for the VA funding fee.',
        maximum:
          'The VA funding fee for an IRRRL cannot exceed 0.5% per 38 CFR \u00a7 36.4312.',
      },
    },
    line8OtherClosingCosts: {
      'ui:title': 'Line 8: Other allowable closing costs and prepaids',
      'ui:options': {
        hint:
          'Enter the total of all other allowable closing costs and prepaids not captured in Lines 5\u20137. Refer to VA Lender\'s Handbook (Pamphlet 26-7), Chapter 8, for the complete list of allowable IRRRL closing costs.',
      },
      'ui:errorMessages': {
        required:
          'Enter a dollar amount for other allowable closing costs and prepaids. Enter 0 if there are none.',
      },
    },
  },
};

export const sectionIISchema = {
  type: 'object',
  properties: {
    sectionII: {
      type: 'object',
      required: [
        'line5DiscountPercent',
        'line6OriginationFeePercent',
        'line7FundingFeePercent',
        'line8OtherClosingCosts',
      ],
      properties: {
        line4CarryForward: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line5DiscountPercent: {
          type: 'number',
          minimum: 0,
          maximum: 99.999,
        },
        line5DollarAmount: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line6OriginationFeePercent: {
          type: 'number',
          minimum: 0,
          maximum: 1.0,
        },
        line6DollarAmount: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line7FundingFeePercent: {
          type: 'number',
          minimum: 0,
          maximum: 0.5,
        },
        line7DollarAmount: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line8OtherClosingCosts: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
        line9PreliminaryTotal: {
          type: 'number',
          minimum: 0,
          maximum: 9999999.99,
        },
      },
    },
  },
};