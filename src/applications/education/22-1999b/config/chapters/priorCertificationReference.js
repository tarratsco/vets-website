import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textUI,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const ENROLLMENT_TYPE_LABELS = {
  full_time: 'Full-time',
  three_quarter_time: 'Three-quarter time',
  half_time: 'Half-time',
  less_than_half_time: 'Less than half-time',
};

export const ENROLLMENT_TYPE_KEYS = Object.keys(ENROLLMENT_TYPE_LABELS);

function validateOriginalCreditHours(errors, value) {
  if (value !== undefined && value !== null && value !== '') {
    const num = parseInt(value, 10);
    if (Number.isNaN(num) || num < 1) {
      errors.addError('Credit hours must be a whole number greater than 0.');
    }
    if (num > 99) {
      errors.addError('Credit hours must be 99 or fewer.');
    }
  }
}

export const priorCertificationReferenceUiSchema = {
  originalCertBeginDate: {
    ...currentOrPastDateUI({
      title: 'Original certification begin date',
      hint:
        'Enter the first day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid begin date.',
        pattern: 'Please enter a valid begin date.',
      },
    }),
  },
  originalCertEndDate: {
    ...currentOrPastDateUI({
      title: 'Original certification end date',
      hint:
        'Enter the last day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid end date.',
        pattern: 'Please enter a valid end date.',
      },
    }),
  },
  originalCreditHours: textUI({
    title: 'Credit hours originally certified',
    hint:
      'Enter the total number of credit hours certified on the original VA Form 22-1999 for this enrollment period.',
    inputType: 'number',
    errorMessages: {
      required: 'Please enter the number of credit hours certified.',
    },
  }),
  originalEnrollmentType: selectUI({
    title: 'Enrollment type at original certification',
    hint: 'Select the enrollment status from the original VA Form 22-1999.',
    labels: ENROLLMENT_TYPE_LABELS,
    errorMessages: {
      required: 'Please select the enrollment type.',
    },
  }),
};

export const priorCertificationReferenceSchema = {
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
};