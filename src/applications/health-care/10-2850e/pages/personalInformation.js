import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  ssnUI,
  ssnSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const suffixLabels = {
  'Jr.': 'Jr.',
  'Sr.': 'Sr.',
  II: 'II',
  III: 'III',
  IV: 'IV',
  MD: 'MD',
  DO: 'DO',
  PhD: 'PhD',
  NP: 'NP',
  CRNA: 'CRNA',
  RN: 'RN',
  DNP: 'DNP',
};

export const personalInformationUiSchema = {
  personalInformation: {
    'ui:title': 'Personal information',
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
      hint: 'Enter your middle name or initial if applicable.',
      autocomplete: 'additional-name',
    }),
    suffix: selectUI({
      title: 'Suffix',
      hint: 'Select a suffix only if it appears on your professional license or government-issued ID.',
      labels: suffixLabels,
    }),
    dateOfBirth: currentOrPastDateUI({
      title: 'Date of birth',
      hint: 'For example: January 19 1953',
      errorMessages: {
        required: 'Please enter your date of birth.',
        futureDate: 'Date of birth must be in the past.',
      },
    }),
    ssn: ssnUI(),
    cityOfBirth: textUI({
      title: 'City of birth',
    }),
    stateOrCountryOfBirth: textUI({
      title: 'State or country of birth',
      hint: 'Enter the 2-letter state abbreviation or full country name.',
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
        lastName: { type: 'string', maxLength: 50, minLength: 1 },
        firstName: { type: 'string', maxLength: 50, minLength: 1 },
        middleName: { type: 'string', maxLength: 50 },
        suffix: selectSchema(Object.keys(suffixLabels)),
        dateOfBirth: currentOrPastDateSchema,
        ssn: ssnSchema,
        cityOfBirth: { type: 'string', maxLength: 100 },
        stateOrCountryOfBirth: { type: 'string', maxLength: 100 },
      },
    },
  },
};