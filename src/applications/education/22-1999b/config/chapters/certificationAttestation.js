import { checkboxGroupUI, checkboxGroupSchema } from 'platform/forms-system/src/js/web-component-patterns';

const ATTESTATION_LABELS = {
  scoCertificationAttested:
    'I certify that, to the best of my knowledge, the information I have provided on this enrollment change certification is true and complete. I understand that any false statement may be punishable by fine or imprisonment under applicable Federal law.',
};

const ATTESTATION_KEYS = Object.keys(ATTESTATION_LABELS);

export const certificationAttestationUiSchema = {
  certificationAttestation: checkboxGroupUI({
    title: 'Certification',
    hint: 'By checking this box and submitting this form, you are providing a legally binding electronic attestation. This is equivalent to signing the paper form.',
    labels: ATTESTATION_LABELS,
    required: true,
    errorMessages: {
      required: 'You must certify the accuracy of this information before submitting.',
    },
  }),
};

export const certificationAttestationSchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    certificationAttestation: checkboxGroupSchema(ATTESTATION_KEYS),
  },
};