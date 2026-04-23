import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { validateAtLeastOnePhone } from '../utils/validations';
import PrefillAlert from '../components/PrefillAlert';

const phoneSchema = {
  type: 'string',
  pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
};

export const personalInformationUiSchema = {
  'ui:description': PrefillAlert,
  veteranFullName: {
    'ui:title': 'Your name',
    first: textUI({
      title: 'First name',
      hint: 'This is pre-filled from your VA profile. Update here if incorrect.',
      errorMessages: {
        required: 'Please enter your first name',
      },
    }),
    middle: textUI({
      title: 'Middle name',
      hint: 'Optional',
    }),
    last: textUI({
      title: 'Last name',
      hint: 'This is pre-filled from your VA profile. Update here if incorrect.',
      errorMessages: {
        required: 'Please enter your last name',
      },
    }),
  },
  veteranDateOfBirth: currentOrPastDateUI({
    title: 'Date of birth',
    hint: 'This is pre-filled from your VA profile. Format: month, day, year (for example, January 19 1950)',
    errorMessages: {
      required: 'Please enter your date of birth',
      pattern: 'Please enter a valid date of birth',
    },
    dataDogHidden: true,
  }),
  veteranAddress: {
    'ui:title': 'Your address',
    street: textUI({
      title: 'Street address',
      hint: 'Pre-filled from your VA profile. This is where VA will send any physical correspondence related to this form.',
      errorMessages: {
        required: 'Please enter your street address',
      },
    }),
    city: textUI({
      title: 'City',
      errorMessages: {
        required: 'Please enter your city',
      },
    }),
    state: {
      'ui:title': 'State',
      'ui:webComponentField': 'VaSelectField',
      'ui:errorMessages': {
        required: 'Please select a state',
      },
    },
    zipCode: textUI({
      title: 'ZIP code',
      hint: '5-digit ZIP code',
      errorMessages: {
        required: 'Please enter a valid 5-digit ZIP code',
        pattern: 'Please enter a valid 5-digit ZIP code',
      },
    }),
  },
  'view:phoneNumbers': {
    'ui:title': 'Phone numbers',
    'ui:description':
      'Please enter at least one phone number where we can reach you.',
    'ui:validations': [validateAtLeastOnePhone],
    veteranHomePhone: textUI({
      title: 'Home phone number',
      hint: 'Include area code. For example: 555-867-5309',
      errorMessages: {
        pattern:
          'Please enter a valid 10-digit phone number including area code',
      },
    }),
    veteranWorkPhone: textUI({
      title: 'Work phone number',
      hint: 'Include area code (optional)',
      errorMessages: {
        pattern:
          'Please enter a valid 10-digit phone number including area code',
      },
    }),
    veteranMobilePhone: textUI({
      title: 'Mobile phone number',
      hint: 'Include area code (optional)',
      errorMessages: {
        pattern:
          'Please enter a valid 10-digit phone number including area code',
      },
    }),
  },
};

export const personalInformationSchema = {
  type: 'object',
  required: ['veteranFullName', 'veteranDateOfBirth', 'veteranAddress'],
  properties: {
    veteranFullName: {
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: { type: 'string', minLength: 1, maxLength: 50 },
        middle: { type: 'string', maxLength: 50 },
        last: { type: 'string', minLength: 1, maxLength: 50 },
      },
    },
    veteranDateOfBirth: currentOrPastDateSchema,
    veteranAddress: {
      type: 'object',
      required: ['street', 'city', 'state', 'zipCode'],
      properties: {
        street: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 50 },
        state: {
          type: 'string',
          enum: [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
            'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
            'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
            'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
            'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
            'WA', 'WV', 'WI', 'WY',
          ],
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}(-\\d{4})?$',
        },
      },
    },
    'view:phoneNumbers': {
      type: 'object',
      properties: {
        veteranHomePhone: { ...phoneSchema },
        veteranWorkPhone: { ...phoneSchema },
        veteranMobilePhone: { ...phoneSchema },
      },
    },
  },
};