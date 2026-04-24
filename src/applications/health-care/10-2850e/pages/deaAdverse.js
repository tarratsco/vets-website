import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const deaAdverseUiSchema = {
  adverseHistory: {
    deaRegistrationAdverse: {
      'ui:title': 'DEA registration adverse actions',
      hasAdverseDeaHistory: yesNoUI({
        title:
          'Has your DEA registration ever been denied, suspended, revoked, or surrendered?',
        hint: 'Answer Yes even if you do not currently hold or need a DEA registration.',
        errorMessages: {
          required: 'Please indicate whether you have any adverse DEA registration history.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the action',
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse
              ?.hasAdverseDeaHistory !== true,
        },
      },
      explanation: {
        ...textareaUI({
          title: 'Explain the circumstances of this action',
          charcount: true,
          errorMessages: {
            required: 'Please explain the circumstances.',
          },
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