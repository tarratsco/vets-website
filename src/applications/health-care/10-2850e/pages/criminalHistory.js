import {
  yesNoUI,
  yesNoSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const criminalHistoryUiSchema = {
  adverseHistory: {
    criminalHistory: {
      'ui:title': 'Criminal history',
      'ui:description':
        'You must answer Yes even if: the conviction was later expunged or sealed; the matter occurred while you were a minor; or the conviction occurred in another state or country. VA is required to conduct a background investigation that will identify all convictions.',
      hasFelonyConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a felony?',
        errorMessages: { required: 'Please answer this question.' },
      }),
      felonyDetails: {
        'ui:title': 'Felony conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory
              ?.hasFelonyConviction !== true,
          itemName: 'Felony conviction',
          viewField: item => `${item.offenseType || 'Felony'}`,
          keepInPageOnReview: true,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
            errorMessages: { required: 'Please describe the offense.' },
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
            errorMessages: {
              required: 'Please enter the conviction date.',
              futureDate: 'Conviction date cannot be in the future.',
            },
          }),
          jurisdiction: textUI({
            title: 'State or jurisdiction',
          }),
          court: textUI({
            title: 'Name of court',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances and current status',
            errorMessages: { required: 'Please provide an explanation.' },
          }),
        },
      },
      hasMisdemeanorConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a misdemeanor (other than minor traffic violations)?',
        errorMessages: { required: 'Please answer this question.' },
      }),
      misdemeanorDetails: {
        'ui:title': 'Misdemeanor conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory
              ?.hasMisdemeanorConviction !== true,
          itemName: 'Misdemeanor conviction',
          viewField: item => `${item.offenseType || 'Misdemeanor'}`,
          keepInPageOnReview: true,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
            errorMessages: { required: 'Please describe the offense.' },
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
            errorMessages: {
              required: 'Please enter the conviction date.',
              futureDate: 'Conviction date cannot be in the future.',
            },
          }),
          jurisdiction: textUI({
            title: 'State or jurisdiction',
          }),
          court: textUI({
            title: 'Name of court',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances and current status',
            errorMessages: { required: 'Please provide an explanation.' },
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