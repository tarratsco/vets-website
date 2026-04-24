import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const internationalMedicalSchoolUiSchema = {
  education: {
    'ui:title': 'International medical school',
    internationalMedicalSchoolGraduate: radioUI({
      title: 'Are you a graduate of an international medical school?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "Answer 'Yes' if your medical degree was awarded by a medical school located outside the United States and Canada.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
    ecfmgCertificateNumber: {
      ...textUI({
        title:
          'Educational Commission for Foreign Medical Graduates (ECFMG) certificate number',
        hint: 'Enter the certificate number exactly as it appears on your ECFMG certificate.',
        errorMessages: {
          required: 'Enter your ECFMG certificate number.',
        },
      }),
      'ui:options': {
        expandUnder: 'internationalMedicalSchoolGraduate',
        expandUnderCondition: 'Y',
      },
    },
    ecfmgCertificateDate: {
      ...currentOrPastDateUI({
        title: 'ECFMG certificate date',
        hint: 'Enter the date shown on your ECFMG certificate.',
        errorMessages: {
          required: 'Enter your ECFMG certificate date.',
          pattern: 'Enter a valid date.',
          futureDate: 'ECFMG certificate date must be in the past.',
        },
      }),
      'ui:options': {
        expandUnder: 'internationalMedicalSchoolGraduate',
        expandUnderCondition: 'Y',
      },
    },
  },
};

export const internationalMedicalSchoolSchema = {
  type: 'object',
  properties: {
    education: {
      type: 'object',
      required: ['internationalMedicalSchoolGraduate'],
      properties: {
        internationalMedicalSchoolGraduate: radioSchema(['Y', 'N']),
        ecfmgCertificateNumber: { type: 'string', maxLength: 20 },
        ecfmgCertificateDate: currentOrPastDateSchema,
      },
    },
  },
};