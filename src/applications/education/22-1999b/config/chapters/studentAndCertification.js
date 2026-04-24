import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  BENEFIT_CHAPTER_LABELS,
  BENEFIT_CHAPTER_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  SSN_OR_FILE_NUMBER_LABELS,
} from '../../constants';

// ─── Chapter 2, Page 1: Student Identification ───────────────────────────────

export const studentIdentificationUiSchema = {
  'ui:title': 'Student identification',
  studentFirstName: textUI({
    title: "Student's first name",
    errorMessages: {
      required: "Please enter the student's first name.",
    },
  }),
  studentLastName: textUI({
    title: "Student's last name",
    errorMessages: {
      required: "Please enter the student's last name.",
    },
  }),
  ssnOrFileNumberIndicator: radioUI({
    title: 'Which identifier will you use for this student?',
    hint:
      'Use the Social Security number unless the student has been assigned a separate VA File Number.',
    labels: SSN_OR_FILE_NUMBER_LABELS,
    errorMessages: {
      required: 'Please select which identifier you will use.',
    },
  }),
  studentSsn: {
    ...textUI({
      title: "Student's Social Security number",
      hint:
        "Enter the student's SSN as it appears on their VA education benefit application. Format: 000-00-0000.",
      autocomplete: 'off',
      errorMessages: {
        required: 'Please enter a valid 9-digit Social Security number.',
        pattern: 'Please enter a valid 9-digit Social Security number.',
      },
    }),
    'ui:options': {
      expandUnder: 'ssnOrFileNumberIndicator',
      expandUnderCondition: 'ssn',
      hideEmptyValueInReview: true,
    },
  },
  studentVaFileNumber: {
    ...textUI({
      title: "Student's VA File Number",
      hint: "Enter the 8 or 9-digit VA File Number assigned to this student. Example: 12345678.",
      autocomplete: 'off',
      errorMessages: {
        required: 'Please enter the VA File Number.',
        pattern:
          'Please enter a valid 8 or 9-digit VA File Number.',
      },
    }),
    'ui:options': {
      expandUnder: 'ssnOrFileNumberIndicator',
      expandUnderCondition: 'va_file_number',
      hideEmptyValueInReview: true,
    },
  },
  benefitChapter: selectUI({
    title: 'GI Bill benefit chapter',
    hint:
      "Select the GI Bill chapter under which this student's enrollment was originally certified.",
    labels: BENEFIT_CHAPTER_LABELS,
    errorMessages: {
      required: 'Please select the GI Bill benefit chapter for this student.',
    },
  }),
};

export const studentIdentificationSchema = {
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
    benefitChapter: selectSchema(BENEFIT_CHAPTER_KEYS),
  },
};

// ─── Chapter 2, Page 2: Prior Certification Reference ────────────────────────

export const priorCertificationReferenceUiSchema = {
  'ui:title': 'Prior certification reference',
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
    },
  }),
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
    hint:
      "Select the enrollment type as it appears on the original VA Form 22-1999.",
    labels: ENROLLMENT_TYPE_LABELS,
    errorMessages: {
      required: 'Please select the original enrollment type.',
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