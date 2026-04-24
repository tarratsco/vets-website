import {
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const gapItemUiSchema = {
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
      'Examples: Maternity/paternity leave, Relocation, Illness or medical leave, Continuing education, Unemployment, International travel.',
    charcount: true,
    errorMessages: {
      required: 'Please explain the employment gap.',
    },
  }),
};

const gapItemSchema = {
  type: 'object',
  required: ['gapStartDate', 'gapEndDate', 'explanation'],
  properties: {
    gapStartDate: currentOrPastDateSchema,
    gapEndDate: currentOrPastDateSchema,
    explanation: { type: 'string', maxLength: 1000, minLength: 10 },
  },
};

export const employmentGapsUiSchema = {
  'ui:title': 'Employment gap explanations',
  'ui:description':
    'If you have gaps of 30 or more days between employment entries, you must explain each gap. If you have no gaps to explain, select Continue.',
  employmentGapExplanations: {
    'ui:options': {
      itemName: 'employment gap',
      viewField: GapViewField,
      keepInPageOnReview: true,
    },
    items: gapItemUiSchema,
  },
};

function GapViewField({ formData }) {
  return (
    <div>
      Gap: {formData.gapStartDate} to {formData.gapEndDate}
    </div>
  );
}

export const employmentGapsSchema = {
  type: 'object',
  properties: {
    employmentGapExplanations: {
      type: 'array',
      items: gapItemSchema,
    },
  },
};