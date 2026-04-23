import {
  textUI,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { validateAtLeastOneAlternateAgentPhone } from '../utils/validations';
import { addressUiSchema, addressSchema } from '../utils/addressHelpers';

export const alternateAgentUiSchema = {
  appointAlternateAgent: radioUI({
    title: 'Do you want to appoint an Alternate Health Care Agent?',
    hint:
      'An Alternate Health Care Agent steps in to make decisions for you if your primary Health Care Agent is unavailable or unwilling to act.',
    labels: {
      appoint_alternate: 'Yes, I want to appoint an Alternate Health Care Agent',
      no_alternate: 'No, I don't want to appoint an alternate right now',
    },
    errorMessages: {
      required: 'Please select an option',
    },
    required: () => true,
  }),
  alternateAgent: {
    'ui:title': 'Alternate Health Care Agent',
    'ui:options': {
      hideIf: formData =>
        formData.appointAlternateAgent !== 'appoint_alternate',
    },
    fullName: {
      'ui:title': 'Alternate Health Care Agent's name',
      first: textUI({
        title: 'Alternate Health Care Agent's first name',
        errorMessages: {
          required: 'Please enter your Alternate Health Care Agent's first name',
        },
      }),
      middle: textUI({
        title: 'Alternate Health Care Agent's middle name',
        hint: 'Optional',
      }),
      last: textUI({
        title: 'Alternate Health Care Agent's last name',
        errorMessages: {
          required: 'Please enter your Alternate Health Care Agent's last name',
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
    address: addressUiSchema('Alternate Health Care Agent's'),
    'view:alternateAgentPhones': {
      'ui:title': 'Alternate Health Care Agent's phone numbers',
      'ui:description':
        'Please enter at least one phone number for your Alternate Health Care Agent.',
      'ui:validations': [validateAtLeastOneAlternateAgentPhone],
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
      }),
      mobilePhone: textUI({
        title: 'Mobile phone number',
        hint: 'Include area code (optional)',
      }),
    },
  },
};

const agentPhoneSchema = {
  type: 'string',
  pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
  maxLength: 12,
};

export const alternateAgentSchema = {
  type: 'object',
  required: ['appointAlternateAgent'],
  properties: {
    appointAlternateAgent: radioSchema(['appoint_alternate', 'no_alternate']),
    alternateAgent: {
      type: 'object',
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
        'view:alternateAgentPhones': {
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