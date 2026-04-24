import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const boardCertDocumentsUiSchema = {
  supportingDocuments: {
    boardCertificationDocuments: fileInputMultipleUI({
      title: 'Upload your board certification certificates',
      hint: 'Upload a copy of each board certification certificate you listed in the Licensure section. Accepted formats: PDF, JPG, PNG. Maximum file size: 20MB per file.',
      required: true,
      errorMessages: {
        required: 'Please upload your board certification documents.',
      },
    }),
  },
};

export const boardCertDocumentsSchema = {
  type: 'object',
  required: ['supportingDocuments'],
  properties: {
    supportingDocuments: {
      type: 'object',
      required: ['boardCertificationDocuments'],
      properties: {
        boardCertificationDocuments: fileInputMultipleSchema(),
      },
    },
  },
};