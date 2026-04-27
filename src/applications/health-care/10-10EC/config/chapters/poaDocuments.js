import {
  radioUI,
  radioSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const poaDocumentsUiSchema = {
  submitterType: radioUI({
    title: 'Are you the Veteran or an authorized POA representative?',
    required: () => true,
    labels: {
      veteran: 'I am the Veteran',
      poa_representative:
        'I am submitting as an authorized POA representative',
    },
    errorMessages: {
      required: 'Please select whether you are the Veteran or a POA representative',
    },
  }),
  poaDocumentGuid: fileInputUI({
    title: 'Upload your Power of Attorney document',
    required: formData => formData.submitterType === 'poa_representative',
    hint:
      'Upload your valid Power of Attorney documentation. Accepted file types: PDF, JPG, PNG. Maximum file size: 25MB.',
    errorMessages: {
      required: 'Please upload your Power of Attorney document',
    },
  }),
};

export const poaDocumentsSchema = {
  type: 'object',
  required: ['submitterType'],
  properties: {
    submitterType: radioSchema(['veteran', 'poa_representative']),
    poaDocumentGuid: fileInputSchema(),
  },
};