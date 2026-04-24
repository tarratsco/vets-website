import {
  yesNoUI,
  yesNoSchema,
  selectUI,
  selectSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const adverseLicensureUiSchema = {
  adverseHistory: {
    'ui:title': 'Adverse licensure actions',
    adverseLicensureActions: {
      hasAdverseLicensureActions: yesNoUI({
        title:
          'Has any state licensing board or professional regulatory body ever denied, limited, suspended, revoked, or accepted the surrender of your professional license or certification for cause?',
        hint:
          'Answer Yes even if the matter was resolved, the license was later reinstated, or the action occurred in another state. You will have an opportunity to explain the circumstances.',
        errorMessages: {
          required: 'Please answer this question.',
        },
      }),
      actions: {
        'ui:options': {
          itemName: 'adverse action',
          viewField: ActionViewField,
          hideIf: formData =>
            !formData?.adverseHistory?.adverseLicensureActions
              ?.hasAdverseLicensureActions,
          keepInPageOnReview: true,
        },
        items: {
          actionType: selectUI({
            title: 'Type of adverse action',
            labels: {
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
            },
            errorMessages: {
              required: 'Please select the type of action.',
            },
          }),
          stateOrJurisdiction: textareaUI({
            title: 'State or jurisdiction of the licensing board',
          }),
          actionDate: currentOrPastDateUI({
            title: 'Date of the action',
          }),
          explanation: textareaUI({
            title:
              'Explain the circumstances of this action and its current resolution status',
            hint:
              'Provide a full explanation of the circumstances, the outcome, and how the matter was resolved. Attach supporting documentation in the next section.',
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
          }),
        },
      },
    },
  },
};

function ActionViewField({ formData }) {
  return <div>{formData.actionType}</div>;
}

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
                  stateOrJurisdiction: { type: 'string', maxLength: 100 },
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