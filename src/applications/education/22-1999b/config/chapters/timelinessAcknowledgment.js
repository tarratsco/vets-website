import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const timelinessAcknowledgmentUiSchema = {
  lateSubmissionExplanation: textareaUI({
    title:
      'Why is this change being reported more than 30 days after it occurred?',
    hint:
      "VA's standard is that enrollment changes be reported within 30 days of the effective date. Providing an explanation helps VA understand the context and does not prevent submission, but it is required to complete this form.",
    charcount: true,
    errorMessages: {
      required:
        'Please provide an explanation for the late submission.',
    },
  }),
};

export const timelinessAcknowledgmentSchema = {
  type: 'object',
  required: ['lateSubmissionExplanation'],
  properties: {
    lateSubmissionExplanation: {
      type: 'string',
      minLength: 20,
      maxLength: 1000,
    },
  },
};