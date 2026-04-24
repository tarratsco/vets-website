import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const citizenshipStatusUiSchema = {
  citizenship: {
    'ui:title': 'Citizenship',
    citizenshipStatus: radioUI({
      title: 'Citizenship status',
      labels: {
        US_BIRTH: 'U.S. citizen by birth',
        NATURALIZED: 'Naturalized U.S. citizen',
        NOT_US: 'Not a U.S. citizen',
      },
      hint: 'Select the option that best describes your citizenship status.',
      errorMessages: {
        required: 'Select your citizenship status.',
      },
    }),
    placeOfBirth: {
      ...textUI({
        title: 'Place of birth',
        hint: 'Enter the city and country where you were born (for example: Manila, Philippines).',
        errorMessages: {
          required: 'Enter your place of birth.',
        },
      }),
      'ui:options': {
        expandUnder: 'citizenshipStatus',
        expandUnderCondition: 'NOT_US',
      },
    },
    countryOfCitizenship: textUI({
      title: 'Country of citizenship',
      hint: 'Enter the full name of the country of which you are a citizen.',
      errorMessages: {
        required: 'Enter your country of citizenship.',
      },
    }),
    visaCategory: {
      ...radioUI({
        title: 'Which of the following describes your immigration status?',
        labels: {
          IMMIGRANT: 'Immigrant visa holder',
          EXCHANGE_VISITOR: 'Exchange visitor (J-1 or J-2 visa)',
          OTHER_NONIMMIGRANT: 'Other non-immigrant visa holder (H-1B, TN, O-1, etc.)',
        },
        errorMessages: {
          required: 'Select your immigration status.',
        },
      }),
      'ui:options': {
        expandUnder: 'citizenshipStatus',
        expandUnderCondition: 'NOT_US',
      },
    },
  },
};

export const citizenshipStatusSchema = {
  type: 'object',
  properties: {
    citizenship: {
      type: 'object',
      required: ['citizenshipStatus', 'countryOfCitizenship'],
      properties: {
        citizenshipStatus: radioSchema(['US_BIRTH', 'NATURALIZED', 'NOT_US']),
        placeOfBirth: { type: 'string', maxLength: 100 },
        countryOfCitizenship: { type: 'string', minLength: 1, maxLength: 100 },
        visaCategory: radioSchema([
          'IMMIGRANT',
          'EXCHANGE_VISITOR',
          'OTHER_NONIMMIGRANT',
        ]),
      },
    },
  },
};