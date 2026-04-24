import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const fraudQuestionUiSchema = {
  additionalQuestions: {
    'ui:title': 'Medicare and Medicaid fraud history',
    medicaidFraudHistory: radioUI({
      title:
        'As a participant in the Medicare and Medicaid programs, have you ever been convicted of or investigated for making false, fictitious, or fraudulent statements, representations, writings, or documents regarding the delivery of or payment for health care benefits, items or services that would be in violation of the Criminal False Claims Act?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "If 'Yes,' you must provide a detailed explanation on the next page. Per the form instruction: 'If Yes, Explain details in Section XI.'",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
  },
};

export const fraudQuestionSchema = {
  type: 'object',
  properties: {
    additionalQuestions: {
      type: 'object',
      required: ['medicaidFraudHistory'],
      properties: {
        medicaidFraudHistory: radioSchema(['Y', 'N']),
      },
    },
  },
};