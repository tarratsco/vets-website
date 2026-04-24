import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseLicenseExplanationUiSchema = {
  licensesAndCredentials: {
    'ui:title': 'Adverse licensure or privilege history explanation',
    licenseAdverseExplanation: textareaUI({
      title:
        'Explain the details of the license, certification, registration, or clinical privilege action',
      hint:
        'Provide a complete explanation including: which license or privilege was affected, the date and reason for the action, the jurisdiction or institution involved, the current status of the matter, and your account of what occurred. Indicate the item number (16 or 17) you are addressing at the start of your explanation.',
      charcount: true,
      errorMessages: {
        required: 'Provide an explanation.',
        minLength:
          'Your explanation must be at least 50 characters to prevent incomplete entries.',
      },
    }),
  },
};

export const adverseLicenseExplanationSchema = {
  type: 'object',
  properties: {
    licensesAndCredentials: {
      type: 'object',
      required: ['licenseAdverseExplanation'],
      properties: {
        licenseAdverseExplanation: {
          type: 'string',
          minLength: 50,
          maxLength: 4000,
        },
      },
    },
  },
};