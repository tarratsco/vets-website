import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const citizenshipStatusUiSchema = {
  citizenshipStatus: {
    'ui:title': 'Citizenship status',
    citizenshipType: radioUI({
      title: 'What is your citizenship or work authorization status?',
      labels: {
        'us-citizen': 'U.S. citizen',
        'us-national': 'U.S. national',
        'lawful-permanent-resident': 'Lawful permanent resident',
        'work-authorized-nonimmigrant': 'Work-authorized nonimmigrant',
        other: 'Other',
      },
      errorMessages: {
        required: 'Please select your citizenship status.',
      },
    }),
    visaType: textUI({
      title: 'Visa type',
      hint: 'For example: H-1B, J-1, TN',
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !== 'work-authorized-nonimmigrant' &&
          formData?.citizenshipStatus?.citizenshipType !== 'other',
      },
    }),
    visaNumber: textUI({
      title: 'Visa or work authorization number',
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !== 'work-authorized-nonimmigrant' &&
          formData?.citizenshipStatus?.citizenshipType !== 'other',
      },
    }),
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
      },
    },
  },
};