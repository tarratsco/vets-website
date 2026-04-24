import {
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { REASON_FOR_CHANGE_LABELS, REASON_FOR_CHANGE_KEYS } from '../../constants';

export const reasonForChangeUiSchema = {
  reasonForChange: selectUI({
    title: 'Primary reason for this enrollment change',
    hint:
      'Select the reason that best describes why this enrollment change occurred. If more than one reason applies, select the primary reason.',
    labels: REASON_FOR_CHANGE_LABELS,
    errorMessages: {
      required:
        'Please select the primary reason for this enrollment change.',
    },
  }),
};

export const reasonForChangeSchema = {
  type: 'object',
  required: ['reasonForChange'],
  properties: {
    reasonForChange: selectSchema(REASON_FOR_CHANGE_KEYS),
  },
};