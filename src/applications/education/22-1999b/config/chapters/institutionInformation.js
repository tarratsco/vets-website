import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const institutionInformationUiSchema = {
  institutionAndScoInformation: {
    facilityCode: textUI({
      title: 'VA Facility Code',
      hint:
        'Your 8-character facility code is assigned by VA and identifies your school location. Example: 31000123.',
      errorMessages: {
        required: 'Please enter your 8-digit VA Facility Code.',
        pattern: 'Please enter a valid 8-digit VA Facility Code.',
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
    institutionAddress: {
      street: textUI({
        title: 'Street address',
        errorMessages: {
          required: 'Please enter the street address.',
        },
      }),
      city: textUI({
        title: 'City',
        errorMessages: {
          required: 'Please enter the city.',
        },
      }),
      state: textUI({
        title: 'State',
        hint: 'Enter 2-letter state abbreviation. Example: VA',
        errorMessages: {
          required: 'Please enter the state.',
          pattern: 'Please enter a valid 2-letter state abbreviation.',
        },
      }),
      zip: textUI({
        title: 'ZIP code',
        hint: 'Enter 5-digit ZIP code. Example: 20190',
        errorMessages: {
          required: 'Please enter the ZIP code.',
          pattern: 'Please enter a valid ZIP code.',
        },
      }),
    },
  },
};

export const institutionInformationSchema = {
  type: 'object',
  required: ['institutionAndScoInformation'],
  properties: {
    institutionAndScoInformation: {
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
        institutionAddress: {
          type: 'object',
          properties: {
            street: { type: 'string', maxLength: 100 },
            city: { type: 'string', maxLength: 60 },
            state: {
              type: 'string',
              pattern: '^[A-Z]{2}$',
              minLength: 2,
              maxLength: 2,
            },
            zip: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
      },
    },
  },
};