import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CERT_LABELS = {
  traineeCertification:
    'I certify that all statements in this application are true, correct, complete, and made in good faith.',
};

export const certificationUiSchema = {
  certification: {
    'ui:title': 'Trainee certification',
    'ui:description':
      'This certification constitutes your electronic signature under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act). This is a legally binding acknowledgment.',
    traineeCertification: checkboxGroupUI({
      title: 'Trainee certification (Item 23A)',
      required: true,
      labels: CERT_LABELS,
      errorMessages: {
        required:
          'You must certify that your statements are true before submitting.',
      },
    }),
  },
};

export const certificationSchema = {
  type: 'object',
  properties: {
    certification: {
      type: 'object',
      required: ['traineeCertification'],
      properties: {
        traineeCertification: checkboxGroupSchema(Object.keys(CERT_LABELS)),
      },
    },
  },
};
