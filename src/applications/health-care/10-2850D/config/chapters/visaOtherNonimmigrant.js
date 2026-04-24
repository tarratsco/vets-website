import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

export const visaOtherNonimmigrantUiSchema = {
  citizenship: {
    'ui:title': 'Other non-immigrant visa information',
    otherNonimmigrantVisaType: textUI({
      title: 'Visa type',
      hint:
        'Enter the visa type code from your visa document (for example: H-1B, TN, O-1).',
      errorMessages: {
        required: 'Enter your visa type.',
      },
    }),
    otherNonimmigrantVisaNumber: textUI({
      title: 'Visa number',
      hint: 'Enter the visa number from your U.S. visa document.',
      errorMessages: {
        required: 'Enter your visa number.',
      },
    }),
    otherNonimmigrantVisaIssueDate: {
      'ui:title': 'Issue date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your visa was issued.',
      },
      'ui:errorMessages': {
        required: 'Enter your visa issue date.',
        pattern: 'Enter a valid issue date.',
      },
    },
    otherNonimmigrantVisaExpirationDate: {
      'ui:title': 'Expiration date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your visa expires.',
      },
      'ui:errorMessages': {
        required: 'Enter your visa expiration date.',
        pattern: 'Enter a valid expiration date.',
      },
    },
  },
};

export const visaOtherNonimmigrantSchema = {
  type: 'object',
  properties: {
    citizenship: {
      type: 'object',
      required: [
        'otherNonimmigrantVisaType',
        'otherNonimmigrantVisaNumber',
        'otherNonimmigrantVisaIssueDate',
        'otherNonimmigrantVisaExpirationDate',
      ],
      properties: {
        otherNonimmigrantVisaType: { type: 'string', maxLength: 10 },
        otherNonimmigrantVisaNumber: { type: 'string', maxLength: 20 },
        otherNonimmigrantVisaIssueDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        otherNonimmigrantVisaExpirationDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },
  },
};