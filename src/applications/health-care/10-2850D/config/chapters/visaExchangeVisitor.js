import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

export const visaExchangeVisitorUiSchema = {
  citizenship: {
    'ui:title': 'Exchange visitor visa information',
    exchangeVisitorVisaType: textUI({
      title: 'Visa type',
      hint: 'Enter the visa type code from your visa document (for example: J-1).',
      errorMessages: {
        required: 'Enter your visa type.',
      },
    }),
    exchangeVisitorVisaNumber: textUI({
      title: 'Visa number',
      hint:
        'Enter the 8-digit visa number from the red text on your U.S. visa document. Do not enter the foil number.',
      errorMessages: {
        required: 'Enter your visa number.',
        pattern: 'Enter a valid 8-digit visa number.',
      },
    }),
    exchangeVisitorVisaIssueDate: {
      'ui:title': 'Issue date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your exchange visitor visa was issued.',
      },
      'ui:errorMessages': {
        required: 'Enter your visa issue date.',
        pattern: 'Enter a valid issue date.',
      },
    },
    exchangeVisitorVisaExpirationDate: {
      'ui:title': 'Expiration date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the date your exchange visitor visa expires.',
      },
      'ui:errorMessages': {
        required: 'Enter your visa expiration date.',
        pattern: 'Enter a valid expiration date.',
      },
    },
  },
};

export const visaExchangeVisitorSchema = {
  type: 'object',
  properties: {
    citizenship: {
      type: 'object',
      required: [
        'exchangeVisitorVisaType',
        'exchangeVisitorVisaNumber',
        'exchangeVisitorVisaIssueDate',
        'exchangeVisitorVisaExpirationDate',
      ],
      properties: {
        exchangeVisitorVisaType: { type: 'string', maxLength: 10 },
        exchangeVisitorVisaNumber: {
          type: 'string',
          pattern: '^\\d{8}$',
        },
        exchangeVisitorVisaIssueDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        exchangeVisitorVisaExpirationDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },
  },
};