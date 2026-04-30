import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { validateDateRange } from 'platform/forms-system/src/js/validation';

function validateBurialAfterDeath(errors, fieldData, formData) {
  const dateOfDeath = formData?.veteranInformation?.dateOfDeath;
  const dateOfBurial = formData?.veteranInformation?.dateOfBurial;
  if (dateOfDeath && dateOfBurial && dateOfBurial < dateOfDeath) {
    errors.dateOfBurial.addError(
      'Date of burial must be on or after the date of death.',
    );
  }
}

function validateDeathAfterBirth(errors, fieldData, formData) {
  const dateOfBirth = formData?.veteranInformation?.dateOfBirth;
  const dateOfDeath = formData?.veteranInformation?.dateOfDeath;
  if (dateOfBirth && dateOfDeath && dateOfDeath <= dateOfBirth) {
    errors.dateOfDeath.addError(
      'Date of death must be after date of birth.',
    );
  }
}

export const veteranDatesUiSchema = {
  veteranInformation: {
    'ui:title': 'Dates of birth, death, and burial',
    'ui:validations': [validateBurialAfterDeath, validateDeathAfterBirth],
    dateOfBirth: currentOrPastDateUI({
      title: "Veteran's date of birth",
      hint: 'Format: Month Day Year.',
      errorMessages: {
        required: "Please enter the Veteran's date of birth.",
        pattern: "Please enter a valid date of birth.",
      },
    }),
    dateOfDeath: currentOrPastDateUI({
      title: "Veteran's date of death",
      hint:
        "Format: Month Day Year. This date appears on the Veteran's death certificate.",
      errorMessages: {
        required: "Please enter the Veteran's date of death.",
        pattern: "Please enter a valid date of death.",
      },
    }),
    dateOfBurial: {
      'ui:title': 'Date of burial',
      'ui:webComponentField': 'VaMemorableDateField',
      'ui:options': {
        hint:
          'Format: Month Day Year. If burial has not yet occurred, enter the scheduled burial date.',
        monthSelect: true,
      },
      'ui:errorMessages': {
        required: 'Please enter the date of burial.',
        pattern: 'Please enter a valid date of burial.',
      },
    },
  },
};

export const veteranDatesSchema = {
  type: 'object',
  required: ['veteranInformation'],
  properties: {
    veteranInformation: {
      type: 'object',
      required: ['dateOfBirth', 'dateOfDeath', 'dateOfBurial'],
      properties: {
        dateOfBirth: currentOrPastDateSchema,
        dateOfDeath: currentOrPastDateSchema,
        dateOfBurial: {
          type: 'string',
          format: 'date',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },
  },
};