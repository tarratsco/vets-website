import {
  checkboxGroupUI,
  checkboxGroupSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const BRANCH_LABELS = {
  army: 'Army',
  navy: 'Navy',
  airForce: 'Air Force',
  spaceForce: 'Space Force',
  marineCorps: 'Marine Corps',
  coastGuard: 'Coast Guard',
  usphs: 'USPHS (U.S. Public Health Service)',
  noaa: 'NOAA (National Oceanic and Atmospheric Administration)',
  selectedReserve: 'Selected Reserve (see eligibility note)',
  other: 'Other (see eligibility note)',
};

const BRANCH_KEYS = Object.keys(BRANCH_LABELS);

function validateServiceDates(errors, formData) {
  const entered =
    formData?.serviceInformation?.dateEnteredActiveDuty;
  const released =
    formData?.serviceInformation?.dateReleasedFromActiveDuty;

  if (entered && released && entered >= released) {
    errors.serviceInformation.dateReleasedFromActiveDuty.addError(
      'Date released from active duty must be after the date entered active duty.',
    );
  }
}

export const serviceInformationUiSchema = {
  serviceInformation: {
    branchOfService: checkboxGroupUI({
      title: 'Branch of service',
      hint:
        'Check all that apply. Select "Selected Reserve" if the Veteran served in the Army National Guard, Air National Guard, Army Reserve, Naval Reserve, Marine Corps Reserve, Air Force Reserve, or Coast Guard Reserve.',
      required: true,
      labels: BRANCH_LABELS,
      errorMessages: {
        required: 'Please select at least one branch of service.',
      },
    }),
    dateEnteredActiveDuty: {
      ...currentOrPastDateUI({
        title:
          'Date the Veteran entered active duty (or Selected Reserve)',
        hint:
          'Format: Month Day Year. Enter the date shown on the Veteran\'s DD Form 214 or other discharge documents.',
        errorMessages: {
          required:
            'Please enter a valid date the Veteran entered active duty.',
          pattern:
            'Please enter a valid date the Veteran entered active duty.',
        },
      }),
    },
    dateReleasedFromActiveDuty: {
      ...currentOrPastDateUI({
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
  },
  'ui:validations': [validateServiceDates],
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