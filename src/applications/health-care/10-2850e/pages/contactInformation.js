import {
  textUI,
  textSchema,
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'AS', 'GU', 'MP', 'PR', 'VI',
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
      street: textUI({ title: 'Street address' }),
      street2: textUI({ title: 'Apartment or unit number' }),
      city: textUI({ title: 'City' }),
      state: selectUI({ title: 'State' }),
      zipCode: textUI({ title: 'ZIP code' }),
    },
    primaryPhone: textUI({
      title: 'Primary phone number',
      hint: 'Enter a 10-digit U.S. phone number.',
      inputType: 'tel',
      autocomplete: 'tel',
      errorMessages: {
        required: 'Please enter your primary phone number.',
        pattern: 'Please enter a valid 10-digit phone number.',
      },
    }),
    alternatePhone: textUI({
      title: 'Alternate phone number',
      inputType: 'tel',
    }),
    professionalEmail: textUI({
      title: 'Professional email address',
      hint: 'Use an email address you check regularly. VA will send status updates here.',
      inputType: 'email',
      autocomplete: 'email',
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
            state: selectSchema(US_STATES),
            zipCode: { type: 'string', pattern: '^\\d{5}(-\\d{4})?$' },
          },
        },
        mailingAddressSameAsHome: yesNoSchema,
        mailingAddress: {
          type: 'object',
          properties: {
            street: { type: 'string', maxLength: 100 },
            street2: { type: 'string', maxLength: 50 },
            city: { type: 'string', maxLength: 100 },
            state: selectSchema(US_STATES),
            zipCode: { type: 'string', pattern: '^\\d{5}(-\\d{4})?$' },
          },
        },
        primaryPhone: {
          type: 'string',
          pattern: '^(?:\\(?[2-9]\\d{2}\\)?[-. ]?){1}\\d{3}[-. ]?\\d{4}$',
        },
        alternatePhone: {
          type: 'string',
          pattern: '^(?:\\(?[2-9]\\d{2}\\)?[-. ]?){1}\\d{3}[-. ]?\\d{4}$',
        },
        professionalEmail: { type: 'string', format: 'email', maxLength: 256 },
      },
    },
  },
};