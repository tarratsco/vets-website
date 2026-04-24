import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import { BENEFIT_CHAPTER_LABELS, BENEFIT_CHAPTER_KEYS } from '../../constants';

export const studentIdentificationUiSchema = {
  studentAndPriorCertification: {
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
      labels: {
        ssn: 'Social Security number',
        va_file_number: 'VA File Number',
      },
      errorMessages: {
        required: 'Please select an identifier type.',
      },
    }),
    studentSsn: textUI({
      title: "Student's Social Security number",
      hint: "Enter the student's 9-digit SSN. Example: 123-45-6789.",
      inputType: 'password',
      errorMessages: {
        required: "Please enter the student's Social Security number.",
        pattern: "Please enter a valid 9-digit Social Security number.",
      },
    }),
    studentVaFileNumber: textUI({
      title: "Student's VA File Number",
      hint:
        "Enter the 8 or 9-digit VA File Number assigned to this student. Example: 12345678.",
      errorMessages: {
        required: "Please enter the student's VA File Number.",
        pattern: "Please enter a valid VA File Number (8 or 9 digits).",
      },
    }),
    benefitChapter: selectUI({
      title: 'GI Bill benefit chapter',
      hint:
        "Select the GI Bill chapter under which this student's enrollment was originally certified.",
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