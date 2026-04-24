import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseHistoryDocsUiSchema = {
  supportingDocuments: {
    adverseHistoryDocuments: fileInputMultipleUI({
      title: 'Upload supporting documentation for adverse history disclosures',
      hint:
        'Upload any documentation that supports or explains the adverse history items you disclosed. This may include court documents, licensing board correspondence, or letters of explanation. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB.',
      required: false,
      errorMessages: {
        required: 'Please upload at least one adverse history document.',
      },
    }),
  },
};

export const adverseHistoryDocsSchema = {
  type: 'object',
  properties: {
    supportingDocuments: {
      type: 'object',
      properties: {
        adverseHistoryDocuments: fileInputMultipleSchema(),
      },
    },
  },
};