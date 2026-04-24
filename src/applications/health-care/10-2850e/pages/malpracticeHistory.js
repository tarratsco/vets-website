import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const outcomeOptions = [
  'pending',
  'dismissed',
  'settled',
  'judgmentForPlaintiff',
  'judgmentForDefendant',
];

export const malpracticeHistoryUiSchema = {
  adverseHistory: {
    malpracticeHistory: {
      'ui:title': 'Malpractice History',
      hasMalpracticeHistory: yesNoUI({
        title:
          'Have you ever had a malpractice claim filed against you, or have you ever paid, or had paid on your behalf, any settlement or judgment in a malpractice action?',
        hint:
          "This includes claims that were dismissed, settled, or decided in your favor. Answer 'Yes' even if your malpractice insurer paid the settlement and you consider the matter closed.",
        errorMessages: {
          required: 'Please answer whether you have had any malpractice claims.',
        },
      }),
      claims: {
        'ui:title': 'Malpractice Claim Details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.malpracticeHistory
              ?.hasMalpracticeHistory !== true,
          itemName: 'Claim',
          viewField: ({ formData }) =>
            `Claim — ${formData.incidentDate || ''} — ${formData.outcome || 'pending'}`,
        },
        items: {
          incidentDate: currentOrPastDateUI({
            title: 'Date of the incident or occurrence',
            errorMessages: {
              required: 'Please enter the incident date.',
              futureDate: 'Incident date cannot be in the future.',
            },
          }),
          claimFiledDate: currentOrPastDateUI({
            title: 'Date the claim was filed',
            errorMessages: {
              required: 'Please enter the date the claim was filed.',
            },
          }),
          allegationType: textUI({
            title: 'Primary allegation',
            hint:
              'Describe the primary allegation type (e.g., failure to diagnose, surgical error, medication error).',
            errorMessages: { required: 'Please describe the allegation type.' },
          }),
          outcome: selectUI({
            title: 'Outcome of this claim',
            errorMessages: { required: 'Please select the outcome.' },
          }),
          settlementAmount: {
            ...textUI({
              title: 'Amount paid in settlement or judgment (in U.S. dollars)',
              hint:
                'Enter the total amount paid, including amounts paid by your malpractice insurer. Do not include defense legal fees.',
              inputType: 'number',
            }),
            'ui:options': {
              hideIf: (formData, index) => {
                const claims = formData?.adverseHistory?.malpracticeHistory?.claims;
                if (!claims || !claims[index]) return true;
                const outcome = claims[index].outcome;
                return outcome !== 'settled' && outcome !== 'judgmentForPlaintiff';
              },
            },
          },
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
                  outcome: selectSchema(outcomeOptions),
                  settlementAmount: { type: 'number', minimum: 0 },
                  explanation: { type: 'string', minLength: 10, maxLength: 3000 },
                },
              },
            },
          },
        },
      },
    },
  },
};