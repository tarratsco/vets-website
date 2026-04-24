import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  numberUI,
  textareaUI,
  textareaSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  REASON_FOR_CHANGE_LABELS,
  REASON_FOR_CHANGE_KEYS,
  CORRECTION_ITEM_LABELS,
  CORRECTION_ITEM_KEYS,
  MITIGATING_CIRCUMSTANCES_LABELS,
  BENEFIT_CHAPTER_LABELS,
  BENEFIT_CHAPTER_KEYS,
} from '../../constants';

// ─── Type of Change ─────────────────────────────────────────────────────────

export const typeOfChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Type of enrollment change',
    typeOfChange: radioUI({
      title: 'What type of enrollment change are you reporting?',
      hint: 'Select the option that best describes what changed for this student. Your selection will determine which additional information VA needs.',
      labels: CHANGE_TYPE_LABELS,
      errorMessages: {
        required: 'Please select the type of enrollment change you are reporting.',
      },
    }),
  },
};

export const typeOfChangeSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['typeOfChange'],
      properties: {
        typeOfChange: radioSchema(CHANGE_TYPE_KEYS),
      },
    },
  },
};

// ─── Effective Date of Change ────────────────────────────────────────────────

export const effectiveDateOfChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Effective date of enrollment change',
    effectiveDateOfChange: currentOrPastDateUI({
      title: 'Effective date of enrollment change',
      hint: 'Enter the date this enrollment change took effect at your institution. This is not the date you are submitting this form.',
      errorMessages: {
        required: 'Please enter a valid effective date.',
        pattern: 'The effective date cannot be in the future.',
      },
    }),
  },
};

export const effectiveDateOfChangeSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['effectiveDateOfChange'],
      properties: {
        effectiveDateOfChange: currentOrPastDateSchema,
      },
    },
  },
};

// ─── Last Date of Attendance ─────────────────────────────────────────────────

export const lastDateOfAttendanceUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Last date of attendance',
    lastDateOfAttendance: currentOrPastDateUI({
      title: 'Last date of attendance',
      hint: 'Enter the last calendar date the student attended class or engaged in coursework. For online courses, use the last date of documented academic activity.',
      errorMessages: {
        required: "Please enter the student's last date of attendance.",
        pattern: 'The last date of attendance cannot be in the future.',
      },
    }),
  },
};

export const lastDateOfAttendanceSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['lastDateOfAttendance'],
      properties: {
        lastDateOfAttendance: currentOrPastDateSchema,
      },
    },
  },
};

// ─── Updated Enrollment Details ──────────────────────────────────────────────

export const updatedEnrollmentDetailsUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Updated enrollment details',
    updatedEnrollmentDetails: {
      'ui:title': 'New enrollment information after change',
      newCreditHours: numberUI({
        title: 'Credit hours after this change',
        hint: 'Enter the total number of credit hours the student is enrolled in after this change. This must be less than the hours originally certified.',
        min: 1,
        max: 98,
        errorMessages: {
          required: "Please enter the student's new credit hour total after this change.",
          pattern: 'New credit hours must be less than the hours originally certified.',
        },
      }),
      newEnrollmentType: selectUI({
        title: 'Enrollment status after this change',
        hint: "Select the enrollment status that reflects the student's new credit hour total.",
        labels: ENROLLMENT_TYPE_LABELS,
        errorMessages: {
          required: "Please select the student's new enrollment status.",
        },
      }),
    },
  },
};

export const updatedEnrollmentDetailsSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
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
    },
  },
};

// ─── Reason for Change ───────────────────────────────────────────────────────

export const reasonForChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Reason for enrollment change',
    reasonForChange: selectUI({
      title: 'Primary reason for this enrollment change',
      hint: 'Select the reason that best describes why this enrollment change occurred. Your answer may determine whether VA needs additional information.',
      labels: REASON_FOR_CHANGE_LABELS,
      errorMessages: {
        required: 'Please select the primary reason for this enrollment change.',
      },
    }),
  },
};

export const reasonForChangeSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['reasonForChange'],
      properties: {
        reasonForChange: selectSchema(REASON_FOR_CHANGE_KEYS),
      },
    },
  },
};

// ─── Mitigating Circumstances ────────────────────────────────────────────────

