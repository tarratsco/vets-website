import {
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const ds2019UiSchema = {
  citizenship: {
    'ui:title': 'DS-2019 form',
    hasValidDs2019: radioUI({
      title: 'Do you have a valid DS-2019?',
      labels: { Y: 'Yes', N: 'No' },
      hint:
        "A DS-2019 (Certificate of Eligibility for Exchange Visitor Status) is required for J-1 Exchange Visitor trainees and their dependents. If you are not a J-1 Exchange Visitor, answer 'No.'",
      errorMessages: {
        required: 'Select Yes or No.',
      },
    }),
    ds2019LastValidationDate: {
      ...currentOrPastDateUI({
        title: 'Date of last DS-2019 validation',
        hint:
          'Enter the date your DS-2019 was most recently validated by your sponsoring institution or designated sponsor.',
        errorMessages: {
          required: 'Enter the date of your last DS-2019 validation.',
          pattern: 'Enter a valid date.',
          futureDate: 'Enter a past or current date.',
        },
      }),
      'ui:options': {
        expandUnder: 'hasValidDs2019',
        expandUnderCondition: 'Y',
      },
    },
  },
};

export const ds2019Schema = {
  type: 'object',
  properties: {
    citizenship: {
      type: 'object',
      required: ['hasValidDs2019'],
      properties: {
        hasValidDs2019: radioSchema(['Y', 'N']),
        ds2019LastValidationDate: currentOrPastDateSchema,
      },
    },
  },
};