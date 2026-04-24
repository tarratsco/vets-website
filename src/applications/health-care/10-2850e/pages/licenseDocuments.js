import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const licenseDocumentsUiSchema = {
  supportingDocuments: {
    licenseDocuments: fileInputMultipleUI({
      title: 'Upload copies of your professional licenses',
      hint: 'Upload a clear, readable copy of each professional license you listed in the Licensure section. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB.',
      required: true,
      errorMessages: {
        required: 'Please upload at least one professional license document.',
      },
    }),
  },
};

export const licenseDocumentsSchema = {
  type: 'object',
  properties: {
    supportingDocuments: {
      type: 'object',
      properties: {
        licenseDocuments: fileInputMultipleSchema(),
      },
    },
  },
};