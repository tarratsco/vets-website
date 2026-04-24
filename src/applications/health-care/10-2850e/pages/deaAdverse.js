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
    'ui:title': 'DEA registration adverse actions',
    deaRegistrationAdverse: {
      hasAdverseDeaHistory: yesNoUI({
        title:
          'Has your DEA registration ever been denied, suspended, revoked, or surrendered?',
        hint: 'Answer Yes even if you do not currently hold or need a DEA registration.',
        errorMessages: {
          required: 'Please answer this question.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the action',
        }),
        'ui:options': {
          hideIf: formData =>
            !formData?.adverseHistory?.deaRegistrationAdverse?.hasAdverseDeaHistory,
        },
      },
      explanation: textareaUI({
        title: 'Explain the circumstances of this action',
        charcount: true,
        'ui:options': {
          hideIf: formData =>
            !formData?.adverseHistory?.deaRegistrationAdverse?.hasAdverseDeaHistory,
        },
      }),
    },
  },
};

export const deaAdverseSchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
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