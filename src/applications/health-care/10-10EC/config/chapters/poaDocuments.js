import {
  radioUI,
  radioSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png';
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export const poaDocumentsUiSchema = {
  submitterType: radioUI({
    title: 'Who is submitting this form?',
    required: () => true,
    labels: {
      veteran: 'I am the Veteran',
      poa_representative:
        'I am submitting as an authorized Power of Attorney (POA) representative',
    },
    errorMessages: {
      required: 'Please select who is submitting this form',
    },
  }),
  poaDocumentUpload: fileInputUI({
    title: 'Upload your Power of Attorney document',
    hint:
      'Upload documentation showing you are authorized to submit on behalf of the Veteran. Accepted file types: PDF, JPG, PNG. Maximum file size: 25MB.',
    required: formData => formData.submitterType === 'poa_representative',
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE_BYTES,
    errorMessages: {
      required: 'Please upload your Power of Attorney document',
    },
    hideIf: formData => formData.submitterType !== 'poa_representative',
  }),
};

export const poaDocumentsSchema = {
  type: 'object',
  required: ['submitterType'],
  properties: {
    submitterType: radioSchema(['veteran', 'poa_representative']),
    poaDocumentUpload: fileInputSchema(),
  },
};