import {
  yesNoUI,
  yesNoSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const clinicalPrivilegesUiSchema = {
  adverseHistory: {
    clinicalPrivilegesAdverse: {
      'ui:title': 'Clinical privileges adverse actions',
      hasAdversePrivilegesHistory: yesNoUI({
        title:
          'Have your clinical privileges at any healthcare facility ever been denied, suspended, revoked, reduced, or not renewed, or have you ever resigned clinical privileges while under investigation?',
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
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
        },
      },
      explanation: {
        ...textareaUI({
          title: 'Explain the circumstances and current resolution status',
          errorMessages: { required: 'Please provide an explanation.' },
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
        },
      },
    },
  },
};

export const clinicalPrivilegesSchema = {
  type: 'object',
  required: ['adverseHistory'],
  properties: {
    adverseHistory: {
      type: 'object',
      required: ['clinicalPrivilegesAdverse'],
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