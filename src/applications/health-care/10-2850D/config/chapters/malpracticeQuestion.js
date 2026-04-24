import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeQuestionUiSchema = {
  additionalQuestions: {
    'ui:title': 'Malpractice history',
    malpracticeHistory: radioUI({
      title:
        'Are you now, or have you ever been, involved in administrative, professional, or judicial proceedings in which malpractice on your part was alleged?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "If 'Yes,' you must provide details on the next page including: name of the action or proceedings, date filed, court or reviewing agency, the status or outcome of the case, and your explanation of what occurred.",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
  },
};

export const malpracticeQuestionSchema = {
  type: 'object',
  properties: {
    additionalQuestions: {
      type: 'object',
      required: ['malpracticeHistory'],
      properties: {
        malpracticeHistory: radioSchema(['Y', 'N']),
      },
    },
  },
};