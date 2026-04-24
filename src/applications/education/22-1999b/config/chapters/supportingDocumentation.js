import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Chapter 4: Supporting Documentation (conditional) ───────────────────────

export const supportingDocumentationUiSchema = {
  'ui:title': 'Supporting documentation',
  supportingDocumentIds: fileInputMultipleUI({
    label: 'Upload supporting documentation',
    hint:
      'Accepted file types: PDF, JPG, PNG. Maximum file size: 25 MB per file. You may upload up to 3 files. Examples: official withdrawal notice, medical documentation, deployment orders, correction explanation from registrar.',
    required: false,
    buttonText: 'Upload a document',
    maxItems: 3,
    accept: '.pdf,.jpg,.jpeg,.png',
    errorMessages: {
      accept:
        'This file type is not accepted. Please upload a PDF, JPG, or PNG file.',
      size: 'This file is too large. Maximum file size is 25 MB.',
      items: 'You can upload a maximum of 3 files.',
    },
  }),
};

export const supportingDocumentationSchema = {
  type: 'object',
  properties: {
    supportingDocumentIds: fileInputMultipleSchema(),
  },
};