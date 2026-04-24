import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeInsuranceUiSchema = {
  supportingDocuments: {
    malpracticeInsuranceCertificate: fileInputUI({
      title: 'Upload your current malpractice insurance certificate',
      hint: 'Upload a copy of your current professional liability (malpractice) insurance certificate. Accepted formats: PDF, JPG, PNG. Maximum file size: 20MB.',
      required: false,
      errorMessages: {
        required: 'Please upload your malpractice insurance certificate.',
      },
    }),
  },
};

export const malpracticeInsuranceSchema = {
  type: 'object',
  properties: {
    supportingDocuments: {
      type: 'object',
      properties: {
        malpracticeInsuranceCertificate: fileInputSchema(),
      },
    },
  },
};