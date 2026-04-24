import {
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const BRANCH_OPTIONS = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Space Force',
  'Coast Guard',
  'National Guard (Army)',
  'National Guard (Air)',
];

const BRANCH_LABELS = BRANCH_OPTIONS.reduce((acc, b) => {
  acc[b] = b;
  return acc;
}, {});

export const militaryStatusUiSchema = {
  militaryStatus: {
    'ui:title': 'Military duty status',
    currentlyInUsMilitary: radioUI({
      title: 'Are you currently in the U.S. Military?',
      labels: { Y: 'Yes', N: 'No' },
      hint: "Answer 'Yes' if you are currently on active duty military status.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
    inReservesOrNationalGuard: radioUI({
      title: 'Are you currently in the Reserves or National Guard?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "Answer 'Yes' if you are in the Reserves or National Guard, even if not currently activated.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
    branchOfService: {
      ...selectUI({
        title: 'Branch of service',
        labels: BRANCH_LABELS,
        hint: 'Select the branch of service that applies to your current military affiliation.',
        errorMessages: {
          required: 'Select your branch of service.',
        },
      }),
      'ui:options': {
        ...selectUI({
          title: 'Branch of service',
          labels: BRANCH_LABELS,
        })['ui:options'],
        expandUnder: 'currentlyInUsMilitary',
        expandUnderCondition: formData =>
          formData?.militaryStatus?.currentlyInUsMilitary === 'Y' ||
          formData?.militaryStatus?.inReservesOrNationalGuard === 'Y',
      },
    },
  },
};

export const militaryStatusSchema = {
  type: 'object',
  properties: {
    militaryStatus: {
      type: 'object',
      required: ['currentlyInUsMilitary', 'inReservesOrNationalGuard'],
      properties: {
        currentlyInUsMilitary: radioSchema(['Y', 'N']),
        inReservesOrNationalGuard: radioSchema(['Y', 'N']),
        branchOfService: {
          type: 'string',
          enum: BRANCH_OPTIONS,
        },
      },
    },
  },
};