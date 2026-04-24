import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  textareaUI,
  textareaSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const actionTypeOptions = [
  'denial-of-initial-application',
  'restriction-limitation',
  'probation',
  'suspension',
  'revocation',
  'voluntary-surrender-non-disciplinary',
  'voluntary-surrender-disciplinary',
  'other',
];

const stateOptions = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR', 'GU', 'VI', 'AS', 'MP', 'Other jurisdiction',
];

export const adverseLicensureUiSchema = {
  adverseHistory: {
    adverseLicensureActions: {
      'ui:title': 'Adverse Licensure Actions',
      hasAdverseLicensureActions: yesNoUI({
        title:
          'Has any state licensing board or professional regulatory body ever denied, limited, suspended, revoked, or accepted the surrender of your professional license or certification for cause?',
        hint:
          "Answer 'Yes' even if the matter was resolved, the license was later reinstated, or the action occurred in another state. You will have an opportunity to explain the circumstances.",
        errorMessages: {
          required: 'Please answer whether you have had any adverse licensure actions.',
        },
      }),
      actions: {
        'ui:title': 'Adverse Licensure Action Details',
        'ui:description':
          'Please provide details for each adverse licensure action.',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.adverseLicensureActions
              ?.hasAdverseLicensureActions !== true,
          itemName: 'Action',
          viewField: ({ formData }) =>
            `${formData.actionType || 'Action'} — ${formData.stateOrJurisdiction || ''}`,
        },
        items: {
          actionType: selectUI({
            title: 'Type of adverse action',
            errorMessages: { required: 'Please select the action type.' },
          }),
          stateOrJurisdiction: selectUI({
            title: 'State or jurisdiction of the licensing board',
            errorMessages: { required: 'Please select the state or jurisdiction.' },
          }),
          actionDate: currentOrPastDateUI({
            title: 'Date of the action',
            errorMessages: {
              required: 'Please enter the date of the action.',
              futureDate: 'Action date cannot be in the future.',
            },
          }),
          explanation: textareaUI({
            title:
              'Explain the circumstances of this action and its current resolution status',
            hint:
              'Provide a full explanation of the circumstances that led to the action, the outcome, and whether and how the matter was resolved.',
            charcount: true,
            errorMessages: {
              required: 'Please provide an explanation.',
            },
          }),
          currentStatus: radioUI({
            title: 'Current status of this matter',
            labels: {
              resolved: 'Resolved',
              ongoing: 'Ongoing',
            },
            errorMessages: {
              required: 'Please select the current status.',
            },
          }),
        },
      },
    },
  },
};

export const adverseLicensureSchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
      properties: {
        adverseLicensureActions: {
          type: 'object',
          required: ['hasAdverseLicensureActions'],
          properties: {
            hasAdverseLicensureActions: yesNoSchema,
            actions: {
              type: 'array',
              items: {
                type: 'object',
                required: ['actionType', 'stateOrJurisdiction', 'actionDate', 'explanation'],
                properties: {
                  actionType: selectSchema(actionTypeOptions),
                  stateOrJurisdiction: selectSchema(stateOptions),
                  actionDate: currentOrPastDateSchema,
                  explanation: { type: 'string', minLength: 10, maxLength: 3000 },
                  currentStatus: radioSchema(['resolved', 'ongoing']),
                },
              },
            },
          },
        },
      },
    },
  },
};