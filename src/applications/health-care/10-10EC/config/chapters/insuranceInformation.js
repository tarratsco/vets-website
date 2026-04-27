import {
  yesNoUI,
  yesNoSchema,
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const insuranceInformationUiSchema = {
  hasCurrentInsurance: yesNoUI({
    title: 'Do you have current health insurance?',
    required: () => true,
    hint:
      'Include coverage through your spouse. Having insurance may reduce your copayment responsibility.',
    errorMessages: {
      required: 'Please select Yes or No',
    },
  }),
  insuranceDocumentGuids: fileInputUI({
    title: 'Upload copies of all insurance cards covering you',
    required: formData => formData.hasCurrentInsurance === true,
    hint:
      'Include any coverage through your spouse. Accepted file types: PDF, JPG, PNG. Maximum file size: 25MB per file.',
    errorMessages: {
      required: 'Please upload at least one insurance card',
    },
  }),
  medicareDocumentGuid: fileInputUI({
    title: 'Upload a copy of your Medicare card (Parts A and B)',
    required: false,
    hint:
      'If you have Medicare Parts A and B, upload your Medicare card. If you do not have Medicare, leave this blank.',
    errorMessages: {
      required: 'Please upload your Medicare card',
    },
  }),
  medicaidDocumentGuid: fileInputUI({
    title: 'Upload a copy of your Medicaid card',
    required: false,
    hint:
      'If you have Medicaid, upload your Medicaid card. If you do not have Medicaid, leave this blank.',
    errorMessages: {
      required: 'Please upload your Medicaid card',
    },
  }),
};

export const insuranceInformationSchema = {
  type: 'object',
  required: ['hasCurrentInsurance'],
  properties: {
    hasCurrentInsurance: yesNoSchema,
    insuranceDocumentGuids: fileInputSchema(),
    medicareDocumentGuid: fileInputSchema(),
    medicaidDocumentGuid: fileInputSchema(),
  },
};