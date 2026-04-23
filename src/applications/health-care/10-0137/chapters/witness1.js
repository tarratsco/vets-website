import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  validateWitness1Eligibility,
  validateWitness1SignatureMatch,
  validateWitnessNotVeteran,
  validateWitnessDate,
} from '../utils/validations';
import { addressUiSchema, addressSchema } from '../utils/addressHelpers';

export const witness1UiSchema = {
  'ui:title': 'Witness 1',
  witness1: {
    'view:eligibility': {
      'ui:title': 'Witness 1: Please confirm all of the following',
      'ui:description':
        'You must confirm each statement to serve as a witness. If any statement is not true, you cannot serve as a witness for this advance directive.',
      'ui:validations': [validateWitness1Eligibility],
      eligibilityConfirmed: {
        'ui:title': 'I confirm all witness eligibility requirements',
        'ui:description':
          'By checking this box, you confirm: (1) I personally witnessed this advance directive being signed, (2) I was not directed by the patient to sign on their behalf, (3) I am not appointed as Health Care Agent in this advance directive, (4) I am not financially responsible for the care of the patient, and (5) To the best of my knowledge, I am not named as a beneficiary in the patient\'s estate.',
        'ui:widget': 'checkbox',
        'ui:errorMessages': {
          required:
            'You must confirm all statements to serve as a witness for this advance directive',
        },
      },
    },
    name: textUI({
      title: 'Your full name',
      hint: 'Print or type your full name',
      errorMessages: {
        required: 'Please enter your full name',
      },
    }),
    address: addressUiSchema('Witness 1'),
    signatureName: textUI({
      title: 'Your typed signature',
      hint:
        'Type your full name as your digital signature. By doing so, you attest to personally witnessing this advance directive signing.',
      autocomplete: 'off',
      errorMessages: {
        required: 'Please type your full name to complete your witness signature',
      },
    }),
    signatureDate: currentOrPastDateUI({
      title: 'Date of witness signature',
      hint: 'Enter today\'s date',
      errorMessages: {
        required: 'Please enter the date of your witness signature',
        pattern:
          'The witness signature date cannot be before the date the Veteran signed the form',
        futureDate: 'Please enter a valid date. The date cannot be in the future.',
      },
    }),
  },
};

export const witness1Schema = {
  type: 'object',
  properties: {
    witness1: {
      type: 'object',
      required: ['name', 'address', 'signatureName', 'signatureDate'],
      properties: {
        'view:eligibility': {
          type: 'object',
          properties: {
            eligibilityConfirmed: {
              type: 'boolean',
            },
          },
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        address: addressSchema,
        signatureName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        signatureDate: currentOrPastDateSchema,
      },
    },
  },
};