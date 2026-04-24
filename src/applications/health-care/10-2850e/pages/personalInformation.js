import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
  ssnUI,
  ssnSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const suffixOptions = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'MD', 'DO', 'PhD', 'NP', 'CRNA', 'RN', 'DNP'];

export const personalInformationUiSchema = {
  personalInformation: {
    'ui:title': 'Personal Information',
    lastName: textUI({
      title: 'Last name',
      autocomplete: 'family-name',
      errorMessages: {
        required: 'Please enter your last name.',
      },
    }),
    firstName: textUI({
      title: 'First name',
      autocomplete: 'given-name',
      errorMessages: {
        required: 'Please enter your first name.',
      },
    }),
    middleName: textUI({
      title: 'Middle name',
      hint: 'Enter your middle name, if applicable. If you have a middle initial only, enter the initial.',
      autocomplete: 'additional-name',
    }),
    suffix: selectUI({
      title: 'Suffix',
      hint: 'Select a suffix only if it appears on your professional license or government-issued ID.',
    }),
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint: 'For example: January 19 1953',
      errorMessages: {
        required: 'Please enter your date of birth.',
        futureDate: 'Date of birth cannot be in the future.',
      },
    }),
    ssn: ssnUI(),
    cityOfBirth: textUI({
      title: 'City of birth',
    }),
    stateOrCountryOfBirth: textUI({
      title: 'State or country of birth',
    }),
  },
};

export const personalInformationSchema = {
  type: 'object',
  required: ['personalInformation'],
  properties: {
    personalInformation: {
      type: 'object',
      required: ['lastName', 'firstName', 'dateOfBirth', 'ssn'],
      properties: {
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        middleName: {
          type: 'string',
          maxLength: 50,
        },
        suffix: selectSchema(suffixOptions),
        dateOfBirth: currentOrPastDateSchema,
        ssn: ssnSchema,
        cityOfBirth: {
          type: 'string',
          maxLength: 100,
        },
        stateOrCountryOfBirth: {
          type: 'string',
          maxLength: 100,
        },
      },
    },
  },
};