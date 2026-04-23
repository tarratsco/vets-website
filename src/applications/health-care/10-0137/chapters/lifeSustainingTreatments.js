import {
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

import ClinicalTermDefinitions from '../components/ClinicalTermDefinitions';

const scenarioOptions = {
  labels: {
    yes: 'Yes — I would want life-sustaining treatments',
    unsure: 'I'm not sure — it would depend on the circumstances',
    no: 'No — I would not want life-sustaining treatments',
  },
};

export const lifeSustainingTreatmentsUiSchema = {
  'ui:title': 'Your preferences for life-sustaining treatments',
  'ui:description': ClinicalTermDefinitions,
  scenarioUnconscious: radioUI({
    ...scenarioOptions,
    title:
      'If I am unconscious, in a coma, or in a vegetative state and there is little or no chance of recovery',
  }),
  scenarioBrainDamage: radioUI({
    ...scenarioOptions,
    title:
      'If I have permanent, severe brain damage that makes me unable to recognize my family or friends (for example, severe dementia)',
  }),
  scenarioPermanentDependence: radioUI({
    ...scenarioOptions,
    title:
      'If I have a permanent condition where other people must help me with my daily needs (for example, eating, bathing, toileting)',
  }),
  scenarioBreathingMachine: radioUI({
    ...scenarioOptions,
    title: 'If I need to use a breathing machine and be in bed for the rest of my life',
  }),
  scenarioUnrelievablePain: radioUI({
    ...scenarioOptions,
    title:
      'If I have pain or other severe symptoms that cause suffering and can't be relieved',
  }),
  scenarioImminentDeath: radioUI({
    ...scenarioOptions,
    title:
      'If I have a condition that will make me die very soon, even with life-sustaining treatments',
  }),
  scenarioOther: radioUI({
    ...scenarioOptions,
    title: 'Other situation I want to describe',
  }),
  scenarioOtherDescription: textareaUI({
    title: 'Describe the situation',
    hint: 'Briefly describe the situation or condition you have in mind',
    charcount: true,
    'ui:options': {
      hideIf: formData => !formData.scenarioOther,
      expandUnder: 'scenarioOther',
    },
    errorMessages: {
      required:
        'Please describe the other situation since you selected a preference for it',
    },
  }),
};

export const lifeSustainingTreatmentsSchema = {
  type: 'object',
  properties: {
    scenarioUnconscious: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioBrainDamage: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioPermanentDependence: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioBreathingMachine: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioUnrelievablePain: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioImminentDeath: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioOther: {
      type: 'string',
      enum: ['yes', 'unsure', 'no'],
    },
    scenarioOtherDescription: {
      type: 'string',
      maxLength: 500,
    },
  },
};