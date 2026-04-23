import { textUI } from 'platform/forms-system/src/js/web-component-patterns';

const STATE_ENUM = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
  'WA', 'WV', 'WI', 'WY',
];

/**
 * Returns a reusable address uiSchema block for a given person label.
 * @param {string} personLabel - e.g. "Witness 1", "Health Care Agent's"
 */
export function addressUiSchema(personLabel) {
  return {
    'ui:title': `${personLabel} address`,
    street: textUI({
      title: 'Street address',
      errorMessages: {
        required: 'Please enter a street address',
      },
    }),
    city: textUI({
      title: 'City',
      errorMessages: {
        required: 'Please enter a city',
      },
    }),
    state: {
      'ui:title': 'State',
      'ui:webComponentField': 'VaSelectField',
      'ui:errorMessages': {
        required: 'Please select a state',
      },
    },
    zipCode: textUI({
      title: 'ZIP code',
      hint: '5-digit ZIP code',
      errorMessages: {
        required: 'Please enter a valid 5-digit ZIP code',
        pattern: 'Please enter a valid 5-digit ZIP code',
      },
    }),
  };
}

export const addressSchema = {
  type: 'object',
  required: ['street', 'city', 'state', 'zipCode'],
  properties: {
    street: { type: 'string', minLength: 1, maxLength: 100 },
    city: { type: 'string', minLength: 1, maxLength: 50 },
    state: { type: 'string', enum: STATE_ENUM },
    zipCode: {
      type: 'string',
      pattern: '^\\d{5}(-\\d{4})?$',
    },
  },
};