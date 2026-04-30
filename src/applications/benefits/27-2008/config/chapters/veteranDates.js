import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

function validateVeteranDates(errors, formData) {
  const dob = formData?.veteranInformation?.dateOfBirth;
  const dod = formData?.veteranInformation?.dateOfDeath;
  const dob2 = formData?.veteranInformation?.dateOfBurial;

  if (dob && dod && dob >= dod) {
    errors.veteranInformation.dateOfDeath.addError(
      "Date of death must be after the Veteran's date of birth.",
    );
  }
  if (dod && dob2 && dod > dob2) {
    errors.veteranInformation.dateOfBurial.addError(
      'Date of burial must be on or after the date of death.',
    );
  }
}

export const veteranDatesUiSchema = {
  veteranInformation: {
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
      'ui:webComponentField': VaMemorableDateField,
      'ui:options': {
        hint:
          'Format: Month Day Year. If burial has not yet occurred, enter the scheduled burial date.',
      },
      'ui:errorMessages': {
        required: 'Please enter the date of burial.',
        pattern: 'Please enter a valid date of burial.',
      },
    },
  },
  'ui:validations': [validateVeteranDates],
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