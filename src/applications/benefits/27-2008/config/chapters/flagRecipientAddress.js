import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATE_LABELS = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  PR: 'Puerto Rico',
  GU: 'Guam',
  VI: 'U.S. Virgin Islands',
  AS: 'American Samoa',
  MP: 'Northern Mariana Islands',
  UM: 'U.S. Minor Outlying Islands',
  OUTSIDE_US: 'Outside the United States',
};

const STATE_KEYS = Object.keys(US_STATE_LABELS);

export const flagRecipientAddressUiSchema = {
  flagRecipient: {
    'ui:title': 'Flag recipient address',
    recipientAddressLine1: textUI({
      title: 'Street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: { required: 'Please enter a street address.' },
    }),
    recipientAddressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    recipientCity: textUI({
      title: 'City',
      autocomplete: 'address-level2',
      errorMessages: { required: 'Please enter a city.' },
    }),
    recipientState: selectUI({
      title: 'State or territory',
      labels: US_STATE_LABELS,
      errorMessages: { required: 'Please select a state.' },
    }),
    recipientZip: textUI({
      title: 'ZIP code',
      hint: 'Enter a 5-digit or 9-digit (ZIP+4) ZIP code.',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: { required: 'Please enter a valid ZIP code (5 digits).' },
    }),
    recipientPhone: textUI({
      title: 'Phone number',
      hint:
        'Enter a phone number where VA can reach the person receiving the flag if there are questions about the application.',
      inputType: 'tel',
      errorMessages: {
        pattern: 'Please enter a valid 10-digit phone number.',
      },
    }),
  },
};

export const flagRecipientAddressSchema = {
  type: 'object',
  required: ['flagRecipient'],
  properties: {
    flagRecipient: {
      type: 'object',
      required: [
        'recipientAddressLine1',
        'recipientCity',
        'recipientState',
        'recipientZip',
      ],
      properties: {
        recipientAddressLine1: { type: 'string', minLength: 1, maxLength: 100 },
        recipientAddressLine2: { type: 'string', maxLength: 100 },
        recipientCity: { type: 'string', minLength: 1, maxLength: 50 },
        recipientState: selectSchema(STATE_KEYS),
        recipientZip: {
          type: 'string',
          pattern: '^[0-9]{5}(-[0-9]{4})?$',
          minLength: 5,
          maxLength: 10,
        },
        recipientPhone: {
          type: 'string',
          pattern: '^[0-9]{10}$',
          minLength: 10,
          maxLength: 10,
        },
      },
    },
  },
};