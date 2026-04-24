import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const remarksUiSchema = {
  additionalQuestions: {
    'ui:title': 'Additional remarks',
    generalRemarks: textareaUI({
      title: 'Additional remarks (optional)',
      hint:
        "Use this space to provide additional information for any item on this form. Per the form instruction: indicate the item number to which your comment refers at the start of each remark. For example: 'Item 18: I also attended [institution name]...'",
      charcount: true,
    }),
  },
};

export const remarksSchema = {
  type: 'object',
  properties: {
    additionalQuestions: {
      type: 'object',
      properties: {
        generalRemarks: {
          type: 'string',
          maxLength: 4000,
        },
      },
    },
  },
};