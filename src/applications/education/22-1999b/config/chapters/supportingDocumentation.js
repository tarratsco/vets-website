import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const supportingDocumentationUiSchema = {
  supportingDocumentation: {
    supportingDocumentIds: fileInputUI({
      title: 'Upload supporting documentation',
      hint:
        'Accepted file types: PDF, JPG, PNG. Maximum file size: 25 MB per file. You may upload up to 3 files. Examples: official withdrawal notice, medical documentation, deployment orders, or correction explanation from registrar.',
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
        supportingDocumentIds: fileInputSchema(),
      },
    },
  },
};