import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const documentationCheckUiSchema = {
  eligibility: {
    'ui:title': 'Documentation and eligibility',
    documentationAvailable: radioUI({
      title:
        'Has documentation been presented or attached that shows the Veteran meets the eligibility criteria?',
      hint:
        "Documentation includes a copy of the Veteran's DD Form 214 (Certificate of Release or Discharge from Active Duty) or other official service records. See Section E of the form instructions.",
      labels: {
        Y: 'Yes \u2014 I am uploading documentation with this application',
        N: 'No \u2014 I do not have documentation available at this time',
      },
      errorMessages: {
        required: 'Please indicate whether documentation is available.',
      },
    }),
  },
};

export const documentationCheckSchema = {
  type: 'object',
  properties: {
    eligibility: {
      type: 'object',
      required: ['documentationAvailable'],
      properties: {
        documentationAvailable: {
          type: 'string',
          enum: ['Y', 'N'],
        },
      },
    },
  },
};