import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { validateAtLeastOneAgentPhone } from '../utils/validations';
import { addressUiSchema, addressSchema } from '../utils/addressHelpers';

export const primaryAgentUiSchema = {
  primaryAgent: {
    'ui:title': 'Primary Health Care Agent',
    fullName: {
      'ui:title': 'Health Care Agent's name',
      first: textUI({
        title: 'Health Care Agent's first name',
        errorMessages: {
          required: 'Please enter your Health Care Agent's first name',
        },
      }),
      middle: textUI({
        title: 'Health Care Agent's middle name',
        hint: 'Optional',
      }),
      last: textUI({
        title: 'Health Care Agent's last name',
        errorMessages: {
          required: 'Please enter your Health Care Agent's last name',
        },
      }),
    },
    relationship: textUI({
      title: 'Relationship to you',
      hint: 'For example: spouse, sibling, friend, child',
      errorMessages: {
        required: 'Please describe this person\'s relationship to you',
      },
    }),
    address: addressUiSchema('Health Care Agent's'),
    'view:agentPhones': {
      'ui:title': 'Health Care Agent's phone numbers',
      'ui:description':
        'Please enter at least one phone number for your Health Care Agent.',
      'ui:validations': [validateAtLeastOneAgentPhone],
      homePhone: textUI({
        title: 'Home phone number',
        hint: 'Include area code',
        errorMessages: {
          pattern:
            'Please enter a valid 10-digit phone number including area code',
        },
      }),
      workPhone: textUI({
        title: 'Work phone number',
        hint: 'Include area code (optional)',
        errorMessages: {
          pattern:
            'Please enter a valid 10-digit phone number including area code',
        },
      }),
      mobilePhone: textUI({
        title: 'Mobile phone number',
        hint: 'Include area code (optional)',
        errorMessages: {
          pattern:
            'Please enter a valid 10-digit phone number including area code',
        },
      }),
    },
  },
};

const agentPhoneSchema = {
  type: 'string',
  pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
  maxLength: 12,
};

export const primaryAgentSchema = {
  type: 'object',
  properties: {
    primaryAgent: {
      type: 'object',
      required: ['fullName', 'relationship', 'address'],
      properties: {
        fullName: {
          type: 'object',
          required: ['first', 'last'],
          properties: {
            first: { type: 'string', minLength: 1, maxLength: 50 },
            middle: { type: 'string', maxLength: 50 },
            last: { type: 'string', minLength: 1, maxLength: 50 },
          },
        },
        relationship: { type: 'string', minLength: 1, maxLength: 50 },
        address: addressSchema,
        'view:agentPhones': {
          type: 'object',
          properties: {
            homePhone: agentPhoneSchema,
            workPhone: agentPhoneSchema,
            mobilePhone: agentPhoneSchema,
          },
        },
      },
    },
  },
};