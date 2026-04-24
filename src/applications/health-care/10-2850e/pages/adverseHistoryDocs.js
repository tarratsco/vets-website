import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseHistoryDocsUiSchema = {
  supportingDocuments: {
    adverseHistoryDocuments: fileInputMultipleUI({
      title: 'Upload supporting documentation for your adverse history disclosures',
      hint: 'Upload any documentation that supports or explains the adverse history items you disclosed. This may include court documents, licensing board correspondence, or letters of explanation. Accepted formats: PDF, JPG, PNG. Maximum file size: 20MB per file.',
      required: true,
      errorMessages: {
        required: 'Please upload supporting documents for your adverse history disclosures.',
      },
    }),
  },
};

export const adverseHistoryDocsSchema = {
  type: 'object',
  required: ['supportingDocuments'],
  properties: {
    supportingDocuments: {
      type: 'object',
      required: ['adverseHistoryDocuments'],
      properties: {
        adverseHistoryDocuments: fileInputMultipleSchema(),
      },
    },
  },
};