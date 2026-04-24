import {
  textUI,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { ENROLLMENT_TYPE_LABELS, ENROLLMENT_TYPE_KEYS } from './priorCertificationReference';

export const updatedEnrollmentDetailsUiSchema = {
  newCreditHours: textUI({
    title: 'Credit hours after this change',
    hint:
      'Enter the total number of credit hours the student is enrolled in after this change takes effect. This must be less than the hours originally certified.',
    inputType: 'number',
    errorMessages: {
      required:
        "Please enter the student's new credit hour total after this change.",
    },
  }),
  newEnrollmentType: selectUI({
    title: 'Enrollment status after this change',
    hint:
      "Select the enrollment status that reflects the student's new credit hour total. VA uses this to calculate the student's housing allowance and benefit rate.",
    labels: ENROLLMENT_TYPE_LABELS,
    errorMessages: {
      required: 'Please select the new enrollment status.',
    },
  }),
};

export const updatedEnrollmentDetailsSchema = {
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
};