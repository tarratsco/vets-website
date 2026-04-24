import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const licenseDocumentsUiSchema = {
  licenseDocuments: fileInputMultipleUI({
    title: 'Upload copies of your professional licenses',
    hint:
      'Upload a clear, readable copy of each professional license you listed. Include both sides if information appears on both sides. Accepted formats: PDF, JPG, PNG. Maximum 20MB per file.',
    required: true,
    errorMessages: {
      required: 'Please upload at least one professional license document.',
    },
  }),
};

export const licenseDocumentsSchema = {
  type: 'object',
  required: ['licenseDocuments'],
  properties: {
    licenseDocuments: fileInputMultipleSchema(),
  },
};