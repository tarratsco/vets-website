import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

import { BENEFIT_CHAPTER_LABELS, ENROLLMENT_TYPE_LABELS } from '../../constants';

const benefitChapterKeys = Object.keys(BENEFIT_CHAPTER_LABELS);
const enrollmentTypeKeys = Object.keys(ENROLLMENT_TYPE_LABELS);

// ─── Chapter 2, Page 1: Student Identification ───────────────────────────────

export const studentIdentificationUiSchema = {
  studentAndPriorCertification: {
    'ui:title': 'Student identification',
    studentFirstName: textUI({
      title: 'Student first name',
      hint: 'Student-Veteran first name. Enter exactly as it appears on VA records.',
      errorMessages: {
        required: 'Please enter the student\'s first name.',
      },
    }),
    studentLastName: textUI({
      title: 'Student last name',
      errorMessages: {
        required: 'Please enter the student\'s last name.',
      },
    }),
    ssnOrFileNumberIndicator: radioUI({
      title: 'Which identifier will you use for this student?',
      hint:
        'Use the Social Security number unless the student has been assigned a separate VA File Number.',
      labels: {
        ssn: 'Social Security number',
        va_file_number: 'VA File Number',
      },
      errorMessages: {
        required: 'Please select an identifier type.',
      },
    }),
    studentSsn: {
      'ui:title': "Student's Social Security number",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          'Enter the student\'s SSN as it appears on their VA education benefit application. Format: 000-00-0000.',
        inputType: 'text',
        autocomplete: 'off',
        'inputmode': 'numeric',
        'data-dd-privacy': 'mask',
        expandUnder: 'ssnOrFileNumberIndicator',
        expandUnderCondition: 'ssn',
      },
      'ui:required': formData =>
        formData?.studentAndPriorCertification?.ssnOrFileNumberIndicator ===
        'ssn',
      'ui:errorMessages': {
        required: 'Please enter the student\'s 9-digit Social Security number.',
        pattern: 'Please enter a valid 9-digit Social Security number.',
      },
    },
    studentVaFileNumber: {
      'ui:title': "Student's VA File Number",
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          'Enter the 8 or 9-digit VA File Number assigned to this student. Example: 12345678.',
        inputType: 'text',
        'inputmode': 'numeric',
        expandUnder: 'ssnOrFileNumberIndicator',
        expandUnderCondition: 'va_file_number',
      },
      'ui:required': formData =>
        formData?.studentAndPriorCertification?.ssnOrFileNumberIndicator ===
        'va_file_number',
      'ui:errorMessages': {
        required: 'Please enter the student\'s VA File Number.',
        pattern: 'Please enter a valid 8 or 9-digit VA File Number.',
      },
    },
    benefitChapter: {
      'ui:title': 'GI Bill benefit chapter',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        hint:
          'Select the GI Bill chapter under which this student\'s enrollment was originally certified. If unsure, check the original VA Form 22-1999 submission or the student\'s Certificate of Eligibility.',
        labels: BENEFIT_CHAPTER_LABELS,
      },
      'ui:errorMessages': {
        required:
          'Please select the GI Bill benefit chapter for this student.',
      },
    },
  },
};

export const studentIdentificationSchema = {
  type: 'object',
  required: ['studentAndPriorCertification'],
  properties: {
    studentAndPriorCertification: {
      type: 'object',
      required: [
        'studentFirstName',
        'studentLastName',
        'ssnOrFileNumberIndicator',
        'benefitChapter',
      ],
      properties: {
        studentFirstName: { type: 'string', maxLength: 50 },
        studentLastName: { type: 'string', maxLength: 60 },
        ssnOrFileNumberIndicator: radioSchema(['ssn', 'va_file_number']),
        studentSsn: {
          type: 'string',
          pattern: '^\\d{9}$',
          minLength: 9,
          maxLength: 9,
        },
        studentVaFileNumber: {
          type: 'string',
          pattern: '^\\d{8,9}$',
          minLength: 8,
          maxLength: 9,
        },
        benefitChapter: {
          type: 'string',
          enum: benefitChapterKeys,
        },
      },
    },
  },
};

// ─── Chapter 2, Page 2: Prior Certification Reference ────────────────────────

export const priorCertificationReferenceUiSchema = {
  studentAndPriorCertification: {
    'ui:title': 'Prior certification reference',
    originalCertBeginDate: currentOrPastDateUI({
      title: 'Original certification begin date',
      hint:
        'Enter the first day of the enrollment period as it appears on the VA Form 22-1999 you are amending. Format: Month / Day / Year.',
      errorMessages: {
        required: 'Please enter a valid begin date.',
        pattern: 'Please enter a valid current or past date.',
      },
    }),
    originalCertEndDate: currentOrPastDateUI({
      title: 'Original certification end date',
      hint:
        'Enter the last day of the enrollment period as it appears on the VA Form 22-1999 you are amending. This is typically the last day of the academic term or semester.',
      errorMessages: {
        required: 'Please enter a valid end date.',
        pattern: 'Please enter a valid current or past date.',
      },
    }),
    originalCreditHours: {
      'ui:title': 'Credit hours originally certified',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          'Enter the total number of credit hours (or clock hours for non-standard programs) certified on the original VA Form 22-1999 for this enrollment period.',
        inputType: 'number',
        'inputmode': 'numeric',
      },
      'ui:errorMessages': {
        required: 'Please enter the number of credit hours certified.',
        pattern: 'Credit hours must be a whole number greater than 0.',
      },
    },
    originalEnrollmentType: {
      'ui:title': 'Enrollment type at original certification',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        hint:
          'Select the enrollment status that was reported on the original VA Form 22-1999.',
        labels: ENROLLMENT_TYPE_LABELS,
      },
      'ui:errorMessages': {
        required: 'Please select the enrollment type.',
      },
    },
    vaonceCertId: textUI({
      title: 'VAONCE certification reference ID (optional)',
      hint:
        'If you have the reference ID from the prior VAONCE certification record, enter it here to help VA match your submission. This field is optional.',
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
        originalEnrollmentType: {
          type: 'string',
          enum: enrollmentTypeKeys,
        },
        vaonceCertId: { type: 'string', maxLength: 100 },
      },
    },
  },
};