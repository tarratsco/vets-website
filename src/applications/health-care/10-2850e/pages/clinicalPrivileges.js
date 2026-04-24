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
      'ui:title': 'Clinical privileges adverse history',
      hasAdversePrivilegesHistory: yesNoUI({
        title:
          'Have your clinical privileges at any healthcare facility ever been denied, suspended, revoked, reduced, or not renewed, or have you ever resigned clinical privileges while under investigation?',
        errorMessages: {
          required: 'Please indicate whether you have any adverse clinical privileges history.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the action',
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
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