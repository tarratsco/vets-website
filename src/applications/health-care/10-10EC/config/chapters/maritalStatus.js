import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const MARITAL_STATUS_VALUES = [
  'single_with_dependent',
  'single_no_dependent',
  'married_living_with',
  'married_separate_not_institutionalized',
  'married_separate_institutionalized',
  'divorced_separated_widowed_this_year',
];

export const MARRIED_STATUSES = [
  'married_living_with',
  'married_separate_not_institutionalized',
  'married_separate_institutionalized',
];

export const maritalStatusUiSchema = {
  maritalStatus: radioUI({
    title: 'What is your current marital and dependent status?',
    hint:
      "Select only one. 'Single' includes widowed, divorced, legally separated, or never married.",
    required: () => true,
    labels: {
      single_with_dependent:
        'Single - With Dependent (Not Institutionalized)',
      single_no_dependent:
        'Single - With no dependents residing in the community',
      married_living_with:
        'Married - Living with Spouse (Not Institutionalized)',
      married_separate_not_institutionalized:
        'Married - Living Separate from Spouse (Not Institutionalized)',
      married_separate_institutionalized:
        'Married - Living Separate from Spouse (Institutionalized)',
      divorced_separated_widowed_this_year:
        'Divorced, Legally Separated, or Widowed This Year',
    },
    descriptions: {
      single_with_dependent:
        'A dependent child resides in the community and you are single, divorced, legally separated, or widowed',
      divorced_separated_widowed_this_year:
        'Select this only if the event happened after January 1 of the current year',
      married_separate_institutionalized:
        'Your spouse resides in a nursing home or hospital setting',
      married_separate_not_institutionalized:
        'Your spouse resides in the community but you live separately',
    },
    errorMessages: {
      required: 'Please select your current marital and dependent status',
    },
  }),
};

export const maritalStatusSchema = {
  type: 'object',
  required: ['maritalStatus'],
  properties: {
    maritalStatus: radioSchema(MARITAL_STATUS_VALUES),
  },
};