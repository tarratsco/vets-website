import {
  checkboxUI,
  checkboxSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

// ─── Certification validation ─────────────────────────────────────────────────

export function validateCertificationChecked(errors, fieldData) {
  if (!fieldData) {
    errors.addError(
      'You must certify that your information is correct before continuing.',
    );
  }
}

// ─── Certify Page ─────────────────────────────────────────────────────────────

export const certifyUiSchema = {
  'view:certificationWarning': {
    'ui:description':
      'Warning: Providing false information on a federal form is a violation of 18 U.S.C. § 1001 and may result in fines or imprisonment.',
  },
  certificationAttestation: {
    ...checkboxUI({
      title:
        'I certify that the information I\'ve provided is true and correct to the best of my knowledge and belief.',
      errorMessages: {
        required:
          'You must certify that your information is correct before continuing.',
      },
    }),
    'ui:validations': [validateCertificationChecked],
  },
};

export const certifySchema = {
  type: 'object',
  required: ['certificationAttestation'],
  properties: {
    'view:certificationWarning': {
      type: 'object',
      properties: {},
    },
    certificationAttestation: checkboxSchema,
  },
};

// ─── Chapter pages map ───────────────────────────────────────────────────────

export const certificationAndSubmitPages = {
  certify: {
    path: 'certify',
    title: 'Certify your information',
    uiSchema: certifyUiSchema,
    schema: certifySchema,
  },
};