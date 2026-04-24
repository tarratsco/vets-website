import {
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const employmentGapUiSchema = {
  employmentGapExplanations: {
    'ui:title': 'Employment gap explanations',
    'ui:description':
      'You must explain any gaps in your employment history of 30 days or more.',
    'ui:options': {
      itemName: 'Gap explanation',
      viewField: ({ formData }) =>
        `Gap from ${formData?.gapStartDate || ''} to ${formData?.gapEndDate || ''}`,
    },
    items: {
      gapStartDate: currentOrPastDateUI({
        title: 'Gap start date',
        errorMessages: { required: 'Please enter the gap start date.' },
      }),
      gapEndDate: currentOrPastDateUI({
        title: 'Gap end date',
        errorMessages: { required: 'Please enter the gap end date.' },
      }),
      explanation: textareaUI({
        title: 'Explain what you were doing during this period',
        hint: 'Examples: Maternity/paternity leave, Relocation between positions, Illness or medical leave, Continuing education or training, Unemployment between positions.',
        charcount: true,
        errorMessages: {
          required: 'Please explain what you were doing during this gap.',
          minLength: 'Please provide at least 10 characters of explanation.',
        },
      }),
    },
  },
};

export const employmentGapSchema = {
  type: 'object',
  properties: {
    employmentGapExplanations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['gapStartDate', 'gapEndDate', 'explanation'],
        properties: {
          gapStartDate: currentOrPastDateSchema,
          gapEndDate: currentOrPastDateSchema,
          explanation: { type: 'string', maxLength: 1000, minLength: 10 },
        },
      },
    },
  },
};