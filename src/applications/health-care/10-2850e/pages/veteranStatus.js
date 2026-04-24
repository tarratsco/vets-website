import {
  yesNoUI,
  yesNoSchema,
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const dischargeOptions = [
  'honorable',
  'general',
  'other-than-honorable',
  'bad-conduct',
  'dishonorable',
  'uncharacterized',
];

export const veteranStatusUiSchema = {
  veteranStatus: {
    'ui:title': 'Veteran Status',
    isVeteran: yesNoUI({
      title: 'Are you a Veteran of the U.S. Armed Forces?',
      hint:
        'As a Veteran, you may be eligible for Veterans preference in federal hiring.',
      errorMessages: {
        required: 'Please indicate whether you are a Veteran.',
      },
    }),
    branchOfService: {
      ...textUI({
        title: 'Branch of service',
        hint: 'For example: United States Army, United States Navy',
      }),
      'ui:options': {
        expandUnder: 'isVeteran',
        expandUnderCondition: true,
      },
    },
    dischargeDate: {
      ...currentOrPastDateUI('Date of discharge or separation'),
      'ui:options': {
        expandUnder: 'isVeteran',
        expandUnderCondition: true,
      },
    },
    characterOfDischarge: {
      ...selectUI({
        title: 'Character of discharge',
      }),
      'ui:options': {
        expandUnder: 'isVeteran',
        expandUnderCondition: true,
      },
    },
  },
};

export const veteranStatusSchema = {
  type: 'object',
  properties: {
    veteranStatus: {
      type: 'object',
      properties: {
        isVeteran: yesNoSchema,
        branchOfService: { type: 'string', maxLength: 100 },
        dischargeDate: currentOrPastDateSchema,
        characterOfDischarge: selectSchema(dischargeOptions),
      },
    },
  },
};