import {
  yesNoUI,
  yesNoSchema,
  fileInputMultipleUI,
  fileInputMultipleSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png';
const MAX_FILE_SIZE_MB = 25;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const insuranceInformationUiSchema = {
  hasCurrentInsurance: yesNoUI({
    title: 'Do you have current health insurance?',
    hint:
      'Include coverage through your spouse. Having insurance may reduce your copayment responsibility.',
    required: () => true,
    errorMessages: {
      required: 'Please select Yes or No',
    },
  }),
  insuranceCardUploads: fileInputMultipleUI({
    title: 'Upload copies of all insurance cards covering you',
    hint:
      'Include any coverage through your spouse. Accepted file types: PDF, JPG, PNG. Maximum file size: 25MB per file.',
    required: formData => formData.hasCurrentInsurance === true,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE_BYTES,
    errorMessages: {
      required: 'Please upload at least one insurance card.',
    },
    hideIf: formData => formData.hasCurrentInsurance !== true,
  }),
  medicareCardUpload: fileInputUI({
    title: 'Upload a copy of your Medicare card (Parts A and B)',
    hint:
      'If you have Medicare Parts A and B, upload your Medicare card. If you don\'t have Medicare, leave this blank.',
    required: false,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE_BYTES,
    errorMessages: {
      required: 'Please upload your Medicare card.',
    },
    hideIf: formData => formData.hasCurrentInsurance !== true,
  }),
  medicaidCardUpload: fileInputUI({
    title: 'Upload a copy of your Medicaid card',
    hint:
      'If you have Medicaid coverage, upload your Medicaid card. If you don\'t have Medicaid, leave this blank.',
    required: false,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE_BYTES,
    errorMessages: {
      required: 'Please upload your Medicaid card.',
    },
    hideIf: formData => formData.hasCurrentInsurance !== true,
  }),
};

export const insuranceInformationSchema = {
  type: 'object',
  required: ['hasCurrentInsurance'],
  properties: {
    hasCurrentInsurance: yesNoSchema,
    insuranceCardUploads: fileInputMultipleSchema(),
    medicareCardUpload: fileInputSchema(),
    medicaidCardUpload: fileInputSchema(),
  },
};