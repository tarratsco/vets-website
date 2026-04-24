import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { ENROLLMENT_TYPE_LABELS, ENROLLMENT_TYPE_KEYS } from '../../constants';

const validateCreditHours = (errors, value) => {
  if (value !== undefined && value !== null && value !== '') {
    const num = parseInt(value, 10);
    if (!Number.isInteger(num) || num < 1 || num > 99) {
      errors.addError(
        'Credit hours must be a whole number between 1 and 99.',
      );
    }
  }
};

export const priorCertificationReferenceUiSchema = {
  studentAndPriorCertification: {
    originalCertBeginDate: currentOrPastDateUI({
      title: 'Original certification begin date',
      hint:
        'Enter the first day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid begin date.',
        pattern: 'Please enter a valid begin date.',
        futureDate: 'The begin date cannot be in the future.',
      },
    }),
    originalCertEndDate: currentOrPastDateUI({
      title: 'Original certification end date',
      hint:
        'Enter the last day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid end date.',
        pattern: 'Please enter a valid end date.',
        futureDate: 'The end date cannot be in the future.',
      },
    }),
    originalCreditHours: {
      'ui:title': 'Credit hours originally certified',
      'ui:widget': 'va-number-input',
      'ui:options': {
        hint:
          'Enter the total number of credit hours certified on the original VA Form 22-1999 for this enrollment period.',
        min: 1,
        max: 99,
        step: 1,
      },
      'ui:validations': [validateCreditHours],
      'ui:errorMessages': {
        required:
          'Please enter the number of credit hours originally certified.',
      },
    },
    originalEnrollmentType: selectUI({
      title: 'Enrollment type at original certification',
      hint:
        "Select the enrollment status from the original VA Form 22-1999 you are amending.",
      labels: ENROLLMENT_TYPE_LABELS,
      errorMessages: {
        required: 'Please select the original enrollment type.',
      },
    }),
  },
};

export const priorCertificationReferenceSchema = {
  type: 'object',
  required: ['studentAndPriorCertification'],
  properties: {
    studentAndPriorCertification: {
      type: 'object',
      required: [
        'originalCertBeginDate',
        'originalCertEndDate',
        'originalCreditHours',
        'originalEnrollmentType',
      ],
      properties: {
        originalCertBeginDate: currentOrPastDateSchema,
        originalCertEndDate: currentOrPastDateSchema,
        originalCreditHours: {
          type: 'integer',
          minimum: 1,
          maximum: 99,
        },
        originalEnrollmentType: selectSchema(ENROLLMENT_TYPE_KEYS),
      },
    },
  },
};