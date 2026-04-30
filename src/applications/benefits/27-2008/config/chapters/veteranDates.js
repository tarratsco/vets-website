import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

function validateDateOfBurialNotBeforeDeath(errors, fieldData, formData) {
  const dateOfDeath = formData?.veteranInformation?.dateOfDeath;
  const dateOfBurial = fieldData;
  if (dateOfDeath && dateOfBurial && dateOfBurial < dateOfDeath) {
    errors.addError(
      'Date of burial must be on or after the date of death.',
    );
  }
}

export const veteranDatesUiSchema = {
  veteranInformation: {
    'ui:title': 'Dates of birth, death, and burial',
    dateOfBirth: currentOrPastDateUI({
      title: "Veteran's date of birth",
      hint: 'Format: Month Day Year.',
      errorMessages: {
        required: "Please enter the Veteran's date of birth.",
        pattern: "Please enter the Veteran's date of birth.",
      },
    }),
    dateOfDeath: currentOrPastDateUI({
      title: "Veteran's date of death",
      hint:
        "Format: Month Day Year. This date appears on the Veteran's death certificate.",
      errorMessages: {
        required: "Please enter the Veteran's date of death.",
        pattern: "Please enter the Veteran's date of death.",
      },
    }),
    dateOfBurial: {
      ...currentOrPastDateUI({
        title: 'Date of burial',
        hint:
          'Format: Month Day Year. If burial has not yet occurred, enter the scheduled burial date.',
        errorMessages: {
          required: 'Please enter the date of burial.',
          pattern: 'Please enter the date of burial.',
        },
      }),
      'ui:validations': [validateDateOfBurialNotBeforeDeath],
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
        dateOfBurial: currentOrPastDateSchema,
      },
    },
  },
};