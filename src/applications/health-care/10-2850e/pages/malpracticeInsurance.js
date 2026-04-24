import {
  fileInputUI,
  fileInputSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeInsuranceUiSchema = {
  malpracticeInsuranceCertificate: fileInputUI({
    title: 'Upload your current malpractice insurance certificate',
    hint:
      'Upload a copy of your current malpractice insurance certificate showing coverage dates and limits. Accepted formats: PDF, JPG, PNG. Maximum 20MB.',
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