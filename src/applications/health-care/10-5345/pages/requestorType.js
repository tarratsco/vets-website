/**
 * @module pages/requestorType
 * @description Who is submitting this request — Veteran or authorized representative
 */
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const requestorTypeUiSchema = {
  requestorType: radioUI({
    title: 'Who is submitting this request?',
    hint:
      'Select the option that describes you. If you are a Veteran requesting your own records, select "I am the Veteran." If you are submitting on behalf of a Veteran, select the option that describes your legal relationship.',
    labels: {
      veteran: 'I am the Veteran',
      legal_guardian: 'I am the Veteran\'s legal guardian (court-appointed)',
      healthcare_poa: 'I hold healthcare power of attorney for the Veteran',
      personal_representative: 'I am the Veteran\'s personal representative',
      fiduciary: 'I am the Veteran\'s VA-appointed fiduciary',
      vso: 'I am a VSO or accredited claims representative',
      surviving_family:
        'I am a surviving spouse or next of kin (Veteran is deceased)',
    },
    errorMessages: {
      required: 'Please select who is submitting this request.',
    },
  }),
};

export const requestorTypeSchema = {
  type: 'object',
  required: ['requestorType'],
  properties: {
    requestorType: radioSchema([
      'veteran',
      'legal_guardian',
      'healthcare_poa',
      'personal_representative',
      'fiduciary',
      'vso',
      'surviving_family',
    ]),
  },
};