import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseHistoryDocsUiSchema = {
  adverseHistoryDocuments: fileInputMultipleUI({
    title: 'Upload supporting documentation for adverse history disclosures',
    hint:
      'Upload any documentation that supports or explains the adverse history items you disclosed. This may include court documents, licensing board correspondence, or letters of explanation. Accepted file types: PDF, JPG, PNG. Maximum file size: 20MB per file.',
    required: true,
    errorMessages: {
      required: 'Please upload at least one supporting document for your adverse history disclosure.',
    },
  }),
};

export const adverseHistoryDocsSchema = {
  type: 'object',
  required: ['adverseHistoryDocuments'],
  properties: {
    adverseHistoryDocuments: fileInputMultipleSchema(),
  },
};