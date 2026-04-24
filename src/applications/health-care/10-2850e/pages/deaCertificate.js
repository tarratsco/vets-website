import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const deaCertificateUiSchema = {
  supportingDocuments: {
    deaCertificate: fileInputUI({
      title: 'Upload your DEA registration certificate',
      hint: 'Upload a copy of your current DEA registration certificate. Both the front and back must be visible. Accepted formats: PDF, JPG, PNG. Maximum file size: 20MB.',
      required: true,
      errorMessages: {
        required: 'Please upload your DEA registration certificate.',
      },
    }),
  },
};

export const deaCertificateSchema = {
  type: 'object',
  required: ['supportingDocuments'],
  properties: {
    supportingDocuments: {
      type: 'object',
      required: ['deaCertificate'],
      properties: {
        deaCertificate: fileInputSchema(),
      },
    },
  },
};