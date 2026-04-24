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
        hint:
          "Answer 'Yes' even if you do not currently hold or need a DEA registration.",
        errorMessages: {
          required:
            'Please indicate whether you have had adverse DEA registration history.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the adverse DEA action',
          errorMessages: {
            required: 'Please enter the date of the adverse DEA action.',
            futureDate: 'Action date cannot be in the future.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse?.hasAdverseDeaHistory !==
            true,
          expandUnder: 'hasAdverseDeaHistory',
        },
      },
      explanation: {
        ...textareaUI({
          title: 'Explain the circumstances of this adverse DEA action',
          charcount: true,
          errorMessages: {
            required: 'Please provide an explanation of this adverse DEA action.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.deaRegistrationAdverse?.hasAdverseDeaHistory !==
            true,
          expandUnder: 'hasAdverseDeaHistory',
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