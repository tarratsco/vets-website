import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const OUTCOME_LABELS = {
  pending: 'Pending',
  dismissed: 'Dismissed',
  settled: 'Settled',
  judgmentForPlaintiff: 'Judgment for plaintiff',
  judgmentForDefendant: 'Judgment for defendant',
};

export const malpracticeHistoryUiSchema = {
  adverseHistory: {
    malpracticeHistory: {
      'ui:title': 'Malpractice history',
      hasMalpracticeHistory: yesNoUI({
        title:
          'Have you ever had a malpractice claim filed against you, or have you ever paid, or had paid on your behalf, any settlement or judgment in a malpractice action?',
        hint: 'This includes claims that were dismissed, settled, or decided in your favor. Answer Yes even if your malpractice insurer paid the settlement and you consider the matter closed.',
        errorMessages: { required: 'Please answer this question.' },
      }),
      claims: {
        'ui:title': 'Malpractice claim details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.malpracticeHistory
              ?.hasMalpracticeHistory !== true,
          itemName: 'Claim',
          viewField: item =>
            `${item.allegationType || 'Claim'} — ${item.outcome || ''}`,
          keepInPageOnReview: true,
        },
        items: {
          incidentDate: currentOrPastDateUI({
            title: 'Date of the incident or occurrence',
            errorMessages: {
              required: 'Please enter the date of the incident.',
              futureDate: 'Incident date cannot be in the future.',
            },
          }),
          claimFiledDate: currentOrPastDateUI({
            title: 'Date the claim was filed',
            errorMessages: {
              required: 'Please enter the date the claim was filed.',
              futureDate: 'Claim filed date cannot be in the future.',
            },
          }),
          allegationType: textUI({
            title: 'Primary allegation',
            hint: 'Briefly describe the type of clinical allegation (for example: failure to diagnose, medication error, surgical complication).',
            errorMessages: { required: 'Please enter the allegation type.' },
          }),
          outcome: selectUI({
            title: 'Outcome of this claim',
            labels: OUTCOME_LABELS,
            errorMessages: { required: 'Please select the outcome.' },
          }),
          settlementAmount: textUI({
            title: 'Amount paid in settlement or judgment (in U.S. dollars)',
            hint: 'Enter the total amount paid, including amounts paid by your malpractice insurer. Do not include defense legal fees.',
            inputType: 'number',
            'ui:options': {
              hideIf: (formData, index) => {
                const claims =
                  formData?.adverseHistory?.malpracticeHistory?.claims;
                if (!claims || !claims[index]) return true;
                const outcome = claims[index].outcome;
                return (
                  outcome !== 'settled' && outcome !== 'judgmentForPlaintiff'
                );
              },
            },
          }),
          explanation: textareaUI({
            title: 'Briefly explain the nature of the claim and any relevant context',
            errorMessages: { required: 'Please provide an explanation.' },
          }),
        },
      },
    },
  },
};

export const malpracticeHistorySchema = {
  type: 'object',
  required: ['adverseHistory'],
  properties: {
    adverseHistory: {
      type: 'object',
      required: ['malpracticeHistory'],
      properties: {
        malpracticeHistory: {
          type: 'object',
          required: ['hasMalpracticeHistory'],
          properties: {
            hasMalpracticeHistory: yesNoSchema,
            claims: {
              type: 'array',
              items: {
                type: 'object',
                required: [
                  'incidentDate',
                  'allegationType',
                  'outcome',
                  'explanation',
                ],
                properties: {
                  incidentDate: currentOrPastDateSchema,
                  claimFiledDate: currentOrPastDateSchema,
                  allegationType: { type: 'string', maxLength: 200 },
                  outcome: selectSchema(Object.keys(OUTCOME_LABELS)),
                  settlementAmount: { type: 'number', minimum: 0 },
                  explanation: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 3000,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};