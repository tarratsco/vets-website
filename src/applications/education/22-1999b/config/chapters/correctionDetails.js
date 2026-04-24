import {
  checkboxGroupUI,
  checkboxGroupSchema,
  textareaUI,
  textareaSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { ENROLLMENT_TYPE_LABELS, ENROLLMENT_TYPE_KEYS } from './priorCertificationReference';
import { BENEFIT_CHAPTER_LABELS, BENEFIT_CHAPTER_KEYS } from './studentIdentification';

export const CORRECTION_ITEMS_LABELS = {
  credit_hours: 'Credit hours (originally certified hours are incorrect)',
  enrollment_dates: 'Enrollment period dates (begin or end date is incorrect)',
  enrollment_type:
    'Enrollment type (full-time/part-time status was reported incorrectly)',
  tuition_fees: 'Tuition and fees amount (if applicable)',
  student_identity: 'Student name or identification number',
  benefit_chapter: 'Benefit chapter or program',
  other: 'Other (describe below)',
};

export const CORRECTION_ITEMS_KEYS = Object.keys(CORRECTION_ITEMS_LABELS);

export const correctionDetailsUiSchema = {
  correctionItems: checkboxGroupUI({
    title:
      'What information on the original VA Form 22-1999 are you correcting? (Select all that apply)',
    hint:
      'Check every field that contains an error. After selecting, you will be asked to enter the correct values for each field you checked.',
    required: true,
    labels: CORRECTION_ITEMS_LABELS,
    errorMessages: {
      required: 'Please select at least one item you are correcting.',
    },
  }),
  correctedCreditHours: textUI({
    title: 'Corrected credit hours',
    hint: 'Enter the correct number of credit hours.',
    inputType: 'number',
  }),
  correctedCertBeginDate: {
    ...currentOrPastDateUI({
      title: 'Corrected certification begin date',
      hint: 'Enter the correct certification begin date.',
    }),
  },
  correctedCertEndDate: {
    ...currentOrPastDateUI({
      title: 'Corrected certification end date',
      hint: 'Enter the correct certification end date.',
    }),
  },
  correctedEnrollmentType: selectUI({
    title: 'Corrected enrollment status',
    hint: 'Select the correct enrollment status.',
    labels: ENROLLMENT_TYPE_LABELS,
  }),
  correctedStudentFirstName: textUI({
    title: 'Corrected student first name',
  }),
  correctedStudentLastName: textUI({
    title: 'Corrected student last name',
  }),
  correctedStudentSsn: textUI({
    title: 'Corrected student Social Security number',
    hint: 'Enter the correct 9-digit SSN, without dashes.',
    autocomplete: 'off',
  }),
  correctedBenefitChapter: selectUI({
    title: 'Corrected benefit chapter',
    hint: 'Select the correct GI Bill benefit chapter.',
    labels: BENEFIT_CHAPTER_LABELS,
  }),
  correctionOtherDescription: textareaUI({
    title: 'Describe the other correction',
    hint:
      'Explain what was incorrect and what the correct information should be.',
    charcount: true,
  }),
};

export const correctionDetailsSchema = {
  type: 'object',
  required: ['correctionItems'],
  properties: {
    correctionItems: checkboxGroupSchema(CORRECTION_ITEMS_KEYS),
    correctedCreditHours: {
      type: 'integer',
      minimum: 1,
      maximum: 99,
    },
    correctedCertBeginDate: currentOrPastDateSchema,
    correctedCertEndDate: currentOrPastDateSchema,
    correctedEnrollmentType: selectSchema(ENROLLMENT_TYPE_KEYS),
    correctedStudentFirstName: {
      type: 'string',
      maxLength: 50,
    },
    correctedStudentLastName: {
      type: 'string',
      maxLength: 60,
    },
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
};