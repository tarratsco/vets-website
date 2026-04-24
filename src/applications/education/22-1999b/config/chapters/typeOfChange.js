import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { CHANGE_TYPE_LABELS, CHANGE_TYPE_KEYS } from '../../constants';

export const typeOfChangeUiSchema = {
  typeOfChange: radioUI({
    title: 'What type of enrollment change are you reporting?',
    hint:
      'Select the option that best describes what changed for this student. Your selection will determine which additional information VA needs.',
    labels: CHANGE_TYPE_LABELS,
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
    typeOfChange: radioSchema(CHANGE_TYPE_KEYS),
  },
};