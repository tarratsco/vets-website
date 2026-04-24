import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const institutionInformationUiSchema = {
  facilityCode: textUI({
    title: 'VA Facility Code',
    hint:
      'Your 8-character facility code is assigned by VA and identifies your school location. Example: 31000123.',
    errorMessages: {
      required: 'Please enter your 8-digit VA Facility Code.',
    },
  }),
  institutionName: textUI({
    title: 'Institution name',
    hint:
      'This is the name of your school as registered with VA. If this name is incorrect, contact your VA Education Liaison Representative.',
    errorMessages: {
      required: 'Please enter the institution name.',
    },
  }),
  institutionStreet: textUI({
    title: 'Street address',
    hint: 'Enter the institution\'s street address.',
  }),
  institutionCity: textUI({
    title: 'City',
  }),
  institutionState: textUI({
    title: 'State',
    hint: 'Enter the 2-letter state abbreviation. Example: VA',
    errorMessages: {
      pattern: 'Please enter a valid 2-letter state abbreviation.',
    },
  }),
  institutionZip: textUI({
    title: 'ZIP code',
    hint: 'Enter a 5-digit ZIP code. Example: 20190',
    errorMessages: {
      pattern: 'Please enter a valid 5-digit ZIP code.',
    },
  }),
};

export const institutionInformationSchema = {
  type: 'object',
  required: ['facilityCode', 'institutionName'],
  properties: {
    facilityCode: {
      type: 'string',
      pattern: '^\\d{8}$',
      minLength: 8,
      maxLength: 8,
    },
    institutionName: {
      type: 'string',
      maxLength: 100,
    },
    institutionStreet: {
      type: 'string',
      maxLength: 100,
    },
    institutionCity: {
      type: 'string',
      maxLength: 60,
    },
    institutionState: {
      type: 'string',
      pattern: '^[A-Z]{2}$',
      minLength: 2,
      maxLength: 2,
    },
    institutionZip: {
      type: 'string',
      pattern: '^\\d{5}(-\\d{4})?$',
    },
  },
};