export const mitigatingCircumstancesUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Mitigating circumstances',
    mitigatingCircumstances: {
      'ui:title': 'Mitigating circumstances information',
      mitigatingCircumstancesKnown: radioUI({
        title: 'Are you aware of any mitigating circumstances that contributed to this enrollment change?',
        hint: "Mitigating circumstances are situations beyond the student's control — such as illness, a death in the family, or a military deployment — that contributed to the enrollment change.",
        labels: MITIGATING_CIRCUMSTANCES_LABELS,
        errorMessages: {
          required: 'Please indicate whether you are aware of mitigating circumstances.',
        },
      }),
      mitigatingCircumstancesNarrative: textareaUI({
        title: 'Describe the mitigating circumstances',
        hint: 'Describe what you know about the circumstances that led to this enrollment change. Include dates, events, and any documentation you have on file.',
        charcount: true,
        errorMessages: {
          required: 'Please describe the mitigating circumstances.',
        },
        'ui:required': formData =>
          formData?.enrollmentChangeDetails?.mitigatingCircumstances
            ?.mitigatingCircumstancesKnown === 'yes',
      }),
    },
  },
};

export const mitigatingCircumstancesSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['mitigatingCircumstances'],
      properties: {
        mitigatingCircumstances: {
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
        },
      },
    },
  },
};

// ─── Correction Details ──────────────────────────────────────────────────────

export const correctionDetailsUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Correction details',
    correctionDetails: {
      'ui:title': 'What are you correcting?',
      correctionItems: checkboxGroupUI({
        title: 'What information on the original VA Form 22-1999 are you correcting? (Select all that apply)',
        hint: 'Check every field that contains an error. After selecting, you will be asked to enter the correct values.',
        labels: CORRECTION_ITEM_LABELS,
        required: true,
        errorMessages: {
          required: 'Please select at least one item that is being corrected.',
        },
      }),
      correctedCreditHours: numberUI({
        title: 'Corrected credit hours',
        hint: 'Enter the correct number of credit hours that should have been reported.',
        min: 1,
        max: 99,
      }),
      correctedCertBeginDate: currentOrPastDateUI({
        title: 'Corrected certification begin date',
        hint: 'Enter the correct first day of the enrollment period.',
      }),
      correctedCertEndDate: currentOrPastDateUI({
        title: 'Corrected certification end date',
        hint: 'Enter the correct last day of the enrollment period.',
      }),
      correctedEnrollmentType: selectUI({
        title: 'Corrected enrollment status',
        hint: 'Select the correct enrollment status for this student.',
        labels: ENROLLMENT_TYPE_LABELS,
      }),
      correctedTuitionFeesAmount: numberUI({
        title: 'Corrected tuition and fees amount (in USD)',
        hint: 'Enter the correct tuition and fees amount. Applicable to Chapter 33 (Post-9/11 GI Bill) only.',
        min: 0,
      }),
      correctedStudentFirstName: {
        'ui:title': "Corrected student first name",
        'ui:options': {},
      },
      correctedStudentLastName: {
        'ui:title': "Corrected student last name",
        'ui:options': {},
      },
      correctedStudentSsn: {
        'ui:title': "Corrected student Social Security number",
        'ui:options': {
          autocomplete: 'off',
          widgetClassNames: 'dd-privacy-hidden',
        },
      },
      correctedBenefitChapter: selectUI({
        title: 'Corrected benefit chapter',
        labels: BENEFIT_CHAPTER_LABELS,
      }),
      correctionOtherDescription: textareaUI({
        title: 'Describe the other correction',
        hint: 'Explain what was incorrect and what the correct information should be.',
        charcount: true,
      }),
    },
  },
};

export const correctionDetailsSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['correctionDetails'],
      properties: {
        correctionDetails: {
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
            correctedTuitionFeesAmount: {
              type: 'number',
              minimum: 0,
            },
            correctedStudentFirstName: { type: 'string', maxLength: 50 },
            correctedStudentLastName: { type: 'string', maxLength: 60 },
            correctedStudentSsn: {
              type: 'string',
              pattern: '^\\d{9}$',
              minLength: 9,
              maxLength: 9,
            },
            correctedBenefitChapter: selectSchema(BENEFIT_CHAPTER_KEYS),
            correctionOtherDescription: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
            },
          },
        },
      },
    },
  },
};

// ─── Timeliness Acknowledgment ───────────────────────────────────────────────

export const timelinessAcknowledgmentUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Late submission explanation',
    lateSubmissionExplanation: textareaUI({
      title: 'Why is this change being reported more than 30 days after it occurred?',
      hint: "VA's standard is that enrollment changes be reported within 30 days of the effective date. Providing an explanation helps VA understand the context.",
      charcount: true,
      errorMessages: {
        required: 'Please provide an explanation for the late submission.',
      },
    }),
  },
};

export const timelinessAcknowledgmentSchema = {
  type: 'object',
  required: ['enrollmentChangeDetails'],
  properties: {
    enrollmentChangeDetails: {
      type: 'object',
      required: ['lateSubmissionExplanation'],
      properties: {
        lateSubmissionExplanation: {
          type: 'string',
          minLength: 20,
          maxLength: 1000,
        },
      },
    },
  },
};