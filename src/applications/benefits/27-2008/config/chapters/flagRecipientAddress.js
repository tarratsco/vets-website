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
  'WY', 'PR', 'GU', 'VI', 'AS', 'MP', 'UM', 'OUTSIDE_US',
];

const STATE_LABELS = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming', PR: 'Puerto Rico', GU: 'Guam',
  VI: 'U.S. Virgin Islands', AS: 'American Samoa',
  MP: 'Northern Mariana Islands', UM: 'U.S. Minor Outlying Islands',
  OUTSIDE_US: 'Outside the United States',
};

function validateZip(errors, formData) {
  const zip = formData?.flagRecipient?.recipientZip;
  if (zip && !/^[0-9]{5}(-[0-9]{4})?$/.test(zip)) {
    errors.flagRecipient.recipientZip.addError(
      'Please enter a valid ZIP code (5 digits, optionally followed by a dash and 4 digits).',
    );
  }
}

function validatePhone(errors, formData) {
  const phone = formData?.flagRecipient?.recipientPhone;
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    errors.flagRecipient.recipientPhone.addError(
      'Please enter a valid 10-digit phone number.',
    );
  }
}

export const flagRecipientAddressUiSchema = {
  flagRecipient: {
    'ui:title': 'Address of person entitled to receive the flag',
    recipientAddressLine1: textUI({
      title: 'Street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: {
        required: 'Please enter a street address.',
      },
    }),
    recipientAddressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    recipientCity: textUI({
      title: 'City',
      autocomplete: 'address-level2',
      errorMessages: {
        required: 'Please enter a city.',
      },
    }),
    recipientState: selectUI({
      title: 'State or territory',
      labels: STATE_LABELS,
      errorMessages: {
        required: 'Please select a state.',
      },
    }),
    recipientZip: textUI({
      title: 'ZIP code',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: {
        required: 'Please enter a valid ZIP code (5 digits).',
        pattern:
          'Please enter a valid ZIP code (5 digits, optionally followed by a dash and 4 digits).',
      },
    }),
    recipientPhone: textUI({
      title: 'Phone number (optional)',
      hint:
        'Enter a phone number where VA can reach the person receiving the flag if there are questions about the application.',
      inputType: 'tel',
    }),
  },
  'ui:validations': [validateZip, validatePhone],
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
        recipientAddressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        recipientAddressLine2: {
          type: 'string',
          maxLength: 100,
        },
        recipientCity: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        recipientState: selectSchema(STATE_OPTIONS),
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