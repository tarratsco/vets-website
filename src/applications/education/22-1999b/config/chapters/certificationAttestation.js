import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Review and Submit: SCO Certification Attestation ────────────────────────

const ATTESTATION_LABELS = {
  attested:
    'I certify that, to the best of my knowledge, the information I have provided on this enrollment change certification is true and complete. I understand that any false statement may be punishable by fine or imprisonment under applicable Federal law.',
};

const ATTESTATION_KEYS = Object.keys(ATTESTATION_LABELS);

export const certificationAttestationUiSchema = {
  'ui:title': 'Certification',
  scoCertificationAttested: checkboxGroupUI({
    title: 'Please read and certify the following statement',
    hint:
      'By checking this box and submitting this form, you are providing a legally binding electronic attestation.',
    required: true,
    labels: ATTESTATION_LABELS,
    errorMessages: {
      required:
        'You must certify the accuracy of this information before submitting.',
    },
  }),
};

export const certificationAttestationSchema = {
  type: 'object',
  required: ['scoCertificationAttested'],
  properties: {
    scoCertificationAttested: checkboxGroupSchema(ATTESTATION_KEYS),
  },
};