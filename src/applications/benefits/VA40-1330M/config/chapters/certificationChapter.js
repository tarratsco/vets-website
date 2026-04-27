import {
  checkboxUI,
  checkboxSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const certifyUiSchema = {
  certificationAttestation: checkboxUI({
    title:
      'I certify that the information I\'ve provided is true and correct to the best of my knowledge and belief.',
    errorMessages: {
      required:
        'You must certify that your information is correct before submitting.',
    },
    required: () => true,
  }),
  'view:certificationWarning': {
    'ui:description':
      'Warning: Providing false information on a federal form is a violation of 18 U.S.C. § 1001 and may result in fines or imprisonment.',
  },
};

export const certifySchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    certificationAttestation: checkboxSchema,
    'view:certificationWarning': {
      type: 'object',
      properties: {},
    },
  },
};