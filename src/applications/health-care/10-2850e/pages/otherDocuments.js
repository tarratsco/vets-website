import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const otherDocumentsUiSchema = {
  supportingDocuments: {
    otherDocuments: fileInputMultipleUI({
      title: 'Upload any additional required documents',
      hint: 'Upload any additional required documents such as your diploma, training certificates, or work authorization documents. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB.',
      required: false,
      errorMessages: {
        required: 'Please upload a document.',
      },
    }),
  },
};

export const otherDocumentsSchema = {
  type: 'object',
  properties: {
    supportingDocuments: {
      type: 'object',
      properties: {
        otherDocuments: fileInputMultipleSchema(),
      },
    },
  },
};