import {
  checkboxGroupUI,
  checkboxGroupSchema,
  textUI,
  textSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  CORRECTION_ITEM_LABELS,
  CORRECTION_ITEM_KEYS,
  ENROLLMENT_TYPE_LABELS,
  ENROLLMENT_TYPE_KEYS,
  BENEFIT_CHAPTER_LABELS,
  BENEFIT_CHAPTER_KEYS,
} from '../../constants';

const validateCorrectionItems = (errors, value) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    errors.addError(
      'Please select at least one item that needs to be corrected.',
    );
  }
};

const validateOtherDescription = (errors, value, formData) => {
  const items =
    (formData &&
      formData.correctionDetails &&
      formData.correctionDetails.correctionItems) ||
    [];
  if (
    items.includes('other') &&
    (!value || value.trim().length < 10)
  ) {
    errors.addError(
      'Please describe the other correction (minimum 10 characters).',
    );
  }
};

export const correctionDetailsUiSchema = {
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
          'Please select at least one item that needs to be corrected.',
      },
      'ui:validations': [validateCorrectionItems],
    }),
    correctedCreditHours: {
      'ui:title': 'Corrected credit hours',
      'ui:widget': 'va-number-input',
      'ui:options': {
        hint: 'Enter the correct number of credit hours.',
        min: 1,
        max: 99,
        step: 1,
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('credit_hours'),
      },
      'ui:errorMessages': {
        required: 'Please enter the corrected credit hours.',
      },
    },
    correctedCertBeginDate: {
      ...currentOrPastDateUI({
        title: 'Corrected certification begin date',
        hint:
          'Enter the corrected first day of the enrollment period.',
        errorMessages: {
          required: 'Please enter the corrected begin date.',
          pattern: 'Please enter a valid corrected begin date.',
          futureDate: 'The corrected begin date cannot be in the future.',
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('enrollment_dates'),
      },
    },
    correctedCertEndDate: {
      ...currentOrPastDateUI({
        title: 'Corrected certification end date',
        hint:
          'Enter the corrected last day of the enrollment period.',
        errorMessages: {
          required: 'Please enter the corrected end date.',
          pattern: 'Please enter a valid corrected end date.',
          futureDate: 'The corrected end date cannot be in the future.',
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('enrollment_dates'),
      },
    },
    correctedEnrollmentType: {
      ...selectUI({
        title: 'Corrected enrollment status',
        labels: ENROLLMENT_TYPE_LABELS,
        errorMessages: {
          required: 'Please select the corrected enrollment status.',
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('enrollment_type'),
      },
    },
    correctedStudentFirstName: {
      ...textUI({
        title: 'Corrected student first name',
        errorMessages: {
          required: "Please enter the student's corrected first name.",
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('student_identity'),
      },
    },
    correctedStudentLastName: {
      ...textUI({
        title: 'Corrected student last name',
        errorMessages: {
          required: "Please enter the student's corrected last name.",
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('student_identity'),
      },
    },
    correctedStudentSsn: {
      ...textUI({
        title: 'Corrected student Social Security number',
        hint: 'Enter the correct 9-digit SSN.',
        inputType: 'password',
        errorMessages: {
          required: "Please enter the student's corrected SSN.",
          pattern: 'Please enter a valid 9-digit SSN.',
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('student_identity'),
      },
    },
    correctedBenefitChapter: {
      ...selectUI({
        title: 'Corrected benefit chapter',
        labels: BENEFIT_CHAPTER_LABELS,
        errorMessages: {
          required: 'Please select the corrected benefit chapter.',
        },
      }),
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('benefit_chapter'),
      },
    },
    correctedTuitionFeesAmount: {
      'ui:title': 'Corrected tuition and fees amount (in USD)',
      'ui:widget': 'va-number-input',
      'ui:options': {
        hint: 'Enter the corrected tuition and fees amount in U.S. dollars.',
        min: 0,
        step: 0.01,
        expandUnder: 'correctionItems',
        expandUnderCondition: (items, formData) =>
          Array.isArray(items) &&
          items.includes('tuition_fees') &&
          formData &&
          formData.studentAndPriorCertification &&
          formData.studentAndPriorCertification.benefitChapter ===
            'chapter_33',
      },
      'ui:errorMessages': {
        required: 'Please enter the corrected tuition and fees amount.',
      },
    },
    correctionOtherDescription: {
      ...textareaUI({
        title: 'Describe the other correction',
        hint:
          'Explain what was incorrect and what the correct information should be.',
        charcount: true,
        errorMessages: {
          required: 'Please describe the other correction.',
        },
      }),
      'ui:validations': [validateOtherDescription],
      'ui:options': {
        expandUnder: 'correctionItems',
        expandUnderCondition: items =>
          Array.isArray(items) && items.includes('other'),
      },
    },
  },
};

export const correctionDetailsSchema = {
  type: 'object',
  required: ['correctionDetails'],
  properties: {
    correctionDetails: {
      type: 'object',
      required: ['correctionItems'],
      properties: {
        correctionItems: checkboxGroupSchema(CORRECTION_ITEM_KEYS),
        correctedCreditHours: { type: 'integer', minimum: 1, maximum: 99 },
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
        correctedBenefitChapter: selectSchema(BENEFIT_CHAPTER_KEYS),
        correctedTuitionFeesAmount: { type: 'number', minimum: 0 },
        correctionOtherDescription: {
          type: 'string',
          minLength: 10,
          maxLength: 1000,
        },
      },
    },
  },
};