import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
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

const stateOptions = STATE_LABELS.reduce((acc, state) => {
  acc[state] = state;
  return acc;
}, {});

export const patientInformationUiSchema = {
  patient: {
    'ui:title': 'Patient Information (Section I)',
    lastName: textUI({
      title: "Patient's last name",
      hint:
        'Enter the last name of the child who received care (the beneficiary).',
      autocomplete: 'family-name',
      errorMessages: {
        required: "Please enter the patient's last name.",
      },
    }),
    firstName: textUI({
      title: "Patient's first name",
      autocomplete: 'given-name',
      errorMessages: {
        required: "Please enter the patient's first name.",
      },
    }),
    middleInitial: textUI({
      title: "Patient's middle initial",
      errorMessages: {
        pattern: 'Please enter a single letter for the middle initial.',
      },
    }),
    ssn: {
      'ui:title': "Patient's Social Security number",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          'Format: 999-99-9999. Your SSN is used to match your claim to your program enrollment record.',
        inputmode: 'numeric',
        dataDogHidden: true,
      },
      'ui:errorMessages': {
        required: "Please enter the patient's Social Security number.",
        pattern:
          'Please enter a 9-digit Social Security number in the format 999-99-9999.',
      },
    },
    dateOfBirth: currentOrPastDateUI({
      title: "Patient's date of birth",
      hint: 'Format: MM/DD/YYYY',
      errorMessages: {
        required: "Please enter the patient's date of birth.",
        pattern: 'Please enter a valid date of birth.',
      },
    }),
    address: {
      'ui:title': "Patient's address",
      street: textUI({
        title: "Patient's street address",
        autocomplete: 'street-address',
        errorMessages: {
          required: "Please enter the patient's street address.",
        },
      }),
      city: textUI({
        title: 'City',
        autocomplete: 'address-level2',
        errorMessages: {
          required: "Please enter the patient's city.",
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
          required: "Please select the patient's state.",
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
          required: "Please enter the patient's ZIP code.",
          pattern:
            'Please enter a valid ZIP code in the format 99999 or 99999-9999.',
        },
      },
    },
    phone: {
      'ui:title': "Patient's telephone number (include area code)",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Format: (999) 999-9999',
        inputmode: 'tel',
        autocomplete: 'tel',
      },
      'ui:errorMessages': {
        required: "Please enter the patient's telephone number.",
        pattern:
          'Please enter a valid phone number in the format (999) 999-9999.',
      },
    },
  },
};

export const patientInformationSchema = {
  type: 'object',
  required: ['patient'],
  properties: {
    patient: {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'ssn',
        'dateOfBirth',
        'address',
        'phone',
      ],
      properties: {
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middleInitial: {
          type: 'string',
          pattern: '^[A-Za-z]$',
          maxLength: 1,
        },
        ssn: {
          type: 'string',
          pattern: '^\\d{3}-\\d{2}-\\d{4}$',
          minLength: 11,
          maxLength: 11,
        },
        dateOfBirth: currentOrPastDateSchema,
        address: {
          type: 'object',
          required: ['street', 'city', 'state', 'zipCode'],
          properties: {
            street: { type: 'string', minLength: 1, maxLength: 50 },
            city: { type: 'string', minLength: 1, maxLength: 30 },
            state: {
              type: 'string',
              enum: STATE_LABELS,
            },
            zipCode: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
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