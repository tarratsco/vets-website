import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const criminalHistoryUiSchema = {
  adverseHistory: {
    criminalHistory: {
      'ui:title': 'Criminal history',
      'ui:description':
        'You must answer Yes even if: the conviction was later expunged or sealed; the matter occurred while you were a minor; or the conviction occurred in another state or country.',
      hasFelonyConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a felony?',
        errorMessages: {
          required: 'Please indicate whether you have any felony convictions.',
        },
      }),
      felonyDetails: {
        'ui:title': 'Felony conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory?.hasFelonyConviction !== true,
          itemName: 'Felony',
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
          }),
          jurisdiction: textUI({
            title: 'Jurisdiction (state/country)',
          }),
          court: textUI({
            title: 'Court name',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances of this conviction',
            charcount: true,
          }),
        },
      },
      hasMisdemeanorConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a misdemeanor (other than minor traffic violations)?',
        errorMessages: {
          required: 'Please indicate whether you have any misdemeanor convictions.',
        },
      }),
      misdemeanorDetails: {
        'ui:title': 'Misdemeanor conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory
              ?.hasMisdemeanorConviction !== true,
          itemName: 'Misdemeanor',
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
          }),
          jurisdiction: textUI({
            title: 'Jurisdiction (state/country)',
          }),
          court: textUI({
            title: 'Court name',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances of this conviction',
            charcount: true,
          }),
        },
      },
    },
  },
};

export const criminalHistorySchema = {
  type: 'object',
  required: ['adverseHistory'],
  properties: {
    adverseHistory: {
      type: 'object',
      required: ['criminalHistory'],
      properties: {
        criminalHistory: {
          type: 'object',
          required: ['hasFelonyConviction', 'hasMisdemeanorConviction'],
          properties: {
            hasFelonyConviction: yesNoSchema,
            felonyDetails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  offenseType: { type: 'string', maxLength: 200 },
                  convictionDate: currentOrPastDateSchema,
                  jurisdiction: { type: 'string', maxLength: 200 },
                  court: { type: 'string', maxLength: 200 },
                  explanation: { type: 'string', maxLength: 3000 },
                },
              },
            },
            hasMisdemeanorConviction: yesNoSchema,
            misdemeanorDetails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  offenseType: { type: 'string', maxLength: 200 },
                  convictionDate: currentOrPastDateSchema,
                  jurisdiction: { type: 'string', maxLength: 200 },
                  court: { type: 'string', maxLength: 200 },
                  explanation: { type: 'string', maxLength: 3000 },
                },
              },
            },
          },
        },
      },
    },
  },
};