import {
  textUI,
  textSchema,
  textareaUI,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  TYPE_OF_CHANGE_LABELS,
  TYPE_OF_CHANGE_KEYS,
  REASON_FOR_CHANGE_LABELS,
  REASON_FOR_CHANGE_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  CORRECTION_ITEM_LABELS,
  CORRECTION_ITEM_KEYS,
} from '../../constants';

// ─── Chapter 3, Page 1: Type of Change ───────────────────────────────────────

export const typeOfChangeUiSchema = {
  'ui:title': 'Type of enrollment change',
  typeOfChange: radioUI({
    title: 'What type of enrollment change are you reporting?',
    hint:
      'Select the option that best describes what changed for this student. Your selection will determine which additional information VA needs.',
    labels: TYPE_OF_CHANGE_LABELS,
    errorMessages: {
      required:
        'Please select the type of enrollment change you are reporting.',
    },
  }),
};

export const typeOfChangeSchema = {
  type: 'object',
  required: ['typeOfChange'],
  properties: {
    typeOfChange: radioSchema(TYPE_OF_CHANGE_KEYS),
  },
};

// ─── Chapter 3, Page 2: Effective Date of Change ─────────────────────────────

export const effectiveDateOfChangeUiSchema = {
  'ui:title': 'Effective date of change',
  effectiveDateOfChange: currentOrPastDateUI({
    title: 'Effective date of enrollment change',
    hint:
      "Enter the date this enrollment change took effect at your institution. For a withdrawal or termination, this is the official date the student's enrollment ended, as recorded in your institution's records — not the date you are submitting this form.",
    errorMessages: {
      required: 'Please enter a valid effective date.',
      pattern: 'Please enter a valid effective date.',
      futureDate: 'The effective date cannot be in the future.',
    },
  }),
};

export const effectiveDateOfChangeSchema = {
  type: 'object',
  required: ['effectiveDateOfChange'],
  properties: {
    effectiveDateOfChange: currentOrPastDateSchema,
  },
};

// ─── Chapter 3, Page 3: Last Date of Attendance (conditional) ────────────────

export const lastDateOfAttendanceUiSchema = {
  'ui:title': 'Last date of attendance',
  lastDateOfAttendance: currentOrPastDateUI({
    title: 'Last date of attendance',
    hint:
      "Enter the last calendar date the student attended class, participated in an academic activity, or engaged in coursework at your institution. This date must be based on your institution's attendance records. For online courses, use the last date of documented academic activity (not last login date). This date affects how VA calculates the student's housing allowance.",
    errorMessages: {
      required: "Please enter the student's last date of attendance.",
      pattern: "Please enter the student's last date of attendance.",
      futureDate:
        'The last date of attendance cannot be in the future.',
    },
  }),
};

export const lastDateOfAttendanceSchema = {
  type: 'object',
  required: ['lastDateOfAttendance'],
  properties: {
    lastDateOfAttendance: currentOrPastDateSchema,
  },
};

// ─── Chapter 3, Page 4: Updated Enrollment Details (conditional) ──────────────

