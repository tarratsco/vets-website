import {
  yesNoUI,
  yesNoSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const deaAdverseUiSchema = {
  adverseHistory: {
    deaRegistrationAdverse: {
      'ui:title': 'DEA registration adverse actions',
      hasAdverseDeaHistory: yesNoUI({
        title:
          'Has your DEA registration ever been denied, suspended, revoked, or surrendered?',
        hint: 'Answer Yes even if you do not currently hold or need a DEA registration.',
        errorMessages: { required: 'Please answer this question.' },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the action',
          errorMessages: {
            futureDate: 'Action date cannot be in the future.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse
              ?.hasAdverseDeaHistory !== true,
        },
      },
      explanation: {
        ...textareaUI({
          title: 'Explain the circumstances and current resolution status',
          errorMessages: { required: 'Please provide an explanation.' },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse
              ?.hasAdverseDeaHistory !== true,
        },
      },
    },
  },
};

export const deaAdverseSchema = {
  type: 'object',
  required: ['adverseHistory'],
  properties: {
    adverseHistory: {
      type: 'object',
      required: ['deaRegistrationAdverse'],
      properties: {
        deaRegistrationAdverse: {
          type: 'object',
          required: ['hasAdverseDeaHistory'],
          properties: {
            hasAdverseDeaHistory: yesNoSchema,
            actionDate: currentOrPastDateSchema,
            explanation: { type: 'string', maxLength: 3000 },
          },
        },
      },
    },
  },
};