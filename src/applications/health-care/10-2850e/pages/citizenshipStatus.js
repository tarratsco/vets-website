import {
  radioUI,
  radioSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CITIZENSHIP_LABELS = {
  'us-citizen': 'U.S. citizen',
  'us-national': 'U.S. national',
  'lawful-permanent-resident': 'Lawful permanent resident',
  'work-authorized-nonimmigrant':
    'Non-immigrant authorized to work in the U.S.',
  other: 'Other',
};

export const citizenshipStatusUiSchema = {
  citizenshipStatus: {
    'ui:title': 'Citizenship and work authorization status',
    citizenshipType: radioUI({
      title: 'What is your citizenship or work authorization status?',
      labels: CITIZENSHIP_LABELS,
      errorMessages: {
        required: 'Please select your citizenship status.',
      },
    }),
    visaType: textUI({
      title: 'Visa type',
      hint: 'For example: H-1B, J-1, TN',
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !==
          'work-authorized-nonimmigrant',
      },
    }),
    visaNumber: textUI({
      title: 'Visa number',
      'ui:options': {
        hideIf: formData =>
          formData?.citizenshipStatus?.citizenshipType !==
          'work-authorized-nonimmigrant',
      },
    }),
    workAuthorizationDocumentType: textUI({
      title: 'Work authorization document type',
      hint: 'For example: Employment Authorization Document (EAD), Green Card',
      'ui:options': {
        hideIf: formData =>
          !formData?.citizenshipStatus?.citizenshipType ||
          formData?.citizenshipStatus?.citizenshipType === 'us-citizen' ||
          formData?.citizenshipStatus?.citizenshipType === 'us-national',
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
        citizenshipType: radioSchema(Object.keys(CITIZENSHIP_LABELS)),
        visaType: { type: 'string', maxLength: 50 },
        visaNumber: { type: 'string', maxLength: 50 },
        workAuthorizationDocumentType: { type: 'string', maxLength: 100 },
      },
    },
  },
};