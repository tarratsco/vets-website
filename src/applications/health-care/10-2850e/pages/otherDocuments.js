import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const otherDocumentsUiSchema = {
  otherDocuments: fileInputMultipleUI({
    title: 'Upload any additional required documents',
    hint:
      'Upload any additional documents required for your application, such as your diploma, training certificates, or work authorization documents. Accepted file types: PDF, JPG, PNG. Maximum file size: 20MB per file.',
    required: false,
    errorMessages: {
      required: 'Please upload the required document.',
    },
  }),
};

export const otherDocumentsSchema = {
  type: 'object',
  properties: {
    otherDocuments: fileInputMultipleSchema(),
  },
};