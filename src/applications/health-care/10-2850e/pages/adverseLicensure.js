import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ACTION_TYPE_LABELS = {
  'denial-of-initial-application': 'Denial of initial application',
  'restriction-limitation': 'Restriction or limitation',
  probation: 'Probation',
  suspension: 'Suspension',
  revocation: 'Revocation',
  'voluntary-surrender-non-disciplinary': 'Voluntary surrender (non-disciplinary)',
  'voluntary-surrender-disciplinary':
    'Voluntary surrender (in lieu of disciplinary action)',
  other: 'Other',
};

const US_STATES_JURISDICTIONS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
  'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'Other jurisdiction/country',
];

export const adverseLicensureUiSchema = {
  adverseHistory: {
    adverseLicensureActions: {
      'ui:title': 'Adverse licensure actions',
      hasAdverseLicensureActions: yesNoUI({
        title:
          'Has any state licensing board or professional regulatory body ever denied, limited, suspended, revoked, or accepted the surrender of your professional license or certification for cause?',
        description:
          "Answer 'Yes' even if the matter was resolved, the license was later reinstated, or the action occurred in another state. You will have an opportunity to explain the circumstances.",
        errorMessages: {
          required: 'Please indicate whether you have had adverse licensure actions.',
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
            `${formData.actionType || 'Action'} — ${formData.stateOrJurisdiction || ''}`,
        },
        items: {
          actionType: selectUI({
            title: 'Type of adverse action',
            labels: ACTION_TYPE_LABELS,
            errorMessages: { required: 'Please select the type of adverse action.' },
          }),
          stateOrJurisdiction: selectUI({
            title: 'State or jurisdiction of the licensing board',
            errorMessages: {
              required: 'Please select the state or jurisdiction.',
            },
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
              'Provide a full explanation of the circumstances that led to the action, the outcome, and whether and how the matter was resolved. Attach supporting documentation in the Supporting Documents section.',
            charcount: true,
            errorMessages: {
              required: 'Please provide an explanation of this adverse action.',
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
                  actionType: selectSchema(Object.keys(ACTION_TYPE_LABELS)),
                  stateOrJurisdiction: selectSchema(US_STATES_JURISDICTIONS),
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