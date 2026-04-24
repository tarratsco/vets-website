import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CLAIM_TYPE_LABELS = {
  travel:
    'Travel expenses (airline, taxi, privately owned vehicle, bus, train, or other)',
  lodging: 'Lodging',
  meals: 'Meals',
  other: 'Other expenses (parking, tolls, etc.)',
};

const CLAIM_TYPE_KEYS = Object.keys(CLAIM_TYPE_LABELS);

export const claimTypeUiSchema = {
  claimType: checkboxGroupUI({
    title: 'What types of expenses are you claiming on this form?',
    hint:
      'Select all that apply. If you are claiming any travel expenses, Section III (Travel) is required.',
    required: () => true,
    labels: CLAIM_TYPE_LABELS,
    errorMessages: {
      required: 'Please select at least one type of expense you are claiming.',
    },
  }),
};

export const claimTypeSchema = {
  type: 'object',
  required: ['claimType'],
  properties: {
    claimType: checkboxGroupSchema(CLAIM_TYPE_KEYS),
  },
};