import {
  textUI,
  textSchema,
  numberUI,
  numberSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

const trainingItemUiSchema = {
  institutionName: textUI({
    title: 'Name of hospital or institution',
    hint: 'Enter the full name of the hospital or institution where you completed or are completing this training.',
    errorMessages: {
      required: 'Enter the name of the hospital or institution.',
    },
  }),
  city: textUI({
    title: 'City',
    errorMessages: {
      required: 'Enter the city.',
    },
  }),
  stateOrCountry: textUI({
    title: 'State or country',
  }),
  specialty: textUI({
    title: 'Specialty',
    hint:
      'Enter the specialty or subspecialty (for example: Internal Medicine, Clinical Psychology, Clinical Pharmacy).',
    errorMessages: {
      required: 'Enter the specialty.',
    },
  }),
  startDate: {
    'ui:title': 'Start date',
    'ui:webComponentField': VaMemorableDateField,
    'ui:options': {
      hint: 'Enter the month, day, and year you started this training.',
    },
    'ui:errorMessages': {
      required: 'Enter the start date.',
      pattern: 'Enter a valid start date.',
    },
  },
  completionDate: {
    'ui:title': 'Completion date or expected completion date',
    'ui:webComponentField': VaMemorableDateField,
    'ui:options': {
      hint: 'Enter the actual or expected completion date.',
    },
    'ui:errorMessages': {
      required: 'Enter the completion date or expected completion date.',
      pattern: 'Enter a valid date.',
    },
  },
  monthsCompleted: numberUI({
    title: 'Number of months completed',
    hint:
      'Enter the number of months you have completed in this program. If still in progress, enter the months completed to date.',
    min: 0,
    max: 120,
    errorMessages: {
      required: 'Enter the number of months completed.',
    },
  }),
};

const trainingItemSchema = {
  type: 'object',
  required: [
    'institutionName',
    'city',
    'specialty',
    'startDate',
    'completionDate',
    'monthsCompleted',
  ],
  properties: {
    institutionName: { type: 'string', minLength: 1, maxLength: 200 },
    city: { type: 'string', minLength: 1, maxLength: 100 },
    stateOrCountry: { type: 'string', maxLength: 100 },
    specialty: { type: 'string', minLength: 1, maxLength: 100 },
    startDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    completionDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    monthsCompleted: { type: 'integer', minimum: 0, maximum: 120 },
  },
};

export const trainingHistoryUiSchema = {
  trainingHistory: {
    'ui:title': 'Internship, residency, and fellowship history',
    trainingHistory: {
      'ui:options': {
        itemName: 'Training entry',
        viewField: ({ formData }) =>
          formData.institutionName || 'Training entry',
        keepInPageOnReview: true,
        useDlWrap: false,
      },
      items: trainingItemUiSchema,
    },
  },
};

export const trainingHistorySchema = {
  type: 'object',
  properties: {
    trainingHistory: {
      type: 'object',
      properties: {
        trainingHistory: {
          type: 'array',
          minItems: 0,
          items: trainingItemSchema,
        },
      },
    },
  },
};