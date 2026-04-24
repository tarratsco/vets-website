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
      'If you have any gaps of 30 or more days between employment positions, provide an explanation for each gap period.',
    'ui:options': {
      itemName: 'Gap explanation',
      viewField: ({ formData }) =>
        `Gap: ${formData.gapStartDate || ''} to ${formData.gapEndDate || ''}`,
    },
    items: {
      gapStartDate: currentOrPastDateUI({
        title: 'Gap start date',
        errorMessages: {
          required: 'Please enter the gap start date.',
        },
      }),
      gapEndDate: currentOrPastDateUI({
        title: 'Gap end date',
        errorMessages: {
          required: 'Please enter the gap end date.',
        },
      }),
      explanation: textareaUI({
        title: 'Explain what you were doing during this period',
        hint:
          'Examples: Maternity/paternity leave, Relocation between positions, Illness or medical leave, Continuing education or training, Unemployment between positions, International work or travel.',
        charcount: true,
        errorMessages: {
          required: 'Please provide an explanation for this gap period.',
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