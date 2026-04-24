import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  textareaUI,
  textareaSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeHistoryUiSchema = {
  adverseHistory: {
    'ui:title': 'Malpractice history',
    malpracticeHistory: {
      hasMalpracticeHistory: yesNoUI({
        title:
          'Have you ever had a malpractice claim filed against you, or have you ever paid, or had paid on your behalf, any settlement or judgment in a malpractice action?',
        hint:
          'This includes claims that were dismissed, settled, or decided in your favor. Answer Yes even if your malpractice insurer paid the settlement.',
        errorMessages: {
          required: 'Please answer this question.',
        },
      }),
      claims: {
        'ui:options': {
          itemName: 'malpractice claim',
          viewField: ClaimViewField,
          hideIf: formData =>
            !formData?.adverseHistory?.malpracticeHistory?.hasMalpracticeHistory,
          keepInPageOnReview: true,
        },
        items: {
          incidentDate: currentOrPastDateUI({
            title: 'Date of the incident or occurrence',
            errorMessages: {
              required: 'Please enter the incident date.',
            },
          }),
          claimFiledDate: currentOrPastDateUI({
            title: 'Date the claim was filed',
          }),
          allegationType: textUI({
            title: 'Primary allegation',
            hint: 'Describe the primary type of allegation in this claim.',
          }),
          outcome: selectUI({
            title: 'Outcome of this claim',
            labels: {
              pending: 'Pending',
              dismissed: 'Dismissed',
              settled: 'Settled',
              judgmentForPlaintiff: 'Judgment for plaintiff',
              judgmentForDefendant: 'Judgment for defendant',
            },
            errorMessages: {
              required: 'Please select the outcome.',
            },
          }),
          settlementAmount: textUI({
            title: 'Amount paid in settlement or judgment (in U.S. dollars)',
            hint: 'Enter the total amount paid, including amounts paid by your malpractice insurer.',
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
            charcount: true,
            errorMessages: {
              required: 'Please provide an explanation.',
            },
          }),
        },
      },
    },
  },
};

function ClaimViewField({ formData }) {
  return <div>Claim: {formData.incidentDate}</div>;
}

export const malpracticeHistorySchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
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
                required: ['incidentDate', 'allegationType', 'outcome', 'explanation'],
                properties: {
                  incidentDate: currentOrPastDateSchema,
                  claimFiledDate: currentOrPastDateSchema,
                  allegationType: { type: 'string', maxLength: 200 },
                  outcome: selectSchema([
                    'pending',
                    'dismissed',
                    'settled',
                    'judgmentForPlaintiff',
                    'judgmentForDefendant',
                  ]),
                  settlementAmount: { type: 'number', minimum: 0 },
                  explanation: { type: 'string', maxLength: 3000, minLength: 10 },
                },
              },
            },
          },
        },
      },
    },
  },
};