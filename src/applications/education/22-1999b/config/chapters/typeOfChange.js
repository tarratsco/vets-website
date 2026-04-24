import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const TYPE_OF_CHANGE_LABELS = {
  credit_hour_reduction:
    'Reduction in credit hours (student is still enrolled)',
  partial_withdrawal:
    'Withdrawal from one or more courses (partial \u2014 student remains enrolled in other courses)',
  full_termination:
    'Full termination of enrollment (student is no longer enrolled at your institution)',
  correction:
    'Correction to a previously submitted certification (fixing an error on the original VA Form 22-1999)',
};

export const TYPE_OF_CHANGE_KEYS = Object.keys(TYPE_OF_CHANGE_LABELS);

export const typeOfChangeUiSchema = {
  typeOfChange: radioUI({
    title: 'What type of enrollment change are you reporting?',
    hint:
      'Select the option that best describes what changed for this student. Your selection will determine which additional information VA needs.',
    labels: TYPE_OF_CHANGE_LABELS,
    errorMessages: {
      required:
        'Please select the type of enrollment change you are reporting.',
    },
  }),
};

export const typeOfChangeSchema = {
  type: 'object',
  required: ['typeOfChange'],
  properties: {
    typeOfChange: radioSchema(TYPE_OF_CHANGE_KEYS),
  },
};