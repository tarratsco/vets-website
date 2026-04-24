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
      'ui:title': 'DEA Registration Adverse Actions',
      hasAdverseDeaHistory: yesNoUI({
        title:
          'Has your DEA registration ever been denied, suspended, revoked, or surrendered?',
        hint:
          "Answer 'Yes' even if you do not currently hold or need a DEA registration.",
        errorMessages: {
          required:
            'Please answer whether you have had any adverse DEA registration actions.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the adverse DEA action',
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse
              ?.hasAdverseDeaHistory !== true,
        },
      },
      explanation: {
        ...textareaUI({
          title:
            'Explain the circumstances of the adverse DEA action and the current resolution status',
          charcount: true,
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