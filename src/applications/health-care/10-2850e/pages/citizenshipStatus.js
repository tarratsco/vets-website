import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const citizenshipStatusUiSchema = {
  citizenshipStatus: {
    'ui:title': 'Citizenship and work authorization status',
    citizenshipType: radioUI({
      title: 'What is your citizenship or work authorization status?',
      labels: {
        'us-citizen': 'U.S. Citizen',
        'us-national': 'U.S. National',
        'lawful-permanent-resident': 'Lawful Permanent Resident',
        'work-authorized-nonimmigrant':
          'Work-authorized nonimmigrant (visa holder)',
        other: 'Other',
      },
      errorMessages: {
        required: 'Please select your citizenship status.',
      },
    }),
    visaType: {
      ...textUI({
        title: 'Visa type',
        hint: 'For example: H-1B, TN, O-1',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !== 'work-authorized-nonimmigrant',
      },
    },
    visaNumber: {
      ...textUI({
        title: 'Visa number',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !== 'work-authorized-nonimmigrant',
      },
    },
    workAuthorizationDocumentType: {
      ...textUI({
        title: 'Work authorization document type',
        hint:
          'Describe the type of document that authorizes your work in the U.S.',
      }),
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !== 'work-authorized-nonimmigrant' &&
          formData?.citizenshipStatus?.citizenshipType !== 'other',
      },
    },
  },
};

export const citizenshipStatusSchema = {
  type: 'object',
  properties: {
    citizenshipStatus: {
      type: 'object',
      properties: {
        citizenshipType: radioSchema([
          'us-citizen',
          'us-national',
          'lawful-permanent-resident',
          'work-authorized-nonimmigrant',
          'other',
        ]),
        visaType: { type: 'string', maxLength: 50 },
        visaNumber: { type: 'string', maxLength: 50 },
        workAuthorizationDocumentType: { type: 'string', maxLength: 100 },
      },
    },
  },
};