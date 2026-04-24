import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const clinicalPrivilegesUiSchema = {
  adverseHistory: {
    clinicalPrivilegesAdverse: {
      'ui:title': 'Clinical privileges adverse actions',
      hasAdversePrivilegesHistory: yesNoUI({
        title:
          'Have your clinical privileges at any healthcare facility ever been denied, suspended, revoked, reduced, or not renewed, or have you ever resigned clinical privileges while under investigation?',
        errorMessages: {
          required:
            'Please indicate whether you have had adverse clinical privileges history.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the adverse privileges action',
          errorMessages: {
            required: 'Please enter the date of the adverse action.',
            futureDate: 'Action date cannot be in the future.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
          expandUnder: 'hasAdversePrivilegesHistory',
        },
      },
      explanation: {
        ...textareaUI({
          title: 'Explain the circumstances of this adverse privileges action',
          hint:
            'Provide a full explanation of what occurred, the reason for the action, and its current resolution status.',
          charcount: true,
          errorMessages: {
            required: 'Please provide an explanation of this adverse privileges action.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
          expandUnder: 'hasAdversePrivilegesHistory',
        },
      },
    },
  },
};

export const clinicalPrivilegesSchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
      properties: {
        clinicalPrivilegesAdverse: {
          type: 'object',
          required: ['hasAdversePrivilegesHistory'],
          properties: {
            hasAdversePrivilegesHistory: yesNoSchema,
            actionDate: currentOrPastDateSchema,
            explanation: { type: 'string', maxLength: 3000 },
          },
        },
      },
    },
  },
};