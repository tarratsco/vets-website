import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  yesNoUI,
  yesNoSchema,
  phoneUI,
  phoneSchema,
  emailUI,
  emailSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { states } from 'platform/forms/address';

const stateLabels = states.USA.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

const addressProperties = {
  street: { type: 'string', maxLength: 100, minLength: 1 },
  street2: { type: 'string', maxLength: 50 },
  city: { type: 'string', maxLength: 100 },
  state: selectSchema(Object.keys(stateLabels)),
  zipCode: { type: 'string', pattern: '^\\d{5}(-\\d{4})?$' },
};

const addressUiFields = prefix => ({
  street: textUI({
    title: `${prefix} street address`,
    autocomplete: 'street-address',
    errorMessages: { required: 'Please enter a street address.' },
  }),
  street2: textUI({
    title: 'Apartment or unit number',
  }),
  city: textUI({
    title: 'City',
    autocomplete: 'address-level2',
    errorMessages: { required: 'Please enter a city.' },
  }),
  state: selectUI({
    title: 'State',
    labels: stateLabels,
    errorMessages: { required: 'Please select a state.' },
  }),
  zipCode: textUI({
    title: 'ZIP code',
    hint: 'Enter a 5-digit ZIP code.',
    inputType: 'text',
    errorMessages: {
      required: 'Please enter a ZIP code.',
      pattern: 'Please enter a valid 5-digit ZIP code.',
    },
  }),
});

export const contactInformationUiSchema = {
  contactInformation: {
    'ui:title': 'Contact information',
    homeAddress: {
      'ui:title': 'Home address',
      ...addressUiFields('Home'),
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
      ...addressUiFields('Mailing'),
    },
    primaryPhone: phoneUI('Primary phone number'),
    alternatePhone: phoneUI('Alternate phone number'),
    professionalEmail: emailUI('Professional email address'),
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
          properties: addressProperties,
        },
        mailingAddressSameAsHome: yesNoSchema,
        mailingAddress: {
          type: 'object',
          properties: addressProperties,
        },
        primaryPhone: phoneSchema,
        alternatePhone: phoneSchema,
        professionalEmail: emailSchema,
      },
    },
  },
};