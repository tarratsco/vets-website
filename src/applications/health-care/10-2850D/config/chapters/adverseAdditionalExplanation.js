import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseAdditionalExplanationUiSchema = {
  additionalQuestions: {
    'ui:title': 'Fraud and malpractice explanation',
    fraudMalpracticeExplanation: textareaUI({
      title:
        'Provide explanation for the Medicare/Medicaid or malpractice question(s) you answered "Yes"',
      hint:
        'For Medicare/Medicaid question (Item 21): describe the conviction or investigation, including dates, jurisdiction, and current status. For malpractice question (Item 22): include the name of the action or proceedings, date filed, the court or reviewing agency, the status or outcome, and your explanation of what occurred. Indicate the item number (21 or 22) at the start of each explanation.',
      charcount: true,
      errorMessages: {
        required: 'Provide an explanation.',
        minLength:
          'Your explanation must be at least 50 characters to prevent incomplete entries.',
      },
    }),
  },
};

export const adverseAdditionalExplanationSchema = {
  type: 'object',
  properties: {
    additionalQuestions: {
      type: 'object',
      required: ['fraudMalpracticeExplanation'],
      properties: {
        fraudMalpracticeExplanation: {
          type: 'string',
          minLength: 50,
          maxLength: 4000,
        },
      },
    },
  },
};