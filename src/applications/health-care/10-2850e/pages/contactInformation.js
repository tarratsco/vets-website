import {
  textUI,
  textSchema,
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const STATE_OPTIONS = {
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
};

export const contactInformationUiSchema = {
  contactInformation: {
    'ui:title': 'Contact information',
    homeAddress: {
      'ui:title': 'Home address',
      street: textUI({
        title: 'Street address',
        autocomplete: 'street-address',
        errorMessages: { required: 'Please enter your street address.' },
      }),
      street2: textUI({
        title: 'Apartment or unit number',
        autocomplete: 'address-line2',
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
        errorMessages: { required: 'Please enter your city.' },
      }),
      state: selectUI({
        title: 'State',
        labels: STATE_OPTIONS,
        autocomplete: 'address-level1',
        errorMessages: { required: 'Please select your state.' },
      }),
      zipCode: textUI({
        title: 'ZIP code',
        autocomplete: 'postal-code',
        inputType: 'text',
        errorMessages: {
          required: 'Please enter your ZIP code.',
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
      }),
    },
    mailingAddressSameAsHome: yesNoUI({
      title: 'Is your mailing address the same as your home address?',
      labels: {
        Y: 'Yes, my mailing address is the same as my home address.',
        N: 'No, my mailing address is different.',
      },
    }),
    mailingAddress: {
      'ui:title': 'Mailing address',
      'ui:options': {
        hideIf: formData =>
          formData?.contactInformation?.mailingAddressSameAsHome !== false,
      },
      street: textUI({
        title: 'Street address',
        autocomplete: 'street-address',
      }),
      street2: textUI({
        title: 'Apartment or unit number',
      }),
      city: textUI({
        title: 'City',
      }),
      state: selectUI({
        title: 'State',
        labels: STATE_OPTIONS,
      }),
      zipCode: textUI({
        title: 'ZIP code',
        inputType: 'text',
      }),
    },
    primaryPhone: phoneUI('Primary phone number'),
    alternatePhone: phoneUI('Alternate phone number'),
    professionalEmail: emailUI(),
  },
};

export const contactInformationSchema = {
  type: 'object',
  required: ['contactInformation'],
  properties: {
    contactInformation: {
      type: 'object',
      required: ['homeAddress', 'primaryPhone', 'professionalEmail'],
      properties: {
        homeAddress: {
          type: 'object',
          required: ['street', 'city', 'state', 'zipCode'],
          properties: {
            street: { type: 'string', maxLength: 100 },
            street2: { type: 'string', maxLength: 50 },
            city: { type: 'string', maxLength: 100 },
            state: selectSchema(Object.keys(STATE_OPTIONS)),
            zipCode: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
        mailingAddressSameAsHome: yesNoSchema,
        mailingAddress: {
          type: 'object',
          properties: {
            street: { type: 'string', maxLength: 100 },
            street2: { type: 'string', maxLength: 50 },
            city: { type: 'string', maxLength: 100 },
            state: selectSchema(Object.keys(STATE_OPTIONS)),
            zipCode: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
        primaryPhone: phoneSchema,
        alternatePhone: phoneSchema,
        professionalEmail: emailSchema,
      },
    },
  },
};