import {
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const applicantIdentifiersUiSchema = {
  applicantInformation: {
    'ui:title': 'Personal identifiers',
    ssn: {
      ...ssnUI(),
      'ui:title': 'Social Security number',
      'ui:options': {
        hint:
          'Your SSN is required. Disclosure is mandatory per Public Law 93-579 and Executive Order 9397 to identify your federal records. Your SSN will be transmitted securely.',
      },
      'ui:errorMessages': {
        required: 'Enter your 9-digit Social Security number.',
        pattern: 'Enter a valid 9-digit Social Security number.',
      },
    },
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint: 'Enter the month, day, and year you were born (for example: January 19 1950).',
      errorMessages: {
        required: 'Enter your date of birth.',
        pattern: 'Enter a valid date of birth.',
        futureDate: 'Date of birth must be in the past.',
      },
    }),
  },
};

export const applicantIdentifiersSchema = {
  type: 'object',
  properties: {
    applicantInformation: {
      type: 'object',
      required: ['ssn', 'dateOfBirth'],
      properties: {
        ssn: ssnSchema,
        dateOfBirth: currentOrPastDateSchema,
      },
    },
  },
};