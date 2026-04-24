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
    'ui:title': 'Criminal history',
    'ui:description':
      'You must answer Yes even if: the conviction was later expunged or sealed; the matter occurred while you were a minor; or the conviction occurred in another state or country.',
    criminalHistory: {
      hasFelonyConviction: yesNoUI({
        title:
          'Have you ever been convicted of, pled guilty to, or pled no contest to a felony?',
        errorMessages: {
          required: 'Please answer this question.',
        },
      }),
      felonyDetails: {
        'ui:options': {
          itemName: 'felony conviction',
          viewField: FelonyViewField,
          hideIf: formData =>
            !formData?.adverseHistory?.criminalHistory?.hasFelonyConviction,
          keepInPageOnReview: true,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
          }),
          jurisdiction: textUI({
            title: 'State or jurisdiction',
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
          required: 'Please answer this question.',
        },
      }),
      misdemeanorDetails: {
        'ui:options': {
          itemName: 'misdemeanor conviction',
          viewField: MisdemeanorViewField,
          hideIf: formData =>
            !formData?.adverseHistory?.criminalHistory?.hasMisdemeanorConviction,
          keepInPageOnReview: true,
        },
        items: {
          offenseType: textUI({
            title: 'Type of offense',
          }),
          convictionDate: currentOrPastDateUI({
            title: 'Date of conviction',
          }),
          jurisdiction: textUI({
            title: 'State or jurisdiction',
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

function FelonyViewField({ formData }) {
  return <div>Felony: {formData.offenseType}</div>;
}

function MisdemeanorViewField({ formData }) {
  return <div>Misdemeanor: {formData.offenseType}</div>;
}

const criminalEventSchema = {
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
              items: criminalEventSchema,
            },
            hasMisdemeanorConviction: yesNoSchema,
            misdemeanorDetails: {
              type: 'array',
              items: criminalEventSchema,
            },
          },
        },
      },
    },
  },
};