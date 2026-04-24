import {
  yesNoUI,
  yesNoSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranStatusUiSchema = {
  veteranStatus: {
    'ui:title': 'Veteran status',
    isVeteran: yesNoUI({
      title: 'Are you a Veteran of the U.S. Armed Forces?',
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
        hideIf: formData => formData?.veteranStatus?.isVeteran !== true,
      },
    },
    dischargeDate: {
      ...currentOrPastDateUI({
        title: 'Date of discharge',
      }),
      'ui:options': {
        hideIf: formData => formData?.veteranStatus?.isVeteran !== true,
      },
    },
    characterOfDischarge: {
      ...radioUI({
        title: 'Character of discharge',
        labels: {
          honorable: 'Honorable',
          general: 'General (Under Honorable Conditions)',
          'other-than-honorable': 'Other Than Honorable',
          'bad-conduct': 'Bad Conduct',
          dishonorable: 'Dishonorable',
          uncharacterized: 'Uncharacterized',
        },
      }),
      'ui:options': {
        hideIf: formData => formData?.veteranStatus?.isVeteran !== true,
      },
    },
  },
};

export const veteranStatusSchema = {
  type: 'object',
  required: ['veteranStatus'],
  properties: {
    veteranStatus: {
      type: 'object',
      required: ['isVeteran'],
      properties: {
        isVeteran: yesNoSchema,
        branchOfService: { type: 'string', maxLength: 100 },
        dischargeDate: currentOrPastDateSchema,
        characterOfDischarge: radioSchema([
          'honorable',
          'general',
          'other-than-honorable',
          'bad-conduct',
          'dishonorable',
          'uncharacterized',
        ]),
      },
    },
  },
};