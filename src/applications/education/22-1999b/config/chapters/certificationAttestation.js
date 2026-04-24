import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ATTESTATION_LABELS = {
  scoCertificationAttested:
    'I certify that, to the best of my knowledge, the information I have provided on this enrollment change certification is true and complete. I understand that any false statement may be punishable by fine or imprisonment under applicable Federal law.',
};

const ATTESTATION_KEYS = Object.keys(ATTESTATION_LABELS);

const validateAttestation = (errors, value) => {
  if (!Array.isArray(value) || !value.includes('scoCertificationAttested')) {
    errors.addError(
      'You must certify the accuracy of this information before submitting.',
    );
  }
};

export const certificationAttestationUiSchema = {
  certificationAttestation: checkboxGroupUI({
    title: 'Certification',
    required: true,
    labels: ATTESTATION_LABELS,
    errorMessages: {
      required:
        'You must certify the accuracy of this information before submitting.',
    },
    'ui:validations': [validateAttestation],
  }),
};

export const certificationAttestationSchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    certificationAttestation: checkboxGroupSchema(ATTESTATION_KEYS),
  },
};