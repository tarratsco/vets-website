import {
  yesNoUI,
  yesNoSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const veteranStatusUiSchema = {
  veteranStatus: {
    'ui:title': 'Veteran status',
    isVeteran: yesNoUI({
      title: 'Are you a Veteran of the U.S. Armed Forces?',
      hint:
        'As a Veteran, you may be eligible for Veterans preference in federal hiring.',
    }),
    branchOfService: textUI({
      title: 'Branch of service',
      hint: 'For example: United States Army',
      'ui:options': {
        hideIf: formData => !formData?.veteranStatus?.isVeteran,
      },
    }),
    characterOfDischarge: radioUI({
      title: 'Character of discharge',
      labels: {
        honorable: 'Honorable',
        general: 'General',
        'other-than-honorable': 'Other than honorable',
        'bad-conduct': 'Bad conduct',
        dishonorable: 'Dishonorable',
        uncharacterized: 'Uncharacterized',
      },
      'ui:options': {
        hideIf: formData => !formData?.veteranStatus?.isVeteran,
      },
    }),
    dischargeDate: {
      ...currentOrPastDateUI({
        title: 'Discharge date',
      }),
      'ui:options': {
        hideIf: formData => !formData?.veteranStatus?.isVeteran,
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
        characterOfDischarge: radioSchema([
          'honorable',
          'general',
          'other-than-honorable',
          'bad-conduct',
          'dishonorable',
          'uncharacterized',
        ]),
        dischargeDate: currentOrPastDateSchema,
      },
    },
  },
};