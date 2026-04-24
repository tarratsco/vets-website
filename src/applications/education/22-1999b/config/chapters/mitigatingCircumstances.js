import {
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const MITIGATING_KNOWN_LABELS = {
  yes: 'Yes, I am aware of mitigating circumstances',
  no: 'No, I am not aware of any mitigating circumstances',
  unknown: "I don't know if there are mitigating circumstances",
};

export const MITIGATING_KNOWN_KEYS = Object.keys(MITIGATING_KNOWN_LABELS);

export const mitigatingCircumstancesUiSchema = {
  mitigatingCircumstancesKnown: radioUI({
    title:
      'Are you aware of any mitigating circumstances that contributed to this student\'s enrollment change?',
    hint:
      'Mitigating circumstances are situations beyond the student\'s control \u2014 such as illness, a death in the family, or a military deployment \u2014 that contributed to the withdrawal or enrollment change. Documenting these circumstances may protect the student from an overpayment debt.',
    labels: MITIGATING_KNOWN_LABELS,
    errorMessages: {
      required: 'Please indicate whether you are aware of mitigating circumstances.',
    },
  }),
  mitigatingCircumstancesNarrative: textareaUI({
    title: 'Describe the mitigating circumstances',
    hint:
      'Describe what you know about the circumstances that led to this student\'s enrollment change. Include dates, events, and any documentation you have on file. The more detail you provide, the better VA can evaluate the student\'s situation.',
    charcount: true,
    errorMessages: {
      required: 'Please provide a description of the mitigating circumstances.',
    },
  }),
};

export const mitigatingCircumstancesSchema = {
  type: 'object',
  required: ['mitigatingCircumstancesKnown'],
  properties: {
    mitigatingCircumstancesKnown: radioSchema(MITIGATING_KNOWN_KEYS),
    mitigatingCircumstancesNarrative: {
      type: 'string',
      minLength: 20,
      maxLength: 2000,
    },
  },
};