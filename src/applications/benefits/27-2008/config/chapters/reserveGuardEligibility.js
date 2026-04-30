import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const RESERVE_CRITERIA_LABELS = {
  retiredPayEligible:
    'The Veteran was entitled to retired pay for service in the reserves, or would have been entitled but for being under 60 years of age',
  servedFullEnlistment:
    'The Veteran served at least one full enlistment (or, as an officer, completed the period of initial obligation)',
  disabilityDischarge:
    'The Veteran was discharged for a disability incurred or aggravated in the line of duty',
  diedWhileMember:
    'The Veteran died while a member of the Selected Reserve',
};

const RESERVE_CRITERIA_KEYS = Object.keys(RESERVE_CRITERIA_LABELS);

export const reserveGuardEligibilityUiSchema = {
  eligibility: {
    reserveGuardCriteria: checkboxGroupUI({
      title:
        "Which of the following applies to the Veteran's Selected Reserve service?",
      hint:
        'Select all that apply. The Veteran must meet at least one of these criteria to be eligible for a burial flag through Selected Reserve service, per Section C(2) and C(3) of VA Form 27-2008 instructions.',
      required: false,
      labels: RESERVE_CRITERIA_LABELS,
      errorMessages: {
        required:
          "Please select at least one criterion that applies to the Veteran's Selected Reserve service.",
      },
    }),
  },
};

export const reserveGuardEligibilitySchema = {
  type: 'object',
  properties: {
    eligibility: {
      type: 'object',
      properties: {
        reserveGuardCriteria: checkboxGroupSchema(RESERVE_CRITERIA_KEYS),
      },
    },
  },
};