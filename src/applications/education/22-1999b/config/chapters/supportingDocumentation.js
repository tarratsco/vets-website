import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Chapter 4: Supporting Documentation ─────────────────────────────────────

export const supportingDocumentationUiSchema = {
  supportingDocumentation: {
    'ui:title': 'Supporting documentation',
    supportingDocumentIds: fileInputUI({
      title: 'Upload supporting documentation',
      hint:
        'Accepted file types: PDF, JPG, PNG. Maximum file size: 25 MB per file. You may upload up to 3 files. Examples of supporting documents: official withdrawal notice, medical documentation, deployment orders, academic records, correction explanation from registrar.',
      required: false,
      errorMessages: {
        required:
          'When correcting a previous certification, please upload at least one supporting document.',
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