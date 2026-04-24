import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const certificationSignerUiSchema = {
  certificationSigner: radioUI({
    title: 'Who will sign the certification for this claim?',
    hint:
      "The form states: 'If certification is signed by a person other than the patient, complete the information, signature and date.' If you are the parent or guardian submitting on behalf of a minor or incapacitated adult beneficiary, select 'A representative (parent, guardian, or other authorized person).'",
    labels: {
      patient: 'The patient (beneficiary)',
      representative:
        'A representative (parent, guardian, or other authorized person)',
    },
    required: () => true,
    errorMessages: {
      required: 'Please indicate who will sign the certification.',
    },
  }),
};

export const certificationSignerSchema = {
  type: 'object',
  required: ['certificationSigner'],
  properties: {
    certificationSigner: radioSchema(['patient', 'representative']),
  },
};