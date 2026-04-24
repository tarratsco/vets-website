import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';

const STATE_LABELS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
  'WA', 'WV', 'WI', 'WY',
];

const stateOptions = STATE_LABELS.reduce((acc, s) => {
  acc[s] = s;
  return acc;
}, {});

export const certificationRepresentativeInformationUiSchema = {
  representative: {
    'ui:title': 'Representative Information (Section IV)',
    lastName: textUI({
      title: "Representative's last name",
      autocomplete: 'family-name',
      errorMessages: {
        required: "Please enter the representative's last name.",
      },
    }),
    firstName: textUI({
      title: "Representative's first name",
      autocomplete: 'given-name',
      errorMessages: {
        required: "Please enter the representative's first name.",
      },
    }),
    middleInitial: textUI({
      title: "Representative's middle initial",
    }),
    ssn: {
      'ui:title': "Representative's Social Security number",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          "The form requires the SSN of any representative who signs in place of the patient. Format: 999-99-9999.",
        inputmode: 'numeric',
        dataDogHidden: true,
      },
      'ui:errorMessages': {
        required: "Please enter the representative's Social Security number.",
        pattern:
          'Please enter a 9-digit Social Security number in the format 999-99-9999.',
      },
    },
    address: {
      'ui:title': "Representative's address",
      street: textUI({
        title: "Representative's street address",
        autocomplete: 'street-address',
        errorMessages: {
          required: "Please enter the representative's street address.",
        },
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
        errorMessages: {
          required: "Please enter the representative's city.",
        },
      }),
      state: {
        'ui:title': 'State',
        'ui:webComponentField': VaSelectField,
        'ui:autocomplete': 'address-level1',
        'ui:options': {
          labels: stateOptions,
        },
        'ui:errorMessages': {
          required: "Please select the representative's state.",
        },
      },
      zipCode: {
        'ui:title': 'ZIP code',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint: 'Format: 99999 or 99999-9999',
          inputmode: 'numeric',
          autocomplete: 'postal-code',
        },
        'ui:errorMessages': {
          required: "Please enter the representative's ZIP code.",
          pattern:
            'Please enter a valid ZIP code in the format 99999 or 99999-9999.',
        },
      },
    },
    phone: {
      'ui:title': "Representative's telephone number (include area code)",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Format: (999) 999-9999',
        inputmode: 'tel',
        autocomplete: 'tel',
      },
      'ui:errorMessages': {
        required: "Please enter the representative's telephone number.",
        pattern:
          'Please enter a valid phone number in the format (999) 999-9999.',
      },
    },
  },
};

export const certificationRepresentativeInformationSchema = {
  type: 'object',
  properties: {
    representative: {
      type: 'object',
      required: ['firstName', 'lastName', 'ssn', 'address', 'phone'],
      properties: {
        lastName: { type: 'string', minLength: 1, maxLength: 30 },
        firstName: { type: 'string', minLength: 1, maxLength: 30 },
        middleInitial: { type: 'string', pattern: '^[A-Za-z]$', maxLength: 1 },
        ssn: {
          type: 'string',
          pattern: '^\\d{3}-\\d{2}-\\d{4}$',
          minLength: 11,
          maxLength: 11,
        },
        address: {
          type: 'object',
          required: ['street', 'city', 'state', 'zipCode'],
          properties: {
            street: { type: 'string', minLength: 1, maxLength: 50 },
            city: { type: 'string', minLength: 1, maxLength: 30 },
            state: { type: 'string', enum: STATE_LABELS },
            zipCode: { type: 'string', pattern: '^\\d{5}(-\\d{4})?$' },
          },
        },
        phone: {
          type: 'string',
          pattern: '^\\(\\d{3}\\) \\d{3}-\\d{4}$',
          minLength: 14,
          maxLength: 14,
        },
      },
    },
  },
};