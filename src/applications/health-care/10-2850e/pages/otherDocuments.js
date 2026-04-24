import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const otherDocumentsUiSchema = {
  otherDocuments: fileInputMultipleUI({
    title: 'Upload additional required documents',
    hint:
      'Upload any additional required documents such as your diploma, training certificates, or work authorization documents if applicable. Accepted formats: PDF, JPG, PNG. Maximum 20MB per file.',
    required: false,
    errorMessages: {},
  }),
};

export const otherDocumentsSchema = {
  type: 'object',
  properties: {
    otherDocuments: fileInputMultipleSchema(),
  },
};