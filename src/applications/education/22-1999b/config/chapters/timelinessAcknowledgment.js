import {
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const validateLateExplanation = (errors, value) => {
  if (!value || value.trim().length < 20) {
    errors.addError(
      'Please provide an explanation for the late submission (minimum 20 characters).',
    );
  }
};

export const timelinessAcknowledgmentUiSchema = {
  lateSubmissionExplanation: textareaUI({
    title:
      'Why is this change being reported more than 30 days after it occurred?',
    hint:
      "VA's standard is that enrollment changes be reported within 30 days of the effective date. Providing an explanation helps VA understand the context and is required to complete this form.",
    charcount: true,
    errorMessages: {
      required: 'Please provide an explanation for the late submission.',
    },
    'ui:validations': [validateLateExplanation],
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