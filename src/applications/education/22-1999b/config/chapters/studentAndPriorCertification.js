import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  numberUI,
  numberSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  BENEFIT_CHAPTER_LABELS,
  BENEFIT_CHAPTER_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  SSN_OR_FILE_NUMBER_LABELS,
} from '../../constants';

export const studentIdentificationUiSchema = {
  studentAndPriorCertification: {
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
      hint: 'Use the Social Security number unless the student has been assigned a separate VA File Number.',
      labels: SSN_OR_FILE_NUMBER_LABELS,
      errorMessages: {
        required: 'Please select an identifier type.',
      },
    }),
    studentSsn: {
      'ui:title': "Student's Social Security number",
      'ui:options': {
        hint: "Enter the student's SSN. Format: 000-00-0000.",
        inputType: 'text',
        autocomplete: 'off',
        widgetClassNames: 'dd-privacy-hidden',
      },
      'ui:errorMessages': {
        required: "Please enter the student's 9-digit Social Security number.",
        pattern: 'Please enter a valid 9-digit Social Security number.',
      },
      'ui:required': formData =>
        formData?.studentAndPriorCertification?.ssnOrFileNumberIndicator ===
        'ssn',
    },
    studentVaFileNumber: {
      'ui:title': "Student's VA File Number",
      'ui:options': {
        hint: 'Enter the 8 or 9-digit VA File Number assigned to this student. Example: 12345678.',
        expandUnder: 'ssnOrFileNumberIndicator',
        expandUnderCondition: 'va_file_number',
      },
      'ui:errorMessages': {
        required: "Please enter the student's VA File Number.",
        pattern: 'Please enter a valid 8 or 9-digit VA File Number.',
      },
      'ui:required': formData =>
        formData?.studentAndPriorCertification?.ssnOrFileNumberIndicator ===
        'va_file_number',
    },
    benefitChapter: selectUI({
      title: 'GI Bill benefit chapter',
      hint: "Select the GI Bill chapter under which this student's enrollment was originally certified.",
      labels: BENEFIT_CHAPTER_LABELS,
      errorMessages: {
        required: 'Please select the GI Bill benefit chapter for this student.',
      },
    }),
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
        benefitChapter: selectSchema(BENEFIT_CHAPTER_KEYS),
      },
    },
  },
};

export const priorCertificationReferenceUiSchema = {
  studentAndPriorCertification: {
    'ui:title': 'Prior certification reference',
    originalCertBeginDate: currentOrPastDateUI({
      title: 'Original certification begin date',
      hint: 'Enter the first day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid begin date.',
        pattern: 'Please enter a valid current or past date.',
      },
    }),
    originalCertEndDate: currentOrPastDateUI({
      title: 'Original certification end date',
      hint: 'Enter the last day of the enrollment period as it appears on the VA Form 22-1999 you are amending.',
      errorMessages: {
        required: 'Please enter a valid end date.',
        pattern: 'Please enter a valid current or past date.',
      },
    }),
    originalCreditHours: numberUI({
      title: 'Credit hours originally certified',
      hint: 'Enter the total number of credit hours certified on the original VA Form 22-1999 for this enrollment period.',
      min: 1,
      max: 99,
      errorMessages: {
        required: 'Please enter the number of credit hours certified.',
        pattern: 'Credit hours must be a whole number greater than 0.',
      },
    }),
    originalEnrollmentType: selectUI({
      title: 'Enrollment type at original certification',
      hint: 'Select the enrollment status as it appears on the original VA Form 22-1999.',
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