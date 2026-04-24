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

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
];

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
        autocomplete: 'address-level1',
        errorMessages: { required: 'Please select your state.' },
      }),
      zipCode: textUI({
        title: 'ZIP code',
        autocomplete: 'postal-code',
        inputType: 'numeric',
        errorMessages: {
          required: 'Please enter your ZIP code.',
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
      }),
    },
    mailingAddressSameAsHome: yesNoUI({
      title: 'Is your mailing address the same as your home address?',
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
        errorMessages: { required: 'Please enter your mailing street address.' },
      }),
      street2: textUI({
        title: 'Apartment or unit number',
      }),
      city: textUI({
        title: 'City',
        errorMessages: { required: 'Please enter your mailing city.' },
      }),
      state: selectUI({
        title: 'State',
        errorMessages: { required: 'Please select your mailing state.' },
      }),
      zipCode: textUI({
        title: 'ZIP code',
        inputType: 'numeric',
        errorMessages: {
          required: 'Please enter your mailing ZIP code.',
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
      }),
    },
    primaryPhone: phoneUI({
      title: 'Primary phone number',
      hint: 'Enter a 10-digit U.S. phone number.',
      errorMessages: {
        required: 'Please enter your primary phone number.',
        pattern: 'Please enter a valid 10-digit phone number.',
      },
    }),
    alternatePhone: phoneUI({
      title: 'Alternate phone number (optional)',
    }),
    professionalEmail: emailUI({
      title: 'Professional email address',
      hint:
        'Use an email address you check regularly. VA will send status updates about your application here.',
      errorMessages: {
        required: 'Please enter your professional email address.',
        format: 'Please enter a valid email address.',
      },
    }),
  },
};

const addressSchema = {
  type: 'object',
  required: ['street', 'city', 'state', 'zipCode'],
  properties: {
    street: { type: 'string', maxLength: 100 },
    street2: { type: 'string', maxLength: 50 },
    city: { type: 'string', maxLength: 100 },
    state: selectSchema(US_STATES),
    zipCode: {
      type: 'string',
      pattern: '^\\d{5}(-\\d{4})?$',
    },
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
        homeAddress: addressSchema,
        mailingAddressSameAsHome: yesNoSchema,
        mailingAddress: addressSchema,
        primaryPhone: phoneSchema,
        alternatePhone: phoneSchema,
        professionalEmail: emailSchema,
      },
    },
  },
};