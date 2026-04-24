import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const BENEFIT_CHAPTER_LABELS = {
  chapter_33: 'Chapter 33 \u2014 Post-9/11 GI Bill',
  chapter_30: 'Chapter 30 \u2014 Montgomery GI Bill \u2014 Active Duty (MGIB-AD)',
  chapter_35: 'Chapter 35 \u2014 Survivors\u2019 and Dependents\u2019 Educational Assistance',
  chapter_1606: 'Chapter 1606 \u2014 Montgomery GI Bill \u2014 Selected Reserve',
  chapter_1607: 'Chapter 1607 \u2014 Reserve Educational Assistance Program (REAP)',
};

export const BENEFIT_CHAPTER_KEYS = Object.keys(BENEFIT_CHAPTER_LABELS);

export const SSN_OR_FILE_NUMBER_LABELS = {
  ssn: 'Social Security number',
  va_file_number: 'VA File Number',
};

export const studentIdentificationUiSchema = {
  studentFirstName: textUI({
    title: "Student's first name",
    hint: 'Enter the student-Veteran first name exactly as it appears on their VA education benefit application.',
    errorMessages: {
      required: "Please enter the student's first name.",
    },
  }),
  studentLastName: textUI({
    title: "Student's last name",
    hint: 'Enter the student-Veteran last name.',
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
      required: 'Please select a student identifier type.',
    },
  }),
  studentSsn: textUI({
    title: "Student's Social Security number",
    hint:
      "Enter the student's SSN as it appears on their VA education benefit application. Format: 000-00-0000.",
    inputType: 'text',
    autocomplete: 'off',
    errorMessages: {
      required: 'Please enter a valid 9-digit Social Security number.',
      pattern: 'Please enter a valid 9-digit Social Security number.',
    },
  }),
  studentVaFileNumber: textUI({
    title: "Student's VA File Number",
    hint: 'Enter the 8 or 9-digit VA File Number assigned to this student. Example: 12345678.',
    errorMessages: {
      required: "Please enter the student's VA File Number.",
      pattern: "Please enter a valid 8 or 9-digit VA File Number.",
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
    studentFirstName: {
      type: 'string',
      maxLength: 50,
    },
    studentLastName: {
      type: 'string',
      maxLength: 60,
    },
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