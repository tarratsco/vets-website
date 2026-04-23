/**
 * @module pages/veteranIdentity
 * @description Veteran identifying information — name, DOB, SSN last 4, VA file number
 */
import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranIdentityUiSchema = {
  'ui:title': 'Veteran identity',
  'ui:description':
    "We've pre-filled some of your information from your VA profile. Review it and make any updates needed.",
  veteran: {
    firstName: textUI({
      title: "Veteran's first name",
      hint:
        "Enter the Veteran's legal first name as it appears on VA records.",
      autocomplete: 'given-name',
      errorMessages: {
        required: "Please enter the Veteran's first name.",
      },
    }),
    middleName: textUI({
      title: "Veteran's middle name (optional)",
      hint:
        'If applicable. Do not include middle initial only — enter the full middle name.',
      autocomplete: 'additional-name',
    }),
    lastName: textUI({
      title: "Veteran's last name",
      hint: "Enter the Veteran's legal last name.",
      autocomplete: 'family-name',
      errorMessages: {
        required: "Please enter the Veteran's last name.",
      },
    }),
    dateOfBirth: {
      ...currentOrPastDateUI({
        title: "Veteran's date of birth",
        hint:
          "Enter the Veteran's date of birth. We use this to verify identity and locate records.",
        errorMessages: {
          required: 'Please enter a valid date of birth.',
          pattern: 'Please enter a valid date of birth.',
        },
      }),
    },
    ssnLast4: textUI({
      title: "Veteran's Social Security number (last 4 digits)",
      hint:
        'Enter the last 4 digits of the Veteran\'s Social Security number. This is used for identity verification and record matching only.',
      inputType: 'text',
      autocomplete: 'off',
      errorMessages: {
        required:
          "Please enter the last 4 digits of the Veteran's Social Security number.",
        pattern:
          'Please enter exactly 4 numeric digits.',
      },
    }),
    vaFileNumber: textUI({
      title: 'VA file number (optional)',
      hint:
        "If you know the Veteran's VA file number, enter it here. This is different from the Social Security number. Leave blank if unknown.",
      errorMessages: {
        pattern: 'VA file number should be 7 to 10 digits.',
      },
    }),
  },
};

export const veteranIdentitySchema = {
  type: 'object',
  required: ['veteran'],
  properties: {
    veteran: {
      type: 'object',
      required: ['firstName', 'lastName', 'dateOfBirth', 'ssnLast4'],
      properties: {
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middleName: {
          type: 'string',
          maxLength: 30,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        dateOfBirth: currentOrPastDateSchema,
        ssnLast4: {
          type: 'string',
          pattern: '^\\d{4}$',
          minLength: 4,
          maxLength: 4,
        },
        vaFileNumber: {
          type: 'string',
          pattern: '^\\d{7,10}$',
          minLength: 7,
          maxLength: 10,
        },
      },
    },
  },
};