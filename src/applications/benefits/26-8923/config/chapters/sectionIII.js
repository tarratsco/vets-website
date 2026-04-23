/**
 * Section III — Final Computation (Lines 10–18)
 * Screen 5 of VA Form 26-8923
 * All values are read-only computed. Uses CustomPage (SectionIIIPage).
 */

export const sectionIIIUiSchema = {
  sectionIII: {
    'ui:title': 'Section III \u2014 Final computation',
  },
};

export const sectionIIISchema = {
  type: 'object',
  properties: {
    sectionIII: {
      type: 'object',
      properties: {
        line10CarryForward: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line11DiscountOnLine10: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line12Subtotal: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line13SubtractLine5: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line14Subtotal: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line15SubtractLine7: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line16Subtotal: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line17FinalFundingFee: { type: 'number', minimum: 0, maximum: 9999999.99 },
        line18MaxLoanAmount: { type: 'number', minimum: 0, maximum: 9999999.99 },
      },
    },
  },
};