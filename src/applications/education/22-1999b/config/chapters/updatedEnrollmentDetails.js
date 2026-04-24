import {
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { ENROLLMENT_TYPE_LABELS, ENROLLMENT_TYPE_KEYS } from '../../constants';

const validateNewCreditHours = (errors, value) => {
  if (value !== undefined && value !== null && value !== '') {
    const num = parseInt(value, 10);
    if (!Number.isInteger(num) || num < 1 || num > 98) {
      errors.addError(
        'New credit hours must be a whole number between 1 and 98.',
      );
    }
  }
};

export const updatedEnrollmentDetailsUiSchema = {
  updatedEnrollmentDetails: {
    newCreditHours: {
      'ui:title': 'Credit hours after this change',
      'ui:widget': 'va-number-input',
      'ui:options': {
        hint:
          'Enter the total number of credit hours the student is enrolled in after this change takes effect. This should be less than the credit hours originally certified.',
        min: 1,
        max: 98,
        step: 1,
      },
      'ui:validations': [validateNewCreditHours],
      'ui:errorMessages': {
        required:
          "Please enter the student's new credit hour total after this change.",
      },
    },
    newEnrollmentType: selectUI({
      title: 'Enrollment status after this change',
      hint:
        "Select the enrollment status that reflects the student's new credit hour total. VA uses this to calculate the student's housing allowance and benefit rate.",
      labels: ENROLLMENT_TYPE_LABELS,
      errorMessages: {
        required: 'Please select the new enrollment status.',
      },
    }),
  },
};

export const updatedEnrollmentDetailsSchema = {
  type: 'object',
  required: ['updatedEnrollmentDetails'],
  properties: {
    updatedEnrollmentDetails: {
      type: 'object',
      required: ['newCreditHours', 'newEnrollmentType'],
      properties: {
        newCreditHours: {
          type: 'integer',
          minimum: 1,
          maximum: 98,
        },
        newEnrollmentType: selectSchema(ENROLLMENT_TYPE_KEYS),
      },
    },
  },
};