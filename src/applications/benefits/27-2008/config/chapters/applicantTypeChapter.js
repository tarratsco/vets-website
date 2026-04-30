import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  APPLICANT_TYPE_LABELS,
} from '../../constants';

export const applicantTypeUiSchema = {
  applicantType: radioUI({
    title: 'Who is submitting this application?',
    hint:
      'Select the option that best describes your role. Funeral directors and authorized representatives may submit without a VA.gov account.',
    labels: APPLICANT_TYPE_LABELS,
    errorMessages: {
      required: 'Please select who is submitting this application.',
    },
  }),
};

export const applicantTypeSchema = {
  type: 'object',
  required: ['applicantType'],
  properties: {
    applicantType: radioSchema(Object.keys(APPLICANT_TYPE_LABELS)),
  },
};