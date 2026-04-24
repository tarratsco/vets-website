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
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const ACTION_TYPE_LABELS = {
  'denial-of-initial-application': 'Denial of initial application',
  'restriction-limitation': 'Restriction or limitation',
  probation: 'Probation',
  suspension: 'Suspension',
  revocation: 'Revocation',
  'voluntary-surrender-non-disciplinary':
    'Voluntary surrender (non-disciplinary)',
  'voluntary-surrender-disciplinary':
    'Voluntary surrender (in lieu of disciplinary action)',
  other: 'Other',
};

const CURRENT_STATUS_LABELS = {
  resolved: 'Resolved',
  ongoing: 'Ongoing',
};

const STATE_OPTIONS = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  OTHER: 'Other jurisdiction',
};

export const adverseLicensureUiSchema = {
  adverseHistory: {
    adverseLicensureActions: {
      'ui:title': 'Adverse licensure actions',
      hasAdverseLicensureActions: yesNoUI({
        title:
          'Has any state licensing board or professional regulatory body ever denied, limited, suspended, revoked, or accepted the surrender of your professional license or certification for cause?',
        hint: 'Answer Yes even if the matter was resolved, the license was later reinstated, or the action occurred in another state. You will have an opportunity to explain the circumstances.',
        errorMessages: {
          required: 'Please answer this question.',
        },
      }),
      actions: {
        'ui:title': 'Adverse licensure action details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.adverseLicensureActions
              ?.hasAdverseLicensureActions !== true,
          itemName: 'Action',
          viewField: item =>
            `${item.actionType || 'Action'} — ${item.stateOrJurisdiction || ''}`,
          keepInPageOnReview: true,
        },
        items: {
          actionType: selectUI({
            title: 'Type of adverse action',
            labels: ACTION_TYPE_LABELS,
            errorMessages: { required: 'Please select the action type.' },
          }),
          stateOrJurisdiction: selectUI({
            title: 'State or jurisdiction of the licensing board',
            labels: STATE_OPTIONS,
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
            hint: 'Provide a full explanation including the circumstances, outcome, and whether and how the matter was resolved.',
            errorMessages: { required: 'Please explain the circumstances.' },
          }),
          currentStatus: radioUI({
            title: 'Current status of this action',
            labels: CURRENT_STATUS_LABELS,
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
                required: [
                  'actionType',
                  'stateOrJurisdiction',
                  'actionDate',
                  'explanation',
                ],
                properties: {
                  actionType: selectSchema(Object.keys(ACTION_TYPE_LABELS)),
                  stateOrJurisdiction: selectSchema(
                    Object.keys(STATE_OPTIONS),
                  ),
                  actionDate: currentOrPastDateSchema,
                  explanation: { type: 'string', minLength: 10, maxLength: 3000 },
                  currentStatus: radioSchema(
                    Object.keys(CURRENT_STATUS_LABELS),
                  ),
                },
              },
            },
          },
        },
      },
    },
  },
};