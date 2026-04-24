import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const supportingDocumentationUiSchema = {
  supportingDocumentation: {
    'ui:title': 'Supporting documentation',
    supportingDocumentIds: fileInputMultipleUI({
      title: 'Upload supporting documentation',
      hint: 'Accepted file types: PDF, JPG, PNG. Maximum file size: 25 MB per file. You may upload up to 3 files.',
      required: false,
      errorMessages: {
        required: 'Please upload at least one supporting document.',
      },
    }),
  },
};

export const supportingDocumentationSchema = {
  type: 'object',
  properties: {
    supportingDocumentation: {
      type: 'object',
      properties: {
        supportingDocumentIds: fileInputMultipleSchema(),
      },
    },
  },
};