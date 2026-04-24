import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const supportingDocumentationUiSchema = {
  supportingDocumentIds: fileInputMultipleUI({
    title: 'Upload supporting documentation',
    hint:
      'Accepted file types: PDF, JPG, PNG. Maximum file size: 25 MB per file. You may upload up to 3 files. Examples of supporting documents: official withdrawal notice, medical documentation, deployment orders, academic records.',
    required: false,
    errorMessages: {
      required: 'Please upload at least one supporting document.',
    },
  }),
};

export const supportingDocumentationSchema = {
  type: 'object',
  properties: {
    supportingDocumentIds: fileInputMultipleSchema(),
  },
};