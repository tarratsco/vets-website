import { checkboxUI } from 'platform/forms-system/src/js/web-component-patterns';

function validateCertification(errors, value) {
  if (!value) {
    errors.addError(
      'You must certify that your information is correct before submitting.',
    );
  }
}

export const certificationUiSchema = {
  certificationAttestation: {
    ...checkboxUI({
      title:
        'I certify that the information I\'ve provided is true and correct to the best of my knowledge and belief.',
      required: formData => !formData.certificationAttestation,
      errorMessages: {
        required:
          'You must certify that your information is correct before continuing.',
      },
    }),
    'ui:validations': [validateCertification],
  },
};

export const certificationSchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    certificationAttestation: {
      type: 'boolean',
    },
  },
};