import {
  checkboxUI,
  checkboxSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const certificationUiSchema = {
  'ui:title': 'Certification',
  'ui:description':
    'Please read the following carefully before certifying your information.',
  certificationAttestation: checkboxUI({
    title:
      'I certify that the information I\'ve provided is true and correct to the best of my knowledge and belief.',
    errorMessages: {
      required:
        'You must certify that your information is correct before submitting.',
    },
  }),
};

export const certificationSchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    certificationAttestation: checkboxSchema,
  },
};