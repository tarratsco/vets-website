/**
 * Chapter 1 — IRRRL Screening (Screen 2)
 * VA Form 26-1805
 */
import {
  radioUI,
  radioSchema,
  yesNoUI,
  yesNoSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const irrrlScreeningUiSchema = {
  irrrlScreening: {
    'ui:title': 'Loan type screening',
    loanTransactionPreScreen: radioUI({
      title: 'What type of loan transaction is this appraisal request for?',
      hint:
        'Select the option that best describes the loan transaction. Your answer determines whether an appraisal is required.',
      labels: {
        purchase: 'Purchase of a home',
        'cash-out-refi': 'Cash-out refinance',
        irrrl:
          'Interest Rate Reduction Refinance Loan (IRRRL / Streamline Refinance)',
        'new-construction': 'New construction',
      },
      errorMessages: {
        required: 'Please select the loan transaction type.',
      },
    }),
    irrrlAppraisalRequired: {
      ...yesNoUI({
        title:
          'Has the VA Regional Loan Center confirmed that this IRRRL requires an appraisal (not waiver-eligible)?',
        hint:
          'IRRRLs may qualify for an appraisal waiver under VA Circular 26-18-13. Only proceed if your RLC has confirmed an appraisal is required.',
        labels: {
          Y: "Yes — I've confirmed this IRRRL requires an appraisal",
          N: 'No — My IRRRL may qualify for a waiver',
        },
        errorMessages: {
          required:
            'Please confirm whether this IRRRL requires an appraisal.',
        },
      }),
      'ui:options': {
        expandUnder: 'loanTransactionPreScreen',
        expandUnderCondition: 'irrrl',
      },
    },
  },
};

export const irrrlScreeningSchema = {
  type: 'object',
  properties: {
    irrrlScreening: {
      type: 'object',
      required: ['loanTransactionPreScreen'],
      properties: {
        loanTransactionPreScreen: radioSchema([
          'purchase',
          'cash-out-refi',
          'irrrl',
          'new-construction',
        ]),
        irrrlAppraisalRequired: yesNoSchema,
      },
    },
  },
};