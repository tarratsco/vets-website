import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { US_STATE_KEYS, US_STATE_OPTIONS } from '../../constants';

const stateLabels = US_STATE_OPTIONS.reduce((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {});

export const flagRecipientAddressUiSchema = {
  flagRecipient: {
    'ui:title': 'Flag recipient address',
    recipientAddressLine1: textUI({
      title: 'Street address or rural route, or P.O. Box',
      autocomplete: 'street-address',
      errorMessages: {
        required: 'Please enter a street address.',
      },
    }),
    recipientAddressLine2: textUI({
      title: 'Apartment, suite, unit (optional)',
    }),
    recipientCity: textUI({
      title: 'City',
      autocomplete: 'address-level2',
      errorMessages: {
        required: 'Please enter a city.',
      },
    }),
    recipientState: selectUI({
      title: 'State or territory',
      labels: stateLabels,
      errorMessages: {
        required: 'Please select a state.',
      },
    }),
    recipientZip: textUI({
      title: 'ZIP code',
      inputType: 'text',
      autocomplete: 'postal-code',
      errorMessages: {
        required: 'Please enter a valid ZIP code (5 digits).',
        pattern: 'Please enter a valid ZIP code (5 digits).',
      },
    }),
    recipientPhone: textUI({
      title: 'Phone number',
      hint:
        'Enter a phone number where VA can reach the person receiving the flag if there are questions about the application.',
      inputType: 'tel',
      errorMessages: {
        pattern: 'Please enter a valid 10-digit phone number.',
      },
    }),
  },
};

export const flagRecipientAddressSchema = {
  type: 'object',
  required: ['flagRecipient'],
  properties: {
    flagRecipient: {
      type: 'object',
      required: [
        'recipientAddressLine1',
        'recipientCity',
        'recipientState',
        'recipientZip',
      ],
      properties: {
        recipientAddressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        recipientAddressLine2: {
          type: 'string',
          maxLength: 100,
        },
        recipientCity: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        recipientState: selectSchema(US_STATE_KEYS),
        recipientZip: {
          type: 'string',
          pattern: '^[0-9]{5}(-[0-9]{4})?$',
          minLength: 5,
          maxLength: 10,
        },
        recipientPhone: {
          type: 'string',
          pattern: '^[0-9]{10}$',
          minLength: 10,
          maxLength: 10,
        },
      },
    },
  },
};