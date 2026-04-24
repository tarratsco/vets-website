import {
  textUI,
  textareaUI,
  textareaSchema,
  radioUI,
  radioSchema,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaSelectField from 'platform/forms-system/src/js/web-component-fields/VaSelectField';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

import {
  CHANGE_TYPE_LABELS,
  REASON_FOR_CHANGE_LABELS,
  ENROLLMENT_TYPE_LABELS,
  CORRECTION_ITEM_LABELS,
} from '../../constants';

const changeTypeKeys = Object.keys(CHANGE_TYPE_LABELS);
const reasonForChangeKeys = Object.keys(REASON_FOR_CHANGE_LABELS);
const enrollmentTypeKeys = Object.keys(ENROLLMENT_TYPE_LABELS);
const correctionItemKeys = Object.keys(CORRECTION_ITEM_LABELS);

// ─── Chapter 3, Page 1: Type of Change ────────────────────────────────────────

export const typeOfChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Enrollment change details',
    typeOfChange: radioUI({
      title: 'What type of enrollment change are you reporting?',
      hint:
        'Select the option that best describes what changed for this student. Your selection will determine which additional information VA needs.',
      labels: CHANGE_TYPE_LABELS,
      errorMessages: {
        required:
          'Please select the type of enrollment change you are reporting.',
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
        typeOfChange: {
          type: 'string',
          enum: changeTypeKeys,
        },
      },
    },
  },
};

// ─── Chapter 3, Page 2: Effective Date of Change ──────────────────────────────

export const effectiveDateOfChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Effective date of change',
    effectiveDateOfChange: currentOrPastDateUI({
      title: 'Effective date of enrollment change',
      hint:
        'Enter the date this enrollment change took effect at your institution. For a withdrawal or termination, this is the official date the student\'s enrollment ended, as recorded in your institution\'s records — not the date you are submitting this form.',
      errorMessages: {
        required: 'Please enter a valid effective date.',
        pattern: 'Please enter a valid current or past date.',
        futureDate: 'The effective date cannot be in the future.',
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

// ─── Chapter 3, Page 3: Last Date of Attendance (conditional) ─────────────────

export const lastDateOfAttendanceUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Last date of attendance',
    lastDateOfAttendance: currentOrPastDateUI({
      title: 'Last date of attendance',
      hint:
        'Enter the last calendar date the student attended class, participated in an academic activity, or engaged in coursework at your institution. This date must be based on your institution\'s attendance records. For online courses, use the last date of documented academic activity (not last login date). This date affects how VA calculates the student\'s housing allowance.',
      errorMessages: {
        required: 'Please enter the student\'s last date of attendance.',
        pattern: 'Please enter a valid current or past date.',
        futureDate: 'The last date of attendance cannot be in the future.',
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

// ─── Chapter 3, Page 4: Updated Enrollment Details (conditional) ──────────────

export const updatedEnrollmentDetailsUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Updated enrollment details',
    updatedEnrollmentDetails: {
      'ui:title': 'New enrollment information',
      newCreditHours: {
        'ui:title': 'Credit hours after this change',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint:
            'Enter the total number of credit hours the student is enrolled in after this change takes effect. This should be less than the hours originally certified.',
          inputType: 'number',
          'inputmode': 'numeric',
        },
        'ui:errorMessages': {
          required:
            "Please enter the student's new credit hour total after this change.",
          pattern:
            'New credit hours must be less than the hours originally certified. If the student has withdrawn from all courses, select Full termination of enrollment instead.',
        },
      },
      newEnrollmentType: {
        'ui:title': 'Enrollment status after this change',
        'ui:webComponentField': VaSelectField,
        'ui:options': {
          hint:
            'Select the enrollment status that reflects the student\'s new credit hour total. VA uses this to calculate the student\'s housing allowance and benefit rate.',
          labels: ENROLLMENT_TYPE_LABELS,
        },
        'ui:errorMessages': {
          required: 'Please select the new enrollment status.',
        },
      },
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
            newEnrollmentType: {
              type: 'string',
              enum: enrollmentTypeKeys,
            },
          },
        },
      },
    },
  },
};

