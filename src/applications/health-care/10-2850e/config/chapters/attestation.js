import {
  attestationUiSchema,
  attestationSchema,
} from '../../pages/attestation';

export default {
  title: 'Attestation and Signature',
  pages: {
    attestation: {
      path: 'attestation',
      title: 'Attestation and electronic signature',
      uiSchema: attestationUiSchema,
      schema: attestationSchema,
    },
  },
};