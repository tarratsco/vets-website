import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const boardCertDocumentsUiSchema = {
  supportingDocuments: {
    boardCertificationDocuments: fileInputMultipleUI({
      title: 'Upload your board certification certificates',
      hint:
        'Upload a copy of each board certification certificate you listed in the Licensure section. Accepted file types: PDF, JPG, PNG. Maximum file size: 20 MB.',
      required: true,
      errorMessages: {
        required: 'Please upload at least one board certification document.',
      },
    }),
  },
};

export const boardCertDocumentsSchema = {
  type: 'object',
  properties: {
    supportingDocuments: {
      type: 'object',
      properties: {
        boardCertificationDocuments: fileInputMultipleSchema(),
      },
    },
  },
};