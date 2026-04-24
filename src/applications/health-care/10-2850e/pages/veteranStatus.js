import {
  yesNoUI,
  yesNoSchema,
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const DISCHARGE_CHARACTER_OPTIONS = [
  'honorable',
  'general',
  'other-than-honorable',
  'bad-conduct',
  'dishonorable',
  'uncharacterized',
];

const DISCHARGE_CHARACTER_LABELS = {
  honorable: 'Honorable',
  general: 'General (Under Honorable Conditions)',
  'other-than-honorable': 'Other Than Honorable',
  'bad-conduct': 'Bad Conduct',
  dishonorable: 'Dishonorable',
  uncharacterized: 'Uncharacterized',
};

export const veteranStatusUiSchema = {
  veteranStatus: {
    'ui:title': 'Veteran status',
    isVeteran: yesNoUI({
      title: 'Are you a Veteran of the U.S. Armed Forces?',
      description:
        'As a Veteran, you may be eligible for Veterans\' preference in federal hiring. Your service information will be recorded for preference determination purposes.',
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
        hideIf: formData => !formData?.veteranStatus?.isVeteran,
      },
    },
    dischargeDate: {
      ...currentOrPastDateUI({
        title: 'Date of discharge',
        errorMessages: {
          required: 'Please enter your discharge date.',
        },
      }),
      'ui:options': {
        hideIf: formData => !formData?.veteranStatus?.isVeteran,
      },
    },
    characterOfDischarge: {
      ...selectUI({
        title: 'Character of discharge',
        labels: DISCHARGE_CHARACTER_LABELS,
        errorMessages: {
          required: 'Please select your character of discharge.',
        },
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
        dischargeDate: currentOrPastDateSchema,
        characterOfDischarge: selectSchema(DISCHARGE_CHARACTER_OPTIONS),
      },
    },
  },
};