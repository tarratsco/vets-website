import {
  yesNoUI,
  yesNoSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const criminalHistoryUiSchema = {
  adverseHistory: {
    criminalHistory: {
      'ui:title': 'Criminal History',
      'ui:description':
        "You must answer 'Yes' even if: the conviction was later expunged or sealed; the matter occurred while you were a minor; or the conviction occurred in another state or country. VA is required to conduct a background investigation that will identify all convictions.",
      hasFelonyConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a felony?',
        errorMessages: {
          required: 'Please answer whether you have had any felony convictions.',
        },
      }),
      felonyDetails: {
        'ui:title': 'Felony Conviction Details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory?.hasFelonyConviction !== true,
          itemName: 'Conviction',
          viewField: ({ formData }) =>
            `Felony — ${formData.offenseType || ''} — ${formData.convictionDate || ''}`,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
            errorMessages: { required: 'Please enter the offense type.' },
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
            errorMessages: {
              required: 'Please enter the conviction date.',
              futureDate: 'Conviction date cannot be in the future.',
            },
          }),
          jurisdiction: textUI({
            title: 'Jurisdiction (state or country where the offense occurred)',
          }),
          court: textUI({
            title: 'Court name',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances',
            charcount: true,
          }),
        },
      },
      hasMisdemeanorConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a misdemeanor (other than minor traffic violations)?',
        errorMessages: {
          required:
            'Please answer whether you have had any misdemeanor convictions.',
        },
      }),
      misdemeanorDetails: {
        'ui:title': 'Misdemeanor Conviction Details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory?.hasMisdemeanorConviction !== true,
          itemName: 'Conviction',
          viewField: ({ formData }) =>
            `Misdemeanor — ${formData.offenseType || ''} — ${formData.convictionDate || ''}`,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
            errorMessages: { required: 'Please enter the offense type.' },
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
            errorMessages: {
              required: 'Please enter the conviction date.',
              futureDate: 'Conviction date cannot be in the future.',
            },
          }),
          jurisdiction: textUI({
            title: 'Jurisdiction (state or country where the offense occurred)',
          }),
          court: textUI({
            title: 'Court name',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances',
            charcount: true,
          }),
        },
      },
    },
  },
};

export const criminalHistorySchema = {
  type: 'object',
  properties: {
    adverseHistory: {
      type: 'object',
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