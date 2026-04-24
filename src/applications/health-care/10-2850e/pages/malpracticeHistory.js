import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const malpracticeHistoryUiSchema = {
  adverseHistory: {
    malpracticeHistory: {
      'ui:title': 'Malpractice history',
      hasMalpracticeHistory: yesNoUI({
        title:
          'Have you ever had a malpractice claim filed against you, or have you ever paid, or had paid on your behalf, any settlement or judgment in a malpractice action?',
        hint:
          'This includes claims that were dismissed, settled, or decided in your favor. Answer Yes even if your malpractice insurer paid the settlement.',
        errorMessages: {
          required: 'Please indicate whether you have any malpractice history.',
        },
      }),
      claims: {
        'ui:title': 'Malpractice claim details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.malpracticeHistory
              ?.hasMalpracticeHistory !== true,
          itemName: 'Claim',
          viewField: ({ formData }) =>
            `Claim filed ${formData?.claimFiledDate || ''} — ${formData?.outcome || 'Pending'}`,
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
              required: 'Please enter the claim filed date.',
            },
          }),
          allegationType: textUI({
            title: 'Primary allegation',
            hint: 'Describe the primary allegation or cause of action in this claim.',
            errorMessages: { required: 'Please enter the allegation type.' },
          }),
          outcome: selectUI({
            title: 'Outcome of this claim',
            errorMessages: { required: 'Please select the outcome.' },
          }),
          settlementAmount: {
            ...textUI({
              title: 'Amount paid in settlement or judgment (in U.S. dollars)',
              hint: 'Enter the total amount paid, including amounts paid by your malpractice insurer.',
              inputType: 'number',
            }),
            'ui:options': {
              hideIf: (formData, index) => {
                const outcome =
                  formData?.adverseHistory?.malpracticeHistory?.claims?.[index]
                    ?.outcome;
                return outcome !== 'settled' && outcome !== 'judgmentForPlaintiff';
              },
            },
          },
          explanation: textareaUI({
            title: 'Briefly explain the nature of the claim and any relevant context',
            charcount: true,
            errorMessages: {
              required: 'Please explain the nature of this claim.',
              minLength: 'Please provide at least 10 characters.',
            },
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