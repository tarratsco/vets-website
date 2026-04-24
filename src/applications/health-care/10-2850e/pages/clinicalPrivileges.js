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
    'ui:title': 'Clinical privileges adverse actions',
    clinicalPrivilegesAdverse: {
      hasAdversePrivilegesHistory: yesNoUI({
        title:
          'Have your clinical privileges at any healthcare facility ever been denied, suspended, revoked, reduced, or not renewed, or have you ever resigned clinical privileges while under investigation?',
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
            !formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory,
        },
      },
      explanation: textareaUI({
        title: 'Explain the circumstances of this action',
        charcount: true,
        'ui:options': {
          hideIf: formData =>
            !formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory,
        },
      }),
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