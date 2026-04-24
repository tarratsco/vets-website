import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const licenseDocumentsUiSchema = {
  licenseDocuments: fileInputMultipleUI({
    title: 'Upload copies of your professional licenses',
    hint:
      'Upload a clear, readable copy of each professional license you listed in the Licensure section. Include both sides of the license if information appears on both sides. Accepted file types: PDF, JPG, PNG. Maximum file size: 20MB per file.',
    required: true,
    errorMessages: {
      required: 'Please upload at least one license document.',
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