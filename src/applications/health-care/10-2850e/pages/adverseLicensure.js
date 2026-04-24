import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'AS', 'GU', 'MP', 'PR', 'VI', 'Other jurisdiction',
];

export const adverseLicensureUiSchema = {
  adverseHistory: {
    adverseLicensureActions: {
      'ui:title': 'Adverse licensure actions',
      hasAdverseLicensureActions: yesNoUI({
        title:
          'Has any state licensing board or professional regulatory body ever denied, limited, suspended, revoked, or accepted the surrender of your professional license or certification for cause?',
        hint:
          'Answer Yes even if the matter was resolved, the license was later reinstated, or the action occurred in another state.',
        errorMessages: {
          required: 'Please indicate whether you have any adverse licensure actions.',
        },
      }),
      actions: {
        'ui:title': 'Adverse licensure action details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.adverseLicensureActions
              ?.hasAdverseLicensureActions !== true,
          itemName: 'Adverse action',
          viewField: ({ formData }) =>
            `${formData?.actionType || 'Action'} — ${formData?.stateOrJurisdiction || ''}`,
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
              required: 'Please enter the date of this action.',
              futureDate: 'Action date cannot be in the future.',
            },
          }),
          explanation: textareaUI({
            title:
              'Explain the circumstances of this action and its current resolution status',
            hint: 'Provide a full explanation including circumstances, outcome, and whether the matter was resolved.',
            charcount: true,
            errorMessages: {
              required: 'Please explain the circumstances of this action.',
              minLength: 'Please provide at least 10 characters.',
            },
          }),
          currentStatus: radioUI({
            title: 'Current status of this action',
            labels: {
              resolved: 'Resolved',
              ongoing: 'Ongoing',
            },
            errorMessages: { required: 'Please select the current status.' },
          }),
        },
      },
    },
  },
};

export const adverseLicensureSchema = {
  type: 'object',
  required: ['adverseHistory'],
  properties: {
    adverseHistory: {
      type: 'object',
      required: ['adverseLicensureActions'],
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
                  actionType: selectSchema([
                    'denial-of-initial-application',
                    'restriction-limitation',
                    'probation',
                    'suspension',
                    'revocation',
                    'voluntary-surrender-non-disciplinary',
                    'voluntary-surrender-disciplinary',
                    'other',
                  ]),
                  stateOrJurisdiction: selectSchema(US_STATES),
                  actionDate: currentOrPastDateSchema,
                  explanation: { type: 'string', maxLength: 3000, minLength: 10 },
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