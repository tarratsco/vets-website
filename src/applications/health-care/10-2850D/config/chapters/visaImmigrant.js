import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

export const visaImmigrantUiSchema = {
  citizenship: {
    'ui:title': 'Immigrant visa information',
    immigrantVisaANumber: textUI({
      title: 'Immigrant visa "A" number',
      hint:
        'Enter your USCIS Alien Registration Number (for example: A012345678). This is a 7- to 9-digit number preceded by the letter A, found on your Permanent Resident Card or immigration documents.',
      errorMessages: {
        required: 'Enter your Alien Registration Number.',
        pattern:
          'Enter a valid Alien Registration Number beginning with the letter A followed by 7 to 9 digits.',
      },
    }),
    immigrantVisaIssueDate: {
      'ui:title': 'Immigrant visa issue date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your immigrant visa was issued.',
      },
      'ui:errorMessages': {
        required: 'Enter your immigrant visa issue date.',
        pattern: 'Enter a valid issue date.',
      },
    },
    immigrantVisaExpirationDate: {
      'ui:title': 'Immigrant visa expiration date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your immigrant visa expires.',
      },
      'ui:errorMessages': {
        required: 'Enter your immigrant visa expiration date.',
        pattern: 'Enter a valid expiration date.',
      },
    },
  },
};

export const visaImmigrantSchema = {
  type: 'object',
  properties: {
    citizenship: {
      type: 'object',
      required: [
        'immigrantVisaANumber',
        'immigrantVisaIssueDate',
        'immigrantVisaExpirationDate',
      ],
      properties: {
        immigrantVisaANumber: {
          type: 'string',
          pattern: '^A\\d{7,9}$',
        },
        immigrantVisaIssueDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        immigrantVisaExpirationDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },
  },
};