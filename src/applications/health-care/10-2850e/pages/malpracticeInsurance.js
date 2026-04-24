import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeInsuranceUiSchema = {
  malpracticeInsuranceCertificate: fileInputUI({
    title: 'Upload your current malpractice insurance certificate',
    hint:
      'Upload a copy of your current professional malpractice insurance certificate. Accepted file types: PDF, JPG, PNG. Maximum file size: 20MB.',
    required: true,
    errorMessages: {
      required: 'Please upload your malpractice insurance certificate.',
    },
  }),
};

export const malpracticeInsuranceSchema = {
  type: 'object',
  required: ['malpracticeInsuranceCertificate'],
  properties: {
    malpracticeInsuranceCertificate: fileInputSchema(),
  },
};