import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const CERTIFICATION_LABELS = {
  certificationAttestation:
    'I certify that the information I\'ve provided is true and correct to the best of my knowledge and belief.',
};

const CERTIFICATION_KEYS = Object.keys(CERTIFICATION_LABELS);

// ── Chapter 6 — Certification ────────────────────────────────────────────────

export const certificationUiSchema = {
  'ui:title': 'Certification',
  'ui:description':
    'Warning: Providing false information on a federal form is a violation of 18 U.S.C. \u00a7 1001 and may result in fines or imprisonment.',
  certificationGroup: checkboxGroupUI({
    title: 'Please certify the information you have provided',
    required: true,
    labels: CERTIFICATION_LABELS,
    errorMessages: {
      required:
        'You must certify that your information is correct before submitting.',
    },
  }),
};

export const certificationSchema = {
  type: 'object',
  required: ['certificationGroup'],
  properties: {
    certificationGroup: checkboxGroupSchema(CERTIFICATION_KEYS),
  },
};