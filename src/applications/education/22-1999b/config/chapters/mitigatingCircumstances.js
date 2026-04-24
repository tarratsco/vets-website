import {
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const validateNarrative = (errors, value, formData) => {
  if (
    formData &&
    formData.mitigatingCircumstancesKnown === 'yes' &&
    (!value || value.trim().length < 20)
  ) {
    errors.addError(
      'Please provide at least a brief description of the mitigating circumstances (20 characters minimum).',
    );
  }
};

export const mitigatingCircumstancesUiSchema = {
  mitigatingCircumstancesKnown: radioUI({
    title:
      'Are you aware of any mitigating circumstances that contributed to this enrollment change?',
    hint:
      'Mitigating circumstances are situations beyond the student\'s control — such as illness, a death in the family, or a military deployment — that contributed to the withdrawal or enrollment change. Documenting these circumstances may protect the student from an overpayment debt.',
    labels: {
      yes: 'Yes, I am aware of mitigating circumstances',
      no: 'No, I am not aware of any mitigating circumstances',
      unknown: "I don't know if there are mitigating circumstances",
    },
    errorMessages: {
      required: 'Please indicate whether you are aware of mitigating circumstances.',
    },
  }),
  mitigatingCircumstancesNarrative: textareaUI({
    title: 'Describe the mitigating circumstances',
    hint:
      'Describe what you know about the circumstances that led to this enrollment change. Include dates, events, and any documentation you have on file. The more detail you provide, the better VA can evaluate the situation.',
    charcount: true,
    errorMessages: {
      required: 'Please describe the mitigating circumstances.',
    },
    'ui:validations': [validateNarrative],
  }),
};

export const mitigatingCircumstancesSchema = {
  type: 'object',
  required: ['mitigatingCircumstancesKnown'],
  properties: {
    mitigatingCircumstancesKnown: radioSchema(['yes', 'no', 'unknown']),
    mitigatingCircumstancesNarrative: {
      type: 'string',
      minLength: 20,
      maxLength: 2000,
    },
  },
};