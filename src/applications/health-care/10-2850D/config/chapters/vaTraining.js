import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

const STATE_OPTIONS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
];

const STATE_LABELS = STATE_OPTIONS.reduce((acc, s) => {
  acc[s] = s;
  return acc;
}, {});

function validateEndDateAfterStartDate(errors, fieldData, formData) {
  const startDate = formData?.applicantInformation?.vaTrainingStartDate;
  const endDate = fieldData;
  if (startDate && endDate && endDate < startDate) {
    errors.addError(
      'Training end date must be on or after the training start date.',
    );
  }
}

export const vaTrainingUiSchema = {
  applicantInformation: {
    'ui:title': 'VA training information',
    vaTrainingFacilityCity: textUI({
      title: 'VA training facility city',
      hint: 'Enter the city of your VA training facility.',
      errorMessages: {
        required: 'Enter your VA training facility city.',
      },
    }),
    vaTrainingFacilityState: selectUI({
      title: 'VA training facility state',
      labels: STATE_LABELS,
      errorMessages: {
        required: 'Select your VA training facility state.',
      },
    }),
    vaTrainingStartDate: {
      'ui:title': 'VA training start date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint: 'Enter the month, day, and year (for example: July 01 2025).',
      },
      'ui:errorMessages': {
        required: 'Enter your VA training start date.',
        pattern: 'Enter a valid VA training start date.',
      },
    },
    vaTrainingEndDate: {
      'ui:title': 'VA training end date',
      'ui:webComponentField': VaMemorableDateField,
      'ui:validations': [validateEndDateAfterStartDate],
      'ui:options': {
        hint: 'Enter the month, day, and year (for example: June 30 2026).',
      },
      'ui:errorMessages': {
        required: 'Enter your VA training end date.',
        pattern: 'Enter a valid VA training end date.',
      },
    },
    everEmployedOrAffiliatedWithVaOrFederal: radioUI({
      title:
        'Have you ever been employed or affiliated with VA or another federal agency, including DOD?',
      labels: { Y: 'Yes', N: 'No' },
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
  },
};

export const vaTrainingSchema = {
  type: 'object',
  properties: {
    applicantInformation: {
      type: 'object',
      required: [
        'vaTrainingFacilityCity',
        'vaTrainingFacilityState',
        'vaTrainingStartDate',
        'vaTrainingEndDate',
        'everEmployedOrAffiliatedWithVaOrFederal',
      ],
      properties: {
        vaTrainingFacilityCity: { type: 'string', minLength: 1, maxLength: 100 },
        vaTrainingFacilityState: { type: 'string', enum: STATE_OPTIONS },
        vaTrainingStartDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        vaTrainingEndDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        everEmployedOrAffiliatedWithVaOrFederal: radioSchema(['Y', 'N']),
      },
    },
  },
};