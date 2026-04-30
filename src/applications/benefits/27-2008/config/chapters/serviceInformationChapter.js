import {
  checkboxGroupUI,
  checkboxGroupSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import {
  BRANCH_OF_SERVICE_LABELS,
  BRANCH_KEYS,
} from '../../constants';

function validateEntryBeforeRelease(errors, formData) {
  const entry = formData?.serviceInformation?.dateEnteredActiveDuty;
  const release = formData?.serviceInformation?.dateReleasedFromActiveDuty;
  if (entry && release && entry >= release) {
    errors.serviceInformation.dateReleasedFromActiveDuty.addError(
      'Date released from active duty must be after the date entered active duty.',
    );
  }
}

export const serviceInformationUiSchema = {
  serviceInformation: {
    'ui:title': 'Military service information',
    branchOfService: checkboxGroupUI({
      title: 'Branch of service',
      hint:
        "Check all that apply. Select 'Selected Reserve' if the Veteran served in the Army National Guard, Air National Guard, Army Reserve, Naval Reserve, Marine Corps Reserve, Air Force Reserve, or Coast Guard Reserve.",
      required: true,
      labels: BRANCH_OF_SERVICE_LABELS,
      errorMessages: {
        required: 'Please select at least one branch of service.',
      },
    }),
    dateEnteredActiveDuty: currentOrPastDateUI({
      title:
        'Date the Veteran entered active duty (or Selected Reserve)',
      hint:
        "Format: Month Day Year. Enter the date shown on the Veteran's DD Form 214 or other discharge documents.",
      errorMessages: {
        required:
          'Please enter a valid date the Veteran entered active duty.',
        pattern:
          'Please enter a valid date the Veteran entered active duty.',
      },
    }),
    dateReleasedFromActiveDuty: currentOrPastDateUI({
      title:
        'Date the Veteran was released from active duty (or Selected Reserve)',
      hint:
        'Format: Month Day Year. If the Veteran died while on active duty, enter the date of death here.',
      errorMessages: {
        required:
          'Please enter a valid date the Veteran was released from active duty.',
        pattern:
          'Please enter a valid date the Veteran was released from active duty.',
      },
    }),
  },
  'ui:validations': [validateEntryBeforeRelease],
};

export const serviceInformationSchema = {
  type: 'object',
  required: ['serviceInformation'],
  properties: {
    serviceInformation: {
      type: 'object',
      required: [
        'branchOfService',
        'dateEnteredActiveDuty',
        'dateReleasedFromActiveDuty',
      ],
      properties: {
        branchOfService: checkboxGroupSchema(BRANCH_KEYS),
        dateEnteredActiveDuty: currentOrPastDateSchema,
        dateReleasedFromActiveDuty: currentOrPastDateSchema,
      },
    },
  },
};