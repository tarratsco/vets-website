import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  RESERVE_GUARD_CRITERIA_LABELS,
  RESERVE_GUARD_CRITERIA_KEYS,
} from '../../constants';

export const reserveGuardUiSchema = {
  eligibility: {
    'ui:title': 'Selected Reserve eligibility',
    reserveGuardCriteria: checkboxGroupUI({
      title:
        "Which of the following applies to the Veteran's Selected Reserve service?",
      hint:
        'Select all that apply. The Veteran must meet at least one of these criteria to be eligible for a burial flag through Selected Reserve service, per Section C(2) and C(3) of VA Form 27-2008 instructions.',
      required: false,
      labels: RESERVE_GUARD_CRITERIA_LABELS,
      errorMessages: {
        required:
          "Please select at least one criterion that applies to the Veteran's Selected Reserve service.",
      },
    }),
  },
};

export const reserveGuardSchema = {
  type: 'object',
  properties: {
    eligibility: {
      type: 'object',
      properties: {
        reserveGuardCriteria: checkboxGroupSchema(RESERVE_GUARD_CRITERIA_KEYS),
      },
    },
  },
};