export const updatedEnrollmentDetailsUiSchema = {
  'ui:title': 'Updated enrollment details',
  newCreditHours: textUI({
    title: 'Credit hours after this change',
    hint:
      'Enter the total number of credit hours the student is enrolled in after this change takes effect. This should be less than the hours originally certified.',
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

// ─── Chapter 3, Page 5: Reason for Change ────────────────────────────────────

export const reasonForChangeUiSchema = {
  'ui:title': 'Reason for enrollment change',
  reasonForChange: selectUI({
    title: 'Primary reason for this enrollment change',
    hint:
      'Select the reason that best describes why this enrollment change occurred. If more than one reason applies, select the primary reason.',
    labels: REASON_FOR_CHANGE_LABELS,
    errorMessages: {
      required:
        'Please select the primary reason for this enrollment change.',
    },
  }),
};

export const reasonForChangeSchema = {
  type: 'object',
  required: ['reasonForChange'],
  properties: {
    reasonForChange: selectSchema(REASON_FOR_CHANGE_KEYS),
  },
};

// ─── Chapter 3, Page 6: Mitigating Circumstances (conditional) ───────────────

export const mitigatingCircumstancesUiSchema = {
  'ui:title': 'Mitigating circumstances',
  mitigatingCircumstancesKnown: radioUI({
    title: "Are you aware of any mitigating circumstances that contributed to this student's enrollment change?",
    hint:
      "Mitigating circumstances are situations beyond the student's control — such as illness, a death in the family, or a military deployment — that contributed to the withdrawal or enrollment change. Documenting these circumstances may protect the student from an overpayment debt under the VA's mitigating circumstances policy (38 U.S.C. § 3699).",
    labels: {
      yes: 'Yes, I am aware of mitigating circumstances',
      no: 'No, I am not aware of any mitigating circumstances',
      unknown: "I don't know if there are mitigating circumstances",
    },
    errorMessages: {
      required: 'Please indicate whether you are aware of mitigating circumstances.',
    },
  }),
  mitigatingCircumstancesNarrative: {
    ...textareaUI({
      title: 'Describe the mitigating circumstances',
      hint:
        'Describe what you know about the circumstances that led to this enrollment change. Include dates, events, and any documentation you have on file.',
      charcount: true,
      errorMessages: {
        required: 'Please describe the mitigating circumstances.',
      },
    }),
    'ui:options': {
      expandUnder: 'mitigatingCircumstancesKnown',
      expandUnderCondition: 'yes',
    },
  },
};

export const mitigatingCircumstancesSchema = {
  type: 'object',
  required: ['mitigatingCircumstancesKnown'],
  properties: {
    mitigatingCircumstancesKnown: radioSchema(['yes', 'no', 'unknown']),
    mitigatingCircumstancesNarrative: {
      type: 'string',
      minLength: 20,
      maxLength: 2000,
    },
  },
};

// ─── Chapter 3, Page 7: Correction Details (conditional) ─────────────────────

export const correctionDetailsUiSchema = {
  'ui:title': 'Correction details',
  correctionItems: checkboxGroupUI({
    title:
      'What information on the original VA Form 22-1999 are you correcting? (Select all that apply)',
    hint:
      'Check every field that contains an error. After selecting, you will be asked to enter the correct values for each field you checked.',
    required: true,
    labels: CORRECTION_ITEM_LABELS,
    errorMessages: {
      required:
        'Please select at least one item you are correcting.',
    },
  }),
  correctedCreditHours: textUI({
    title: 'Corrected credit hours',
    hint: 'Enter the correct number of credit hours.',
    inputType: 'number',
  }),
  correctedCertBeginDate: currentOrPastDateUI({
    title: 'Corrected certification begin date',
    hint: 'Enter the correct certification begin date.',
  }),
  correctedCertEndDate: currentOrPastDateUI({
    title: 'Corrected certification end date',
    hint: 'Enter the correct certification end date.',
  }),
  correctedEnrollmentType: selectUI({
    title: 'Corrected enrollment status',
    hint: 'Select the correct enrollment type.',
    labels: ENROLLMENT_TYPE_LABELS,
  }),
  correctedStudentFirstName: textUI({
    title: "Corrected student first name",
    hint: "Enter the correct first name.",
  }),
  correctedStudentLastName: textUI({
    title: "Corrected student last name",
    hint: "Enter the correct last name.",
  }),
  correctedStudentSsn: textUI({
    title: "Corrected student Social Security number",
    hint: "Enter the correct 9-digit SSN (dashes will be stripped).",
    autocomplete: 'off',
  }),
  correctedBenefitChapter: selectUI({
    title: 'Corrected benefit chapter',
    hint: 'Select the correct GI Bill benefit chapter.',
    labels: {
      chapter_33: 'Chapter 33 — Post-9/11 GI Bill',
      chapter_30: 'Chapter 30 — Montgomery GI Bill — Active Duty (MGIB-AD)',
      chapter_35:
        "Chapter 35 — Survivors' and Dependents' Educational Assistance",
      chapter_1606:
        'Chapter 1606 — Montgomery GI Bill — Selected Reserve',
      chapter_1607:
        'Chapter 1607 — Reserve Educational Assistance Program (REAP)',
    },
  }),
  correctionOtherDescription: textareaUI({
    title: 'Describe the other correction',
    hint:
      'Explain what was incorrect and what the correct information should be.',
    charcount: true,
    errorMessages: {
      required:
        'Please describe the correction when "Other" is selected.',
    },
  }),
};

export const correctionDetailsSchema = {
  type: 'object',
  required: ['correctionItems'],
  properties: {
    correctionItems: checkboxGroupSchema(CORRECTION_ITEM_KEYS),
    correctedCreditHours: {
      type: 'integer',
      minimum: 1,
      maximum: 99,
    },
    correctedCertBeginDate: currentOrPastDateSchema,
    correctedCertEndDate: currentOrPastDateSchema,
    correctedEnrollmentType: selectSchema(ENROLLMENT_TYPE_KEYS),
    correctedStudentFirstName: { type: 'string', maxLength: 50 },
    correctedStudentLastName: { type: 'string', maxLength: 60 },
    correctedStudentSsn: {
      type: 'string',
      pattern: '^\\d{9}$',
      minLength: 9,
      maxLength: 9,
    },
    correctedBenefitChapter: selectSchema([
      'chapter_33',
      'chapter_30',
      'chapter_35',
      'chapter_1606',
      'chapter_1607',
    ]),
    correctionOtherDescription: {
      type: 'string',
      minLength: 10,
      maxLength: 1000,
    },
  },
};

// ─── Chapter 3, Page 8: Timeliness Acknowledgment (conditional) ──────────────

export const timelinessAcknowledgmentUiSchema = {
  'ui:title': 'Late submission explanation',
  lateSubmissionExplanation: textareaUI({
    title:
      'Why is this change being reported more than 30 days after it occurred?',
    hint:
      "VA's standard is that enrollment changes be reported within 30 days of the effective date. Providing an explanation helps VA understand the context and is required to complete this form.",
    charcount: true,
    errorMessages: {
      required:
        'Please provide an explanation for the late submission.',
    },
  }),
};

export const timelinessAcknowledgmentSchema = {
  type: 'object',
  required: ['lateSubmissionExplanation'],
  properties: {
    lateSubmissionExplanation: {
      type: 'string',
      minLength: 20,
      maxLength: 1000,
    },
  },
};