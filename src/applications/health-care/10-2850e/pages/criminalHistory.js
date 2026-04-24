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

const CRIMINAL_HINT =
  "You must answer 'Yes' even if: the conviction was later expunged or sealed; the matter occurred while you were a minor; or the conviction occurred in another state or country. VA is required to conduct a background investigation that will identify all convictions.";

export const criminalHistoryUiSchema = {
  adverseHistory: {
    criminalHistory: {
      'ui:title': 'Criminal history',
      'ui:description': CRIMINAL_HINT,
      hasFelonyConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a felony?',
        errorMessages: {
          required: 'Please indicate whether you have a felony conviction.',
        },
      }),
      felonyDetails: {
        'ui:title': 'Felony conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory?.hasFelonyConviction !==
            true,
          itemName: 'Felony conviction',
          viewField: ({ formData }) =>
            `${formData.offenseType || 'Felony'} — ${formData.jurisdiction || ''}`,
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
            title: 'Jurisdiction (state or country)',
            errorMessages: { required: 'Please enter the jurisdiction.' },
          }),
          court: textUI({
            title: 'Court',
          }),
          explanation: textareaUI({
            title:
              'Explain the circumstances of this conviction',
            charcount: true,
            errorMessages: {
              required: 'Please provide an explanation of this conviction.',
            },
          }),
        },
      },
      hasMisdemeanorConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a misdemeanor (other than minor traffic violations)?',
        errorMessages: {
          required: 'Please indicate whether you have a misdemeanor conviction.',
        },
      }),
      misdemeanorDetails: {
        'ui:title': 'Misdemeanor conviction details',
        'ui:options': {
          hideIf: formData =>
            formData?.adverseHistory?.criminalHistory?.hasMisdemeanorConviction !==
            true,
          itemName: 'Misdemeanor conviction',
          viewField: ({ formData }) =>
            `${formData.offenseType || 'Misdemeanor'} — ${formData.jurisdiction || ''}`,
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
            title: 'Jurisdiction (state or country)',
            errorMessages: { required: 'Please enter the jurisdiction.' },
          }),
          court: textUI({
            title: 'Court',
          }),
          explanation: textareaUI({
            title: 'Explain the circumstances of this conviction',
            charcount: true,
            errorMessages: {
              required: 'Please provide an explanation of this conviction.',
            },
          }),
        },
      },
    },
  },
};

const criminalEventItemSchema = {
  type: 'object',
  properties: {
    offenseType: { type: 'string', maxLength: 200 },
    convictionDate: currentOrPastDateSchema,
    jurisdiction: { type: 'string', maxLength: 200 },
    court: { type: 'string', maxLength: 200 },
    explanation: { type: 'string', maxLength: 3000 },
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
              items: criminalEventItemSchema,
            },
            hasMisdemeanorConviction: yesNoSchema,
            misdemeanorDetails: {
              type: 'array',
              items: criminalEventItemSchema,
            },
          },
        },
      },
    },
  },
};