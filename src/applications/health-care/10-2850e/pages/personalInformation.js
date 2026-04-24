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

const SUFFIX_OPTIONS = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'MD', 'DO', 'PhD', 'NP', 'CRNA', 'RN', 'DNP'];

export const personalInformationUiSchema = {
  personalInformation: {
    'ui:title': 'Personal information',
    lastName: textUI({
      title: 'Last name',
      hint: 'Enter your legal last name as it appears on your government-issued ID.',
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
        lastName: { type: 'string', maxLength: 50, minLength: 1 },
        firstName: { type: 'string', maxLength: 50, minLength: 1 },
        middleName: { type: 'string', maxLength: 50 },
        suffix: selectSchema(SUFFIX_OPTIONS),
        dateOfBirth: currentOrPastDateSchema,
        ssn: ssnSchema,
        cityOfBirth: { type: 'string', maxLength: 100 },
        stateOrCountryOfBirth: { type: 'string', maxLength: 100 },
      },
    },
  },
};