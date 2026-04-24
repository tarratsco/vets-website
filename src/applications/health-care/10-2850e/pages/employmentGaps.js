import {
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const employmentGapsUiSchema = {
  employmentGapExplanations: {
    'ui:title': 'Employment gap explanations',
    'ui:description':
      'If there are gaps of 30 or more days between employment entries, you must explain what you were doing during those periods.',
    'ui:options': {
      itemName: 'Gap explanation',
      viewField: item =>
        `Gap: ${item.gapStartDate || ''} to ${item.gapEndDate || ''}`,
      keepInPageOnReview: true,
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
        errorMessages: {
          required: 'Please explain the employment gap.',
        },
      }),
    },
  },
};

export const employmentGapsSchema = {
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
          explanation: {
            type: 'string',
            minLength: 10,
            maxLength: 1000,
          },
        },
      },
    },
  },
};