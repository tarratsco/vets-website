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
      'ui:title': 'Clinical Privileges Adverse Actions',
      hasAdversePrivilegesHistory: yesNoUI({
        title:
          'Have your clinical privileges at any healthcare facility ever been denied, suspended, revoked, reduced, or not renewed, or have you ever resigned clinical privileges while under investigation?',
        errorMessages: {
          required:
            'Please answer whether you have had any adverse clinical privileges actions.',
        },
      }),
      actionDate: {
        ...currentOrPastDateUI({
          title: 'Date of the adverse privileges action',
        }),
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.clinicalPrivilegesAdverse
              ?.hasAdversePrivilegesHistory !== true,
        },
      },
      explanation: {
        ...textareaUI({
          title:
            'Explain the circumstances of the adverse privileges action and the current resolution status',
          charcount: true,
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