// ─── Chapter 3, Page 5: Reason for Change ─────────────────────────────────────

export const reasonForChangeUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Reason for change',
    reasonForChange: {
      'ui:title': 'Primary reason for this enrollment change',
      'ui:webComponentField': VaSelectField,
      'ui:options': {
        hint:
          'Select the reason that best describes why this enrollment change occurred. If more than one reason applies, select the primary reason. Your answer may determine whether VA needs additional information to protect the student from an overpayment debt.',
        labels: REASON_FOR_CHANGE_LABELS,
      },
      'ui:errorMessages': {
        required:
          'Please select the primary reason for this enrollment change.',
      },
    },
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
        reasonForChange: {
          type: 'string',
          enum: reasonForChangeKeys,
        },
      },
    },
  },
};

// ─── Chapter 3, Page 6: Mitigating Circumstances (conditional) ────────────────

export const mitigatingCircumstancesUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Mitigating circumstances',
    mitigatingCircumstances: {
      mitigatingCircumstancesKnown: radioUI({
        title:
          'Are you aware of any mitigating circumstances that contributed to this student\'s enrollment change?',
        hint:
          'Mitigating circumstances are situations beyond the student\'s control — such as illness, a death in the family, or a military deployment — that contributed to the withdrawal or enrollment change. Documenting these circumstances may protect the student from an overpayment debt under the VA\'s mitigating circumstances policy (38 U.S.C. § 3699).',
        labels: {
          yes: 'Yes, I am aware of mitigating circumstances',
          no: 'No, I am not aware of any mitigating circumstances',
          unknown: 'I don\'t know if there are mitigating circumstances',
        },
        errorMessages: {
          required: 'Please select whether you are aware of mitigating circumstances.',
        },
      }),
      mitigatingCircumstancesNarrative: textareaUI({
        title: 'Describe the mitigating circumstances',
        hint:
          'Describe what you know about the circumstances that led to this student\'s enrollment change. Include dates, events, and any documentation you have on file (you may upload supporting documents on the next page). The more detail you provide, the better VA can evaluate the student\'s situation.',
        charcount: true,
        'ui:required': formData => {
          const known =
            formData?.enrollmentChangeDetails?.mitigatingCircumstances
              ?.mitigatingCircumstancesKnown;
          return known === 'yes';
        },
        errorMessages: {
          required:
            'Please describe the mitigating circumstances you are aware of.',
        },
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

// ─── Chapter 3, Page 7: Correction Details (conditional) ──────────────────────

export const correctionDetailsUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Correction details',
    correctionDetails: {
      correctionItems: checkboxGroupUI({
        title:
          'What information on the original VA Form 22-1999 are you correcting? (Select all that apply)',
        hint:
          'Check every field that contains an error. After selecting, you will be asked to enter the correct values for each field you checked.',
        required: true,
        labels: CORRECTION_ITEM_LABELS,
        errorMessages: {
          required:
            'Please select at least one item that you are correcting.',
        },
      }),
      correctedCreditHours: {
        'ui:title': 'Corrected credit hours',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint: 'Enter the correct number of credit hours.',
          inputType: 'number',
          'inputmode': 'numeric',
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('credit_hours'),
        },
        'ui:errorMessages': {
          required: 'Please enter the corrected credit hours.',
        },
      },
      correctedCertBeginDate: {
        ...currentOrPastDateUI({
          title: 'Corrected certification begin date',
          hint: 'Enter the correct begin date for the certification period.',
        }),
        'ui:options': {
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('enrollment_dates'),
        },
      },
      correctedCertEndDate: {
        ...currentOrPastDateUI({
          title: 'Corrected certification end date',
          hint:
            'Enter the correct end date for the certification period. Must be after the corrected begin date.',
        }),
        'ui:options': {
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('enrollment_dates'),
        },
      },
      correctedEnrollmentType: {
        'ui:title': 'Corrected enrollment status',
        'ui:webComponentField': VaSelectField,
        'ui:options': {
          hint: 'Select the correct enrollment status.',
          labels: ENROLLMENT_TYPE_LABELS,
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('enrollment_type'),
        },
      },
      correctedTuitionFeesAmount: {
        'ui:title': 'Corrected tuition and fees amount (USD)',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint:
            'Enter the correct tuition and fees amount. Applicable to Chapter 33 (Post-9/11 GI Bill) only.',
          inputType: 'number',
          'inputmode': 'decimal',
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('tuition_fees'),
        },
      },
      correctedStudentFirstName: textUI({
        title: 'Corrected student first name',
        hint: 'Enter the correct first name for this student.',
        expandUnder: 'correctionItems',
        expandUnderCondition: val =>
          Array.isArray(val) && val.includes('student_identity'),
      }),
      correctedStudentLastName: textUI({
        title: 'Corrected student last name',
        hint: 'Enter the correct last name for this student.',
        expandUnder: 'correctionItems',
        expandUnderCondition: val =>
          Array.isArray(val) && val.includes('student_identity'),
      }),
      correctedStudentSsn: {
        'ui:title': 'Corrected student SSN',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint:
            'Enter the correct 9-digit Social Security number (dashes stripped). Example: 123456789.',
          inputType: 'text',
          'inputmode': 'numeric',
          autocomplete: 'off',
          'data-dd-privacy': 'mask',
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('student_identity'),
        },
        'ui:errorMessages': {
          pattern: 'Please enter a valid 9-digit Social Security number.',
        },
      },
      correctedBenefitChapter: {
        'ui:title': 'Corrected benefit chapter',
        'ui:webComponentField': VaSelectField,
        'ui:options': {
          hint:
            'Select the correct GI Bill chapter. This should differ from the originally submitted chapter.',
          labels: {
            chapter_33: 'Chapter 33 — Post-9/11 GI Bill',
            chapter_30: 'Chapter 30 — Montgomery GI Bill — Active Duty',
            chapter_35:
              'Chapter 35 — Survivors\' and Dependents\' Educational Assistance',
            chapter_1606: 'Chapter 1606 — Montgomery GI Bill — Selected Reserve',
            chapter_1607:
              'Chapter 1607 — Reserve Educational Assistance Program (REAP)',
          },
          expandUnder: 'correctionItems',
          expandUnderCondition: val =>
            Array.isArray(val) && val.includes('benefit_chapter'),
        },
      },
      correctionOtherDescription: textareaUI({
        title: 'Describe the other correction',
        hint:
          'Explain what was incorrect and what the correct information should be.',
        charcount: true,
        expandUnder: 'correctionItems',
        expandUnderCondition: val =>
          Array.isArray(val) && val.includes('other'),
        'ui:required': formData => {
          const items =
            formData?.enrollmentChangeDetails?.correctionDetails
              ?.correctionItems;
          return Array.isArray(items) && items.includes('other');
        },
        errorMessages: {
          required:
            'Please describe the other correction you are making.',
        },
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
            correctionItems: checkboxGroupSchema(correctionItemKeys),
            correctedCreditHours: {
              type: 'integer',
              minimum: 1,
              maximum: 99,
            },
            correctedCertBeginDate: currentOrPastDateSchema,
            correctedCertEndDate: currentOrPastDateSchema,
            correctedEnrollmentType: {
              type: 'string',
              enum: enrollmentTypeKeys,
            },
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
            correctedBenefitChapter: {
              type: 'string',
              enum: [
                'chapter_33',
                'chapter_30',
                'chapter_35',
                'chapter_1606',
                'chapter_1607',
              ],
            },
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

// ─── Chapter 3, Page 8: Timeliness Acknowledgment (conditional) ───────────────

export const timelinessAcknowledgmentUiSchema = {
  enrollmentChangeDetails: {
    'ui:title': 'Timeliness acknowledgment',
    lateSubmissionExplanation: textareaUI({
      title:
        'Why is this change being reported more than 30 days after it occurred?',
      hint:
        'VA\'s standard is that enrollment changes be reported within 30 days of the effective date. Providing an explanation helps VA understand the context and does not prevent submission, but it is required to complete this form.',
      charcount: true,
      errorMessages: {
        required:
          'Please provide an explanation for why this change is being reported late.',
        minLength:
          'Please provide at least a brief explanation (minimum 20 characters).',
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