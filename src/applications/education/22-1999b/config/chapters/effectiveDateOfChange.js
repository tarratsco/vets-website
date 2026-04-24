import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const effectiveDateOfChangeUiSchema = {
  effectiveDateOfChange: currentOrPastDateUI({
    title: 'Effective date of enrollment change',
    hint:
      'Enter the date this enrollment change took effect at your institution. For a withdrawal or termination, this is the official date the student\'s enrollment ended, as recorded in your institution\'s records.',
    errorMessages: {
      required: 'Please enter a valid effective date.',
      pattern: 'Please enter a valid effective date.',
      futureDate: 'The effective date cannot be in the future.',
    },
  }),
};

export const effectiveDateOfChangeSchema = {
  type: 'object',
  required: ['effectiveDateOfChange'],
  properties: {
    effectiveDateOfChange: currentOrPastDateSchema,
  },
};