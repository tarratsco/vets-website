import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  yesNoUI,
  yesNoSchema,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const stateOptions = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR', 'GU', 'VI', 'AS', 'MP',
];

export const contactInformationUiSchema = {
  contactInformation: {
    'ui:title': 'Contact Information',
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
        inputType: 'text',
        autocomplete: 'postal-code',
        errorMessages: {
          required: 'Please enter your ZIP code.',
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
      }),
    },
    mailingAddressSameAsHome: yesNoUI({
      title: 'Is your mailing address the same as your home address?',
      labels: {
        Y: 'Yes, my mailing address is the same as my home address',
        N: 'No, my mailing address is different',
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
        errorMessages: { required: 'Please enter your mailing street address.' },
      }),
      street2: textUI({ title: 'Apartment or unit number' }),
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
        errorMessages: {
          required: 'Please enter your mailing ZIP code.',
          pattern: 'Please enter a valid 5-digit ZIP code.',
        },
      }),
    },
    primaryPhone: phoneUI({
      title: 'Primary phone number',
      errorMessages: {
        required: 'Please enter your primary phone number.',
        pattern: 'Please enter a valid 10-digit U.S. phone number.',
      },
    }),
    alternatePhone: phoneUI('Alternate phone number (optional)'),
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
            state: selectSchema(stateOptions),
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
            state: selectSchema(stateOptions),
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