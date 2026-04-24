import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const STATE_OPTIONS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
];

const STATE_LABELS = STATE_OPTIONS.reduce((acc, s) => {
  acc[s] = s;
  return acc;
}, {});

export const applicantAddressUiSchema = {
  applicantInformation: {
    'ui:title': 'Present mailing address',
    presentAddressStreet1: textUI({
      title: 'Street address',
      autocomplete: 'street-address',
      errorMessages: {
        required: 'Enter your street address.',
      },
    }),
    presentAddressStreet2: textUI({
      title: 'Street address line 2 (optional)',
    }),
    presentAddressCity: textUI({
      title: 'City',
      autocomplete: 'address-level2',
      errorMessages: {
        required: 'Enter your city.',
      },
    }),
    presentAddressState: selectUI({
      title: 'State',
      labels: STATE_LABELS,
      autocomplete: 'address-level1',
      errorMessages: {
        required: 'Select your state.',
      },
    }),
    presentAddressZip: textUI({
      title: 'ZIP code',
      hint: 'Enter 5-digit ZIP code or ZIP+4 (e.g., 20420 or 20420-0001).',
      autocomplete: 'postal-code',
      errorMessages: {
        required: 'Enter your ZIP code.',
        pattern: 'Enter a valid ZIP code (e.g., 20420 or 20420-0001).',
      },
    }),
  },
};

export const applicantAddressSchema = {
  type: 'object',
  properties: {
    applicantInformation: {
      type: 'object',
      required: [
        'presentAddressStreet1',
        'presentAddressCity',
        'presentAddressState',
        'presentAddressZip',
      ],
      properties: {
        presentAddressStreet1: { type: 'string', minLength: 1, maxLength: 100 },
        presentAddressStreet2: { type: 'string', maxLength: 100 },
        presentAddressCity: { type: 'string', minLength: 1, maxLength: 100 },
        presentAddressState: { type: 'string', enum: STATE_OPTIONS },
        presentAddressZip: {
          type: 'string',
          pattern: '^\\d{5}(-\\d{4})?$',
        },
      },
    },
  